import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import BoldPaymentButton from '@/components/BoldPaymentButton';
import { getSupabaseAdmin } from '@/lib/supabase';
import { computeBreakdown, BOLD_COMMISSION_RATE, BOLD_MIN_AMOUNT_COP } from '@/lib/pricing';

const fmt = (n: number) => `$${n.toLocaleString('es-CO')} COP`;

// Toda la parte dinámica (params + lectura no cacheada de Supabase) vive dentro
// de <Suspense> para cumplir con cacheComponents (PPR).
async function PagoLoader({ params }: { params: Promise<{ token: string }> }) {
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
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-salvia p-8 text-center">
        <div className="text-4xl mb-4">{link.status === 'paid' ? '✅' : '🔒'}</div>
        <h1 className="text-2xl font-bold text-tinta mb-2 font-serif">Este enlace ya no está disponible</h1>
        <p className="text-gray-600">
          {link.status === 'paid'
            ? 'Este pago ya fue completado. Si tienes dudas, escríbenos por WhatsApp.'
            : 'Este enlace de pago fue anulado.'}
        </p>
      </div>
    );
  }

  const { base, commission, total } = computeBreakdown(link.amount);

  // Defensa: un link con total por debajo del mínimo de Bold fallaría con BTN-001
  // en la pasarela. En vez de mandar al cliente a ese error, mostramos un aviso.
  if (total < BOLD_MIN_AMOUNT_COP) {
    return (
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-salvia p-8 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-tinta mb-2 font-serif">Este enlace no es válido</h1>
        <p className="text-gray-600">
          El importe de este enlace no es correcto. Por favor, escríbenos por WhatsApp y te enviaremos uno nuevo.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
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
    </div>
  );
}

export default function PagoLinkPage({ params }: { params: Promise<{ token: string }> }) {
  return (
    <main className="flex flex-col w-full min-h-screen items-center justify-center bg-blancoluz px-6 py-32">
      <Suspense fallback={<p className="text-gray-400">Cargando…</p>}>
        <PagoLoader params={params} />
      </Suspense>
    </main>
  );
}
