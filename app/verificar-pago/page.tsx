'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerificarPagoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Leemos los parámetros que Bold añade a la URL (Suele ser 'status', 'payment_status' o 'state')
    // Nota: El nombre exacto del parámetro lo verás cuando hagas la primera prueba
    const status = searchParams.get('status') || searchParams.get('payment_status'); 

    // Simulamos un pequeño tiempo de carga para que no sea tan brusco
    const timer = setTimeout(() => {
      if (status === 'APPROVED' || status === 'PAID' || status === 'approved') {
        router.push('/pago-completado');
      } else if (status === 'REJECTED' || status === 'FAILED' || status === 'rejected') {
        router.push('/pago-rechazado');
      } else {
        // Si por alguna razón el usuario llega aquí sin estado (tecleó la URL a mano)
        router.push('/');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFF5F3]/30">
      <div className="text-center">
        {/* Un pequeño spinner de carga amigable */}
        <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-2xl font-bold text-gray-800 font-serif mb-2">
          Verificando tu pago...
        </h1>
        <p className="text-gray-500">Por favor no cierres esta ventana.</p>
      </div>
    </main>
  );
}