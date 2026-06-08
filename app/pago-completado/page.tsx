import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { connection } from 'next/server';

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

async function PagoCompletadoContent() {
    await connection();
    const headersList = await headers();
    const referer = headersList.get('referer');

    if (!referer) {
        redirect('/');
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#FFF5F3]/30 px-6 py-24">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 md:p-14 text-center border border-pink-100">

                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
                    ✓
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
                    ¡Pago completado!
                </h1>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Muchas gracias por tu confianza. Tu transacción ha sido procesada correctamente.
                    <br /><br />
                    <span className="font-semibold text-pink-500">¿Qué sigue ahora?</span>
                    <br />
                    En unos minutos recibirás un correo electrónico con la confirmación y los detalles. No olvides revisar tu carpeta de <strong>Spam</strong>.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="block w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 rounded-xl transition-all shadow-md"
                    >
                        Volver al inicio
                    </Link>

                    <Link
                        href="/blog"
                        className="block w-full text-pink-500 font-bold hover:underline"
                    >
                        Leer algo en el blog mientras tanto
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default function PagoCompletadoPage() {
    return (
        <Suspense fallback={null}>
            <PagoCompletadoContent />
        </Suspense>
    );
}
