'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setMessage('¡Listo! Revisa tu correo. Gracias por unirte 💚');
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setMessage(data.error || 'No pudimos completar la suscripción. Inténtalo de nuevo.');
      }
    } catch {
      setStatus('error');
      setMessage('Hubo un problema de conexión. Inténtalo de nuevo.');
    }
  }

  return (
    <section className="w-full py-20 px-6 bg-arena border-t border-salvia">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-14 rounded-3xl shadow-md text-center">
        <div className="text-4xl mb-4">💌</div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-serif">
          ¿Te gustaría recibir estos artículos en tu correo?
        </h3>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Únete a nuestra comunidad. Cero spam, solo reflexiones útiles y herramientas prácticas para tu bienestar, una vez al mes.
        </p>

        {status === 'success' ? (
          <p className="text-eucalipto-dark font-semibold text-lg">{message}</p>
        ) : (
          <>
            <form
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu mejor correo electrónico"
                required
                disabled={status === 'loading'}
                className="w-full sm:w-2/3 px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eucalipto disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-1/3 bg-eucalipto-dark hover:bg-eucalipto-darker text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Enviando…' : 'Suscribirme'}
              </button>
            </form>
            {status === 'error' && (
              <p className="text-red-600 text-sm mt-4">{message}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
