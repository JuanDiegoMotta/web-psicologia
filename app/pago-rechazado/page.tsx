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

async function PagoRechazadoContent() {
    const headersList = await headers();
    const referer = headersList.get('referer');

    if (!referer) {
        redirect('/');
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#FFF5F3]/30 px-6 py-24">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 md:p-14 text-center border border-pink-100">

                <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-8">
                    ⚠️
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
                    Pago no procesado
                </h1>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Lo sentimos, pero no pudimos completar la transacción. Esto puede deberse a fondos insuficientes, datos incorrectos o una restricción de tu banco.
                    <br /><br />
                    <span className="font-medium text-gray-800">Tranquilo/a: No se ha realizado ningún cargo en tu cuenta.</span>
                </p>

                <div className="space-y-4">
                    <Link
                        href="/servicios"
                        className="block w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition-all shadow-md"
                    >
                        Intentar de nuevo
                    </Link>

                    <Link
                        href="/contacto"
                        className="block w-full text-gray-500 font-bold hover:underline"
                    >
                        Tengo problemas técnicos, contactar
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default async function PagoRechazadoPage() {
    await connection();
    return (
        <Suspense fallback={null}>
            <PagoRechazadoContent />
        </Suspense>
    );
}
