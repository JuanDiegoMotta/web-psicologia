import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Cliente de Supabase con privilegios de administrador (service_role).
// ⚠️ SOLO debe usarse en código de servidor (Route Handlers, Server Actions).
// La service_role key salta el RLS y NUNCA debe exponerse al navegador
// (por eso la variable no lleva el prefijo NEXT_PUBLIC_).
//
// Se crea de forma perezosa (lazy): el cliente no se instancia al importar el
// módulo, sino la primera vez que se llama a getSupabaseAdmin(). Así el build
// no falla aunque las variables de entorno aún no estén configuradas.
let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno',
    );
  }

  client = createClient(url, key, {
    // En servidor no necesitamos sesiones persistentes ni refresco de tokens.
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return client;
}
