import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Introduce un correo válido.' }, { status: 400 });
    }

    const segmentId = process.env.RESEND_SEGMENT_ID;

    // Modelo nuevo de Resend (nov 2025): contactos globales, sin audienceId.
    // Si hay segmento configurado, asociamos el contacto al segmento "Newsletter".
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
    });

    if (error) {
      // Un correo ya suscrito puede devolver error; lo tratamos como éxito silencioso
      // para que la experiencia del usuario sea buena (idempotente).
      const msg = (error.message || '').toLowerCase();
      if (msg.includes('already') || msg.includes('exist')) {
        return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
      }
      console.error('[NEWSLETTER] Error de Resend al crear contacto:', error);
      return NextResponse.json({ error: 'No pudimos completar la suscripción.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error('[NEWSLETTER] Excepción:', e);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
