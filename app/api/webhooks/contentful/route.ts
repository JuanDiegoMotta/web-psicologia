import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getPostBySlug } from '@/lib/contentful';

const resend = new Resend(process.env.RESEND_API_KEY);

// Extrae el valor de un campo del payload de Contentful (management format),
// que viene envuelto por locale: { "en-US": "valor" }. Tomamos el primer locale.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function localized(field: any): string | null {
  if (!field || typeof field !== 'object') return null;
  const first = Object.values(field)[0];
  return typeof first === 'string' ? first : null;
}

export async function POST(request: Request) {
  // 1. Verificación: el header secreto debe coincidir (lo configuras en el webhook de Contentful).
  const secret = request.headers.get('x-webhook-secret');
  if (!secret || secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // A partir de aquí devolvemos siempre 200 (salvo 401) para que Contentful no reintente en bucle.
  try {
    const payload = await request.json();
    const slug = localized(payload?.fields?.slug);

    if (!slug) {
      return NextResponse.json({ skipped: 'sin slug en el payload' }, { status: 200 });
    }

    const post = await getPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ skipped: 'post no encontrado (¿publicado?)' }, { status: 200 });
    }

    const segmentId = process.env.RESEND_SEGMENT_ID;
    if (!segmentId) {
      console.error('[CONTENTFUL WEBHOOK] Falta RESEND_SEGMENT_ID');
      return NextResponse.json({ skipped: 'falta RESEND_SEGMENT_ID' }, { status: 200 });
    }

    // URL del artículo: configurable por SITE_URL; si no, se deriva del origen de la petición.
    const baseUrl = process.env.SITE_URL || new URL(request.url).origin;
    const postUrl = `${baseUrl}/blog/${post.slug}`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#343434;">
        ${post.heroImage?.url ? `<img src="${post.heroImage.url}" alt="" style="width:100%;border-radius:16px;margin-bottom:24px;" />` : ''}
        <p style="color:#5E7C66;font-weight:bold;text-transform:uppercase;font-size:12px;letter-spacing:1px;">Nuevo en el blog</p>
        <h1 style="font-size:24px;line-height:1.3;margin:8px 0 16px;">${post.title}</h1>
        <p style="font-size:16px;line-height:1.6;color:#555;">${post.excerpt ?? ''}</p>
        <p style="margin:28px 0;">
          <a href="${postUrl}" style="background:#5E7C66;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:9999px;font-weight:bold;display:inline-block;">Leer el artículo</a>
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:32px 0;" />
        <p style="font-size:12px;color:#999;">Recibes este correo porque te suscribiste a la newsletter de Psicóloga Dani Vargas.</p>
      </div>
    `;

    // Modelo nuevo: el Broadcast se envía a un segmentId (no audienceId). send:true lo manda ya.
    const { data, error } = await resend.broadcasts.create({
      segmentId,
      from: process.env.RESEND_FROM || 'Acme <onboarding@resend.dev>',
      subject: `📬 Nuevo artículo: ${post.title}`,
      html,
      send: true,
    });

    if (error) {
      // El envío real requiere dominio verificado en Resend; si falla, lo registramos sin reintentar.
      console.error('[CONTENTFUL WEBHOOK] Error al crear/enviar el broadcast:', error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 200 });
    }

    return NextResponse.json({ ok: true, broadcastId: data?.id, slug: post.slug }, { status: 200 });
  } catch (e) {
    console.error('[CONTENTFUL WEBHOOK] Excepción:', e);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
