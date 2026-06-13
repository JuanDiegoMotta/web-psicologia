import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Cliente de Supabase con privilegios de administrador (backend).
// ⚠️ SOLO debe usarse en código de servidor (Route Handlers, Server Actions).
// Usa la nueva `secret key` (sb_secret_...) que salta el RLS y NUNCA debe
// exponerse al navegador (por eso su variable no lleva prefijo NEXT_PUBLIC_).
//
// Usa la `secret key` (sb_secret_...) de Supabase (modelo de claves de jun 2025).
//
// Se crea de forma perezosa (lazy): el cliente no se instancia al importar el
// módulo, sino la primera vez que se llama a getSupabaseAdmin(). Así el build
// no falla aunque las variables de entorno aún no estén configuradas.
let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error('Faltan SUPABASE_URL o SUPABASE_SECRET_KEY en las variables de entorno');
  }

  client = createClient(url, key, {
    // En servidor no necesitamos sesiones persistentes ni refresco de tokens.
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return client;
}
