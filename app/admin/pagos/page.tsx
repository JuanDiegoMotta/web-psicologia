import { connection } from 'next/server';
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

export default async function AdminPagosPage() {
  await connection(); // datos de request-time; no prerenderizar

  const { data } = await getSupabaseAdmin()
    .from('payment_links')
    .select('token, amount, concept, status, created_at, paid_at')
    .order('created_at', { ascending: false })
    .limit(20);

  return <AdminPagosClient initialLinks={(data as PaymentLink[]) ?? []} />;
}
