import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import BoldPaymentButton from '@/components/BoldPaymentButton';
import { getSupabaseAdmin } from '@/lib/supabase';
import { computeBreakdown, BOLD_COMMISSION_RATE } from '@/lib/pricing';

const fmt = (n: number) => `$${n.toLocaleString('es-CO')} COP`;

export default async function PagoLinkPage({ params }: { params: Promise<{ token: string }> }) {
  await connection(); // lee de BD en request-time
  const { token } = await params;

  const { data: link } = await getSupabaseAdmin()
    .from('payment_links')
    .select('token, amount, concept, status')
    .eq('token', token)
    .maybeSingle();

  if (!link) notFound();

  // Un solo uso: si ya no está activo, no se puede pagar.
  if (link.status !== 'active') {
    return (
      <main className="flex flex-col w-full min-h-screen items-center justify-center bg-blancoluz px-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-salvia p-8 text-center">
          <div className="text-4xl mb-4">{link.status === 'paid' ? '✅' : '🔒'}</div>
          <h1 className="text-2xl font-bold text-tinta mb-2 font-serif">Este enlace ya no está disponible</h1>
          <p className="text-gray-600">
            {link.status === 'paid'
              ? 'Este pago ya fue completado. Si tienes dudas, escríbenos por WhatsApp.'
              : 'Este enlace de pago fue anulado.'}
          </p>
        </div>
      </main>
    );
  }

  const { base, commission, total } = computeBreakdown(link.amount);

  return (
    <main className="flex flex-col w-full min-h-screen bg-blancoluz">
      <section className="max-w-2xl mx-auto w-full px-6 pt-32 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold text-tinta mb-8 font-serif">Resumen de tu pago</h1>

        <div className="bg-white rounded-3xl shadow-sm border border-salvia p-8">
          <div className="pb-6 border-b border-gray-100">
            <p className="text-sm text-gray-500">Concepto</p>
            <p className="text-lg font-bold text-gray-800">{link.concept}</p>
          </div>

          <div className="py-6 space-y-3 text-gray-600 border-b border-gray-100">
            <div className="flex justify-between">
              <span>Importe</span>
              <span>{fmt(base)}</span>
            </div>
            <div className="flex justify-between">
              <span>Comisión de la pasarela de pago ({Math.round(BOLD_COMMISSION_RATE * 100)}%)</span>
              <span>{fmt(commission)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-6">
            <span className="text-lg font-bold text-tinta">Total a pagar</span>
            <span className="text-2xl font-black text-eucalipto-dark">{fmt(total)}</span>
          </div>

          <BoldPaymentButton amount={String(total)} description={link.concept} orderPrefix={`LINK-${link.token}`} />

          <p className="text-xs text-gray-400 text-center mt-4">
            Pago seguro procesado por Bold. La comisión de la pasarela se muestra desglosada y se incluye en el total.
          </p>
        </div>
      </section>
    </main>
  );
}
