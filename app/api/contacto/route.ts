import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializamos Resend con nuestra llave secreta
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // 1. Recibimos los datos del formulario frontend
    const body = await request.json();
    const { name, email, cellphone, age = "No proporcionado", service = "Consulta general (desde Home)", reason = "Sin mensaje adicional" } = body;

    // 2. Usamos Resend para enviar el correo
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // No cambies este email hasta que no verifiques un dominio en Resend
      to: ['mottajuandiego.work@gmail.com'], // Pon AQUÍ el correo de Daniela (con el que te registraste en Resend)
      subject: `Nueva solicitud de cita de ${name}`,
      html: `
        <h2>Tienes un nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Celular:</strong> ${cellphone}</p>
        <p><strong>Edad:</strong> ${age}</p>
        <p><strong>Servicio de interés:</strong> ${service}</p>
        <p><strong>Motivo de consulta:</strong> ${reason}</p>
      `,
    });

    // 3. Respondemos al frontend que todo salió bien
    return NextResponse.json({ success: true, data });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Hubo un error al enviar el correo' }, { status: 500 });
  }
}