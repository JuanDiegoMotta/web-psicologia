import { Suspense } from 'react';
import { getSupabaseAdmin } from '@/lib/supabase';
import AdminPagosClient from './AdminPagosClient';

export type PaymentLink = {
  token: string;
  amount: number;
  concept: string;
  status: string;
  created_at: string;
  paid_at: string | null;
};

// La lectura de Supabase (no cacheada) va dentro de <Suspense> para cumplir
// con cacheComponents (PPR): la shell se prerenderiza y los datos se streamean.
async function LinksLoader() {
  const { data } = await getSupabaseAdmin()
    .from('payment_links')
    .select('token, amount, concept, status, created_at, paid_at')
    .order('created_at', { ascending: false })
    .limit(20);

  return <AdminPagosClient initialLinks={(data as PaymentLink[]) ?? []} />;
}

export default function AdminPagosPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-blancoluz" />}>
      <LinksLoader />
    </Suspense>
  );
}
