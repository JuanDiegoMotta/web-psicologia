import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { orderId, amount, currency } = await request.json();
    const secretKey = process.env.BOLD_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json({ error: 'Llave secreta no configurada' }, { status: 500 });
    }

    // Bold normalmente pide concatenar: orderId + amount + currency + secretKey
    const stringToHash = `${orderId}${amount}${currency}${secretKey}`;

    // Generamos el Hash SHA-256
    const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');

    return NextResponse.json({ hash });
  } catch (error) {
    return NextResponse.json({ error: 'Error al generar el hash' }, { status: 500 });
  }
}