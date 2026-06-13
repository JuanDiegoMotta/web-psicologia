import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Cliente de Supabase para el SERVIDOR ligado a la sesión del usuario (cookies).
// Usa la publishable key (respeta RLS). Sirve para leer la sesión en Server
// Components y Route Handlers (p. ej. comprobar quién está logueado).
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Llamado desde un Server Component (cookies de solo lectura):
            // se ignora; el middleware se encarga de refrescar la sesión.
          }
        },
      },
    },
  );
}
