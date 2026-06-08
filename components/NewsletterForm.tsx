'use client';

export default function NewsletterForm() {
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
        <form
          className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Tu mejor correo electrónico"
            required
            className="w-full sm:w-2/3 px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eucalipto"
          />
          <button
            type="submit"
            className="w-full sm:w-1/3 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Suscribirme
          </button>
        </form>
      </div>
    </section>
  );
}
