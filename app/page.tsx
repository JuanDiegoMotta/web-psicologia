import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex flex-col w-full">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/*Video de fondo*/}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video/hero-video.mp4" type="video/mp4"/>
          Tu navegador no soporta la etiqueta de video.

        </video>
        {/*Capa de superposición (Overlay)*/}
        <div className="absolute inset-0 bg-[#FFF5F3]/70 z-10"></div>

        {/*Contenido principal del Hero*/}
        <div className="relative z-20 max-w-3xl flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 tracking-tight">
            Tu espacio seguro para <span className="text-pink-500">sanar</span> y <span className="text-pink-500">crecer</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-800 mb-10 max-w-2xl drop-shasdow-sm">
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

      {/*--- SECCIÓN SOBRE MÍ ---*/}
      <section className="w-full py-24 px-6 bg-[#FFF5F3]/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-12">

          {/*--- Columna Izda: Imagen (Diseño Limpio Original) ---*/}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/daniela/sobre-mi-1.jpg"
                alt="Psicóloga Dani Vargas en su consultorio"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/*--- Columna Dcha: Texto y autoridad ---*/}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10 mt-8 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 tracking-tight">
              Sobre mí
            </h2>
            
            <div className="space-y-5 text-gray-600 md:text-lg leading-relaxed">
              <p>
                Soy <strong className="text-gray-800 font-semibold">Dani Vargas</strong>, Psicóloga Clínica especializada en terapias basadas en evidencia como la Cognitivo Conductual y Terapias Contextuales.
              </p>
              <p>
                He acompañado personalmente <span className="text-pink-500 font-medium">más de 7.800 horas de terapia</span> a más de 700 personas, ayudándoles a recuperar la calma y el sentido en sus vidas.
              </p>
              <p>
                Junto a mi equipo, acompañamos a miles de personas en Colombia, Latinoamérica y Estados Unidos con un enfoque claro:
              </p>
              
              {/* Cita Destacada (Blockquote) */}
              <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-r-lg mt-4 text-left">
                <p className="font-medium text-gray-800 italic">
                  "Mi misión es brindarte un espacio seguro, humano y práctico, donde puedas sanar y crecer."
                </p>
              </div>
            </div>
            
            <Link 
              href="/sobre-mi" 
              className="mt-8 inline-block border-2 border-pink-400 text-pink-500 hover:bg-pink-400 hover:text-white font-medium py-3 px-8 rounded-full transition-colors"
            >
              Conóceme más
            </Link>
          </div>
          
        </div>
      </section>

      {/* --- AQUÍ IRÁN LAS SIGUIENTES SECCIONES (Servicios, etc.) --- */}
    </main>
  );
}