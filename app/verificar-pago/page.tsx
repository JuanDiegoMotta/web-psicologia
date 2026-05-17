'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';
// 1. Separamos la lógica que usa 'useSearchParams' en un componente secundario
function VerificarPagoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // AHORA SÍ: Leemos exactamente el parámetro 'bold-tx-status' que nos arroja la URL
    const status = searchParams.get('bold-tx-status') || searchParams.get('status'); 

    const timer = setTimeout(() => {
      // Verificamos 'approved' (en minúscula, que es como lo envía Bold)
      if (status === 'approved' || status === 'APPROVED') {
        router.push('/pago-completado');
      } 
      // Verificamos 'rejected' o 'failed'
      else if (status === 'rejected' || status === 'failed' || status === 'REJECTED' || status === 'FAILED') {
        router.push('/pago-rechazado');
      } 
      // Si por algún motivo entra sin estado válido
      else {
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