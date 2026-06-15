import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getGuideByReference } from '@/lib/contentful';

// Traduce el tipo de evento de Bold a un estado simple para la columna `status`
const STATUS_BY_EVENT: Record<string, string> = {
  SALE_APPROVED: 'approved',
  SALE_REJECTED: 'rejected',
  VOID_APPROVED: 'voided',
  VOID_REJECTED: 'void_rejected',
};

// === TIPOS DE TYPESCRIPT ===
// Esto te dará autocompletado y evitará errores de tipeo
interface BoldWebhookEvent {
  id: string;
  type: 'SALE_APPROVED' | 'SALE_REJECTED' | 'VOID_APPROVED' | 'VOID_REJECTED';
  data: {
    payment_id: string;
    amount: { total: number };
    payer_email: string;
    metadata?: { reference: string };
    // Puedes agregar más campos según necesites
  };
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-bold-signature');

    // 1. Extraemos el Raw Body (Cuerpo crudo)
    const rawBody = await request.text();

    // 2. Validación de la firma del webhook (HMAC-SHA256 sobre el base64 del body).
    if (!signature) {
      // En producción Bold SIEMPRE firma → sin firma se rechaza. En preview/dev se
      // permite para poder lanzar el webhook de prueba a mano desde el panel de Bold.
      if (process.env.VERCEL_ENV === 'production') {
        return NextResponse.json({ error: 'Falta la firma del webhook' }, { status: 401 });
      }
      console.warn('[WEBHOOK BOLD] Petición sin firma (permitido fuera de producción).');
    } else {
      // Si SÍ hay firma, hacemos la validación normal
      const secretKey = process.env.BOLD_WEBHOOK_SECRET || '';
      const encodedBody = Buffer.from(rawBody, 'utf-8').toString('base64');

      const calculatedHash = crypto
        .createHmac('sha256', secretKey)
        .update(encodedBody)
        .digest('hex');

      const isValidSignature = crypto.timingSafeEqual(
        Buffer.from(calculatedHash),
        Buffer.from(signature)
      );

      if (!isValidSignature) {
        console.error('Firma inválida. Posible intento de fraude.');
        return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
      }
    }

    // 3. Parseamos el cuerpo ya validado
    const body: BoldWebhookEvent = JSON.parse(rawBody);
    const eventType = body.type;
    const paymentData = body.data;
    const reference = paymentData.metadata?.reference ?? null;

    // Buscamos en Contentful la guía correspondiente a la referencia del pago.
    // De aquí salen el título y el enlace del PDF para el correo, y el slug para Supabase.
    let guide = null;
    try {
      guide = reference ? await getGuideByReference(reference) : null;
    } catch (e) {
      console.error('[WEBHOOK BOLD] No se pudo consultar la guía en Contentful:', e);
    }

    // 3.5. Persistimos el pago en Supabase (auditoría / histórico de ventas).
    // Va en su propio try/catch: si la BD falla, NO queremos romper la respuesta
    // al webhook ni bloquear el correo. Bold reintentaría si devolvemos error.
    try {
      const { error } = await getSupabaseAdmin()
        .from('payments')
        .upsert(
          {
            event_id: body.id,
            event_type: eventType,
            payment_id: paymentData.payment_id ?? null,
            reference,
            product_prefix: guide?.slug ?? (reference?.startsWith('LINK-') ? 'LINK' : null),
            amount: paymentData.amount?.total ?? null,
            currency: 'COP',
            payer_email: paymentData.payer_email ?? null,
            status: STATUS_BY_EVENT[eventType] ?? eventType,
            raw_payload: body,
          },
          // Idempotencia: si Bold reintenta el mismo pago, no se duplica la fila
          { onConflict: 'payment_id', ignoreDuplicates: true },
        );

      if (error) {
        console.error('[WEBHOOK BOLD] Error al guardar el pago en Supabase:', error.message);
      }
    } catch (dbError) {
      console.error('🔴 [WEBHOOK BOLD] Excepción al guardar en Supabase:', dbError);
    }

    // --- LÓGICA DE NEGOCIO ---
    if (eventType === 'SALE_APPROVED') {
      // Remitente configurable (dominio verificado en Resend). Comprador = correo real del pago.
      const from = process.env.RESEND_FROM || 'Acme <onboarding@resend.dev>';
      const buyerEmail = paymentData.payer_email;
      const total = paymentData.amount?.total ?? 0;
      let concept = ''; // descripción para la notificación al admin

      // a) Compra de GUÍA → entregamos el PDF al comprador.
      if (guide) {
        concept = `Guía: ${guide.title}`;
        const downloadBlock = guide.pdfUrl
          ? `<p style="margin:24px 0;">
               <a href="${guide.pdfUrl}" style="background:#5E7C66;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:9999px;font-weight:bold;display:inline-block;">Descargar mi guía (PDF)</a>
             </p>
             <p style="color:#666;font-size:13px;">Si el botón no funciona, copia y pega este enlace:<br/>${guide.pdfUrl}</p>`
          : `<p>En breve te haremos llegar el enlace de descarga de tu guía.</p>`;
        if (buyerEmail) {
          try {
            await resend.emails.send({
              from,
              to: [buyerEmail],
              subject: `📘 Aquí tienes tu guía: ${guide.title}`,
              html: `
                <h2>¡Hola! Gracias por tu compra 💚</h2>
                <p>Aquí tienes tu guía <strong>${guide.title}</strong> en formato PDF, lista para descargar:</p>
                ${downloadBlock}
                <p style="margin-top:24px;">Un abrazo,<br/>Dani Vargas</p>
              `,
            });
          } catch (e) {
            console.error('[WEBHOOK BOLD] Error al enviar la guía por correo:', e);
          }
        }
      }
      // b) Pago por LINK dinámico → marcamos el link como pagado (un solo uso).
      else if (reference?.startsWith('LINK-')) {
        const token = reference.match(/^LINK-([^-]+)-\d+$/)?.[1] ?? null;
        if (token) {
          try {
            const { data } = await getSupabaseAdmin()
              .from('payment_links')
              .update({ status: 'paid', paid_at: new Date().toISOString() })
              .eq('token', token)
              .eq('status', 'active')
              .select('concept')
              .maybeSingle();
            concept = `Link de pago: ${data?.concept ?? token}`;
          } catch (e) {
            console.error('[WEBHOOK BOLD] Error al marcar el link como pagado:', e);
          }
        }
      }

      // c) Notificación simple al admin/dueña en TODO pago aprobado.
      const adminEmails = (process.env.ADMIN_NOTIFICATION_EMAILS || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      if (adminEmails.length > 0) {
        try {
          await resend.emails.send({
            from,
            to: adminEmails,
            subject: '💰 Nuevo pago recibido',
            html: `
              <h2>Nuevo pago aprobado</h2>
              <p><strong>${concept || 'Pago'}</strong></p>
              <p>Importe: <strong>$${total.toLocaleString('es-CO')} COP</strong></p>
              <p>Comprador: ${paymentData.payer_email ?? '—'}</p>
              <p>Referencia: ${reference ?? '—'}</p>
            `,
          });
        } catch (e) {
          console.error('[WEBHOOK BOLD] Error al enviar la notificación al admin:', e);
        }
      }
    }

    // 5. Respondemos 200 OK lo más rápido posible
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Error procesando el webhook de Bold:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}