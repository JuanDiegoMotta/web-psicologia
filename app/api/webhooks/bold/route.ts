import { NextResponse } from 'next/server';
import crypto from 'crypto';
// Importaremos Resend más adelante para mandar los correos automáticos
// import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    // 1. Extraer la firma de seguridad que envía Bold en los headers
    const signature = request.headers.get('x-bold-signature');
    const secretKey = process.env.BOLD_SECRET_KEY;

    if (!signature || !secretKey) {
      return NextResponse.json({ error: 'Faltan credenciales' }, { status: 401 });
    }

    // 2. Extraer el cuerpo de la petición (Raw text) para poder validarlo
    // Es vital leerlo como texto primero para no perder integridad al parsear JSON
    const rawBody = await request.text();
    
    // 3. Lógica de validación exacta que pide Bold (Base64 -> HMAC-SHA256)
    const encodedBody = Buffer.from(rawBody, 'utf-8').toString('base64');
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(encodedBody)
      .digest('hex');

    // Comparamos la firma que calculamos con la que nos mandó Bold
    if (calculatedHash !== signature) {
      console.error('Firma inválida. Posible intento de fraude.');
      return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
    }

    // 4. Si la firma es válida, parseamos el JSON para ver qué pasó
    const body = JSON.parse(rawBody);
    const eventType = body.type; // Puede ser SALE_APPROVED, SALE_REJECTED, etc.
    const paymentData = body.data;

    // 5. Lógica de negocio (¿Qué hacemos si el pago fue aprobado?)
    if (eventType === 'SALE_APPROVED') {
      console.log(`¡Pago aprobado! Ref: ${paymentData.metadata?.reference}`);
      console.log(`Monto: ${paymentData.amount.total}, Cliente: ${paymentData.payment_method}`);

      // AQUÍ ES DONDE SUCEDE LA MAGIA:
      // Si la referencia dice "GUIA-ANSIEDAD", usamos Resend para enviarle el PDF.
      // Si la referencia dice "TERAPIA", mandamos un correo a Daniela avisando de la nueva sesión.
      
      /* Ejemplo conceptual:
        await resend.emails.send({
          from: 'clinica@daniela.com',
          to: paymentData.payer_email,
          subject: 'Aquí tienes tu Guía Digital',
          html: '<p>Gracias por tu compra. Descarga tu guía <a href="...">aquí</a></p>'
        });
      */
    } else if (eventType === 'SALE_REJECTED') {
      console.log('El pago fue rechazado. Puedes enviar un email de recuperación de carrito aquí.');
    }

    // 6. Responder SIEMPRE un 200 OK rápido para que Bold sepa que recibimos el mensaje
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Error procesando el webhook de Bold:', error);
    // Aunque haya error interno, a veces se devuelve 200 a la pasarela para que deje de reintentar si el error fue nuestro (parseo), 
    // pero devolver 500 hace que Bold lo reintente, lo cual es útil según su tabla de reintentos.
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}