import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';

// Inicializamos Resend con tu llave secreta
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-bold-signature');
    const secretKey = process.env.BOLD_SECRET_KEY;

    if (!signature || !secretKey) {
      return NextResponse.json({ error: 'Faltan credenciales' }, { status: 401 });
    }

    const rawBody = await request.text();
    
    const encodedBody = Buffer.from(rawBody, 'utf-8').toString('base64');
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(encodedBody)
      .digest('hex');

    if (calculatedHash !== signature) {
      console.error('Firma inválida. Posible intento de fraude.');
      return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
    }

    const body = JSON.parse(rawBody);
    const eventType = body.type; 
    const paymentData = body.data;

    // --- LÓGICA DE NEGOCIO (ENVÍO DE CORREOS) ---
    if (eventType === 'SALE_APPROVED') {
      // Extraemos la referencia (ej. "GUIA-ANSIEDAD-1700000000" o "CITA-1700000000")
      const reference = paymentData.metadata?.reference || '';
      
      // Intentamos obtener el correo del comprador (Bold lo suele enviar si el usuario lo llenó)
      // OJO: Para la prueba gratuita de Resend, asegúrate de que este correo sea el tuyo propio.
      const payerEmail = paymentData.payer_email || 'tucorreo@ejemplo.com'; 

      console.log(`¡Pago aprobado! Ref: ${reference} | Email: ${payerEmail}`);

      // 1. CASO: Compró la Guía de Ansiedad
      if (reference.startsWith('GUIA-ANSIEDAD')) {
        await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>', // Cambia esto cuando tengas dominio propio
          to: [payerEmail], 
          subject: '📚 Aquí tienes tu Guía: Manejo de la Ansiedad',
          html: `
            <h2>¡Hola! Gracias por tu compra.</h2>
            <p>Tu pago ha sido procesado con éxito. Haz clic en el enlace de abajo para descargar tu guía en formato PDF:</p>
            <a href="https://tudominio.com/links-secretos/guia-ansiedad.pdf" style="display:inline-block; padding:10px 20px; background-color:#ec4899; color:white; text-decoration:none; border-radius:5px;">Descargar Guía de Ansiedad</a>
            <p>Si tienes algún problema, responde a este correo.</p>
            <p>Un abrazo,<br/>Daniela Vargas</p>
          `
        });
      } 
      
      // 2. CASO: Compró la Guía de Autoestima (Ejemplo extra)
      else if (reference.startsWith('GUIA-AUTOESTIMA')) {
        await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: [payerEmail], 
          subject: '💖 Aquí tienes tu Guía: Construyendo Autoestima',
          html: `
            <h2>¡Hola! Gracias por tu compra.</h2>
            <p>Aquí tienes el enlace para descargar tu guía de autoestima:</p>
            <a href="https://tudominio.com/links-secretos/guia-autoestima.pdf">Descargar Guía</a>
          `
        });
      }

      // 3. CASO: Agendó una Terapia / Cita
      else if (reference.startsWith('CITA')) {
        // Para las citas, le enviamos un correo a DANIELA para avisarle que le pagaron
        await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: ['tucorreo@ejemplo.com'], // El correo personal de Daniela
          subject: '💰 ¡Nuevo pago de sesión recibido!',
          html: `
            <h2>¡Felicidades, Daniela!</h2>
            <p>Acabas de recibir un pago por una sesión de terapia.</p>
            <ul>
              <li><strong>Monto:</strong> $${paymentData.amount.total}</li>
              <li><strong>Referencia:</strong> ${reference}</li>
              <li><strong>Email del paciente:</strong> ${payerEmail}</li>
            </ul>
            <p>Revisa tu WhatsApp o agenda para confirmar el horario con el paciente.</p>
          `
        });
      }
    } 
    
    else if (eventType === 'SALE_REJECTED') {
      console.log(`Pago rechazado para la ref: ${paymentData.metadata?.reference}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Error procesando el webhook de Bold:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}