import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BoldPaymentButton from '@/components/BoldPaymentButton';
import { getGuideBySlug, getAllGuides } from '@/lib/contentful';
import { computeBreakdown, BOLD_COMMISSION_RATE } from '@/lib/pricing';

export async function generateStaticParams() {
  const guides = await getAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

const fmt = (n: number) => `$${n.toLocaleString('es-CO')} COP`;

export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  const { base, commission, total } = computeBreakdown(guide.price);

  return (
    <main className="flex flex-col w-full min-h-screen bg-blancoluz">
      <section className="max-w-2xl mx-auto w-full px-6 pt-32 pb-24">
        <Link
          href="/guias"
          className="text-eucalipto-dark font-semibold hover:text-eucalipto-darker flex items-center gap-2 mb-8 transition-colors"
        >
          <span>←</span> Volver a las guías
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-tinta mb-8 font-serif">Resumen de tu compra</h1>

        <div className="bg-white rounded-3xl shadow-sm border border-salvia p-8">
          {/* Producto */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
            {guide.coverImage.url && (
              <div className="relative w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-arena">
                <Image
                  src={guide.coverImage.url}
                  alt={guide.coverImage.alt}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            )}
            <div>
              <p className="text-lg font-bold text-gray-800">
                <span className="mr-1">{guide.emoji}</span>
                {guide.title}
              </p>
              <p className="text-sm text-gray-500">{guide.description}</p>
            </div>
          </div>

          {/* Desglose de precio */}
          <div className="py-6 space-y-3 text-gray-600 border-b border-gray-100">
            <div className="flex justify-between">
              <span>Precio de la guía</span>
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

          {/* Botón de pago Bold por el TOTAL (base + comisión) */}
          <BoldPaymentButton amount={String(total)} description={guide.title} orderPrefix={guide.slug} />

          <p className="text-xs text-gray-400 text-center mt-4">
            Pago seguro procesado por Bold. La comisión de la pasarela se muestra desglosada y se incluye en el total.
          </p>
        </div>
      </section>
    </main>
  );
}
