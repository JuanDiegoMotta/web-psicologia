import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '@/lib/supabase';

// Prefijos de producto conocidos (deben coincidir con los orderPrefix de los botones de pago)
const PRODUCT_PREFIXES = ['GUIA-HABLAR', 'GUIA-CONEXION', 'GUIA-AMOR', 'CITA'];

// A partir de la referencia completa (p. ej. "GUIA-HABLAR-1234") devuelve el prefijo del producto
function getProductPrefix(reference: string): string | null {
  return PRODUCT_PREFIXES.find((p) => reference.startsWith(p)) ?? null;
}

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

    // 2. Validación (MODIFICADA TEMPORALMENTE PARA SIMULACIÓN)
    if (!signature) {
      console.warn('⚠️ No se recibió firma de Bold. Permitiendo ejecución temporal por simulación.');
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

    // 3.5. Persistimos el pago en Supabase (auditoría / histórico de ventas).
    // Va en su propio try/catch: si la BD falla, NO queremos romper la respuesta
    // al webhook ni bloquear el correo. Bold reintentaría si devolvemos error.
    try {
      const reference = paymentData.metadata?.reference ?? null;
      const { error } = await getSupabaseAdmin()
        .from('payments')
        .upsert(
          {
            event_id: body.id,
            event_type: eventType,
            payment_id: paymentData.payment_id ?? null,
            reference,
            product_prefix: reference ? getProductPrefix(reference) : null,
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
      const reference = paymentData.metadata?.reference || '';

      // OJO: En la capa gratuita de Resend solo puedes enviar a tu propio correo verificado.
      // Cuando pases a producción y verifiques tu dominio en Resend, cambia esto por: paymentData.payer_email
      const payerEmail = 'mottajuandiego.work@gmail.com';

      // Preparamos el correo según la referencia
      let emailSubject = '';
      let emailHtml = '';

      if (reference.startsWith('GUIA-CONEXION')) {
        emailSubject = '🤝 Aquí tienes tu Guía: Conexión y Vínculos';
        emailHtml = `
          <h2>¡Hola! Gracias por tu compra.</h2>
          <p>Haz clic en el enlace de abajo para descargar tu guía en formato PDF:</p>
          <a href="https://tudominio.com/links-secretos/guia-conexion.pdf" style="...">Descargar Guía</a>
        `;
      } else if (reference.startsWith('GUIA-AMOR')) {
        emailSubject = '💖 Aquí tienes tu Guía: Amor Propio y Relaciones';
        emailHtml = `<h2>¡Hola! Gracias por tu compra.</h2><p>Descarga aquí: <a href="...">Guía de Amor</a></p>`;
      } else if (reference.startsWith('GUIA-HABLAR')) {
        emailSubject = '💬 Aquí tienes tu Guía: Comunicación Asertiva';
        emailHtml = `<h2>¡Hola! Gracias por tu compra.</h2><p>Descarga aquí: <a href="...">Guía de Comunicación</a></p>`;
      } else if (reference.startsWith('CITA')) {
        emailSubject = '💰 ¡Nuevo pago de sesión recibido!';
        emailHtml = `<h2>¡Felicidades, Daniela!</h2><p>Pago de $${paymentData.amount.total} recibido de ${paymentData.payer_email}.</p>`;
      }

      // 4. Envío de correo
      // ATENCIÓN AL TIMEOUT: Resend suele tardar < 1s, lo cual entra en el límite de 2s de Bold.
      if (emailSubject) {
        await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>', // Cambiar en prod a algo como 'hola@tudominio.com'
          to: [payerEmail],
          subject: emailSubject,
          html: emailHtml
        });
      }
    }

    // 5. Respondemos 200 OK lo más rápido posible
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Error procesando el webhook de Bold:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}