'use client';

import { useState } from 'react';
import Script from 'next/script';

// Declaramos que BoldCheckout existirá en el objeto window
declare global {
  interface Window {
    BoldCheckout: any;
  }
}

interface BoldPaymentButtonProps {
  amount: string; // Ejemplo: '150000' (Sin puntos ni comas)
  description: string;
  orderPrefix: string;
}

export default function BoldPaymentButton({ amount, description, orderPrefix }: BoldPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // 1. Generamos un ID de orden único para esta venta
      const orderId = `${orderPrefix}-${Date.now()}`;
      const currency = 'COP';

      // 2. Pedimos el Hash de Integridad a nuestro servidor seguro
      const response = await fetch('/api/pagos/hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, amount, currency }),
      });
      const data = await response.json();

      if (!data.hash) throw new Error('No se pudo generar la firma de seguridad');

      // 4. Inicializamos la pasarela de Bold

      const checkout = new window.BoldCheckout({
        orderId: orderId,
        currency: currency,
        amount: amount,
        apiKey: process.env.NEXT_PUBLIC_BOLD_API_KEY,
        integritySignature: data.hash,
        description: description,
        // Aquí pondremos la URL a la que vuelve el cliente tras pagar:
        redirectionUrl: `${window.location.origin}/verificar-pago`,
      });

      // 5. ¡Abrimos la pasarela!
      checkout.open();

    } catch (error) {
      console.error('Error al iniciar el pago:', error);
      alert('Hubo un problema al conectar con la pasarela de pago. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.bold.co/library/boldPaymentButton.js"
        strategy="lazyOnload"
      />
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`w-full py-4 rounded-xl font-bold transition-all shadow-md flex justify-center items-center gap-2 ${isLoading
          ? 'bg-eucalipto text-white cursor-not-allowed'
          : 'bg-eucalipto-dark hover:bg-eucalipto-darker text-white transform hover:-translate-y-0.5'
          }`}
      >
        {isLoading ? 'Cargando pasarela...' : `Pagar $${parseInt(amount).toLocaleString('es-CO')} COP`}
      </button>
    </>
  );
}