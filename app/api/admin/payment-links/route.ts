import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { getSupabaseAdmin } from '@/lib/supabase';

// Comprueba que hay sesión y que el correo está autorizado.
async function getAuthorizedEmail(): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email?.toLowerCase();
  if (!email) return null;

  const allowed = (process.env.ADMIN_ALLOWED_EMAILS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (allowed.length > 0 && !allowed.includes(email)) return null;
  return email;
}

export async function POST(request: Request) {
  const email = await getAuthorizedEmail();
  if (!email) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { amount, concept } = await request.json();
    const base = Number(amount);

    if (!Number.isInteger(base) || base <= 0) {
      return NextResponse.json({ error: 'Importe inválido (entero positivo en COP).' }, { status: 400 });
    }
    if (!concept || typeof concept !== 'string' || !concept.trim()) {
      return NextResponse.json({ error: 'El concepto es obligatorio.' }, { status: 400 });
    }

    // Token corto sin guiones (la referencia de Bold será LINK-<token>-<timestamp>)
    const token = crypto.randomBytes(6).toString('hex');

    const { data, error } = await getSupabaseAdmin()
      .from('payment_links')
      .insert({
        token,
        amount: base,
        concept: concept.trim(),
        status: 'active',
        created_by: email,
      })
      .select('token, amount, concept, status, created_at')
      .single();

    if (error) {
      console.error('[ADMIN payment-links] Error al insertar:', error.message);
      return NextResponse.json({ error: 'No se pudo crear el link.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, link: data }, { status: 200 });
  } catch (e) {
    console.error('[ADMIN payment-links] Excepción:', e);
    return NextResponse.json({ error: 'Error interno.' }, { status: 500 });
  }
}
