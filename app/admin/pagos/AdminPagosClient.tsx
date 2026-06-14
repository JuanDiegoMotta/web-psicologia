'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';
import { computeBreakdown } from '@/lib/pricing';
import type { PaymentLink } from './page';

const fmt = (n: number) => `$${n.toLocaleString('es-CO')} COP`;

export default function AdminPagosClient({ initialLinks }: { initialLinks: PaymentLink[] }) {
  const router = useRouter();
  const [origin, setOrigin] = useState('');
  const [links, setLinks] = useState<PaymentLink[]>(initialLinks);

  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => setOrigin(window.location.origin), []);

  const base = Number(amount);
  const preview = Number.isInteger(base) && base > 0 ? computeBreakdown(base) : null;

  function linkUrl(token: string) {
    return `${origin}/pago/${token}`;
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/admin/payment-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: base, concept }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setError(data.error || 'No se pudo crear el link.');
        return;
      }
      setLinks((prev) => [data.link, ...prev]);
      setAmount('');
      setConcept('');
      setStatus('idle');
    } catch {
      setStatus('error');
      setError('Error de conexión.');
    }
  }

  async function copy(token: string) {
    await navigator.clipboard.writeText(linkUrl(token));
  }

  function whatsappHref(link: PaymentLink) {
    const { total } = computeBreakdown(link.amount);
    const text = `Hola 😊 Aquí tienes tu link de pago para "${link.concept}" (${fmt(total)}):\n${linkUrl(link.token)}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }

  async function logout() {
    await createSupabaseBrowserClient().auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-blancoluz">
      <section className="max-w-3xl mx-auto w-full px-6 pt-32 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-tinta font-serif">Links de pago</h1>
          <button onClick={logout} className="text-sm text-gray-500 hover:text-eucalipto-darker underline">
            Cerrar sesión
          </button>
        </div>

        {/* Crear link */}
        <form onSubmit={handleCreate} className="bg-white rounded-3xl shadow-sm border border-salvia p-8 mb-10">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Generar un nuevo link</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Concepto</label>
              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="Ej: Sesión de valoración"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eucalipto"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Importe base (COP, sin decimales)</label>
              <input
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ej: 150000"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eucalipto"
              />
            </div>

            {preview && (
              <div className="text-sm text-gray-600 bg-arena/50 rounded-xl p-4">
                Base {fmt(preview.base)} + comisión 5% {fmt(preview.commission)} ={' '}
                <strong className="text-eucalipto-darker">total {fmt(preview.total)}</strong>
              </div>
            )}

            {status === 'error' && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-eucalipto-dark hover:bg-eucalipto-darker text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'Generando…' : 'Generar link'}
            </button>
          </div>
        </form>

        {/* Listado */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Links recientes</h2>
        {links.length === 0 ? (
          <p className="text-gray-500 text-sm">Aún no has generado ningún link.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.token} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-semibold text-gray-800">{link.concept}</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      link.status === 'paid'
                        ? 'bg-eucalipto text-tinta'
                        : link.status === 'active'
                          ? 'bg-salvia text-eucalipto-darker'
                          : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {link.status === 'paid' ? 'Pagado' : link.status === 'active' ? 'Activo' : link.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{fmt(computeBreakdown(link.amount).total)} (base {fmt(link.amount)} + 5%)</p>
                <p className="text-xs text-gray-400 break-all mb-3">{linkUrl(link.token)}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => copy(link.token)}
                    className="text-sm bg-arena hover:bg-salvia text-eucalipto-darker font-semibold py-2 px-4 rounded-full transition-colors"
                  >
                    Copiar
                  </button>
                  <a
                    href={whatsappHref(link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-eucalipto-dark hover:bg-eucalipto-darker text-white font-semibold py-2 px-4 rounded-full transition-colors"
                  >
                    Enviar por WhatsApp
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
