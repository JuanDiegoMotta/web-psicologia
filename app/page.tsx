import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col w-full">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-[#FFF5F3] overflow-hidden">
      {/*Aquí luego inyectaremos el video de fondo. Por ahora usaremos este div como base*/}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FFF5F3]/80 z-0"></div>

      {/*Contenido principal del Hero*/}
      <div className="relative z-10 max-w-3xl flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 tracking-tight">
          Tu espacio seguro para <span className="text-pink-400">sanar</span> y <span className="text-pink-400">crecer</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
          Te acompaño a través de terapia psicológica basada en evidencia para que recuperes la calma, la confianza y el sentido en tu vida.
        </p>

        <Link
          href="/servicios"
          className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-4 px-8 rounded-full transition-all shadow-md hover:shadow-lg text-lg transform hover:-translate-y-1"
        >
          Da el primer paso hoy
        </Link>
      </div>
      </section>

      {/*-- AQUÍ IRÁN LAS SIGUIENTES SECCIONES (Sobre mí, Servicios, Testimonios) ---*/}
    </main>
  );
}