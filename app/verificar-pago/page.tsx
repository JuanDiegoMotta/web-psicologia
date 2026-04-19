'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// 1. Separamos la lógica que usa 'useSearchParams' en un componente secundario
function VerificarPagoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get('status') || searchParams.get('payment_status'); 

    const timer = setTimeout(() => {
      if (status === 'APPROVED' || status === 'PAID' || status === 'approved') {
        router.push('/pago-completado');
      } else if (status === 'REJECTED' || status === 'FAILED' || status === 'rejected') {
        router.push('/pago-rechazado');
      } else {
        router.push('/');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <div className="text-center">
      {/* Un pequeño spinner de carga amigable */}
      <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-6"></div>
      <h1 className="text-2xl font-bold text-gray-800 font-serif mb-2">
        Verificando tu pago...
      </h1>
      <p className="text-gray-500">Por favor no cierres esta ventana.</p>
    </div>
  );
}

// 2. Exportamos la página principal envolviendo el contenido en <Suspense>
export default function VerificarPagoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFF5F3]/30">
      <Suspense fallback={
        // Este es un loader de repuesto que Next.js muestra mientras inicializa el Suspense
        <div className="text-center text-gray-500">Preparando verificación...</div>
      }>
        <VerificarPagoContent />
      </Suspense>
    </main>
  );
}