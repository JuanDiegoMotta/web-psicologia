import { createBrowserClient } from '@supabase/ssr';

// Cliente de Supabase para el NAVEGADOR (login, signOut).
// Usa la publishable key (pública, respeta RLS).
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
