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
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-24">

          {/*--- Columna Izda: Imagen (Más grande y expandida) ---*/}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="relative w-full max-w-sm md:max-w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/daniela/daniela-escritorio.jpg"
                alt="Psicóloga Dani Vargas en su consultorio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
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

      {/* --- SECCIÓN: SERVICIOS --- */}
      <section className="w-full py-24 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Encabezado de la sección */}
          <div className="text-center mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
              ¿Cómo puedo ayudarte?
            </h2>
            <p className="text-gray-600 md:text-lg">
              Encuentra el espacio perfecto para tus necesidades. Trabajo con enfoques basados en evidencia para garantizar los mejores resultados en tu proceso.
            </p>
          </div>

          {/* Grid de Tarjetas de Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            
            {/* Tarjeta 1: Individual */}
            <div className="bg-[#FFF5F3]/60 p-8 md:p-10 rounded-3xl border border-pink-100 flex flex-col items-start hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                🛋️
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Terapia Individual</h3>
              {/* flex-grow empuja el enlace hacia abajo sin importar cuánto texto haya */}
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                Un espacio seguro y confidencial 1 a 1 para trabajar en tu ansiedad, depresión, autoestima o gestión emocional.
              </p>
              <Link href="/servicios" className="text-pink-500 font-bold hover:text-pink-600 flex items-center gap-2">
                Saber más <span className="transform group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>

            {/* Tarjeta 2: Pareja */}
            <div className="bg-[#FFF5F3]/60 p-8 md:p-10 rounded-3xl border border-pink-100 flex flex-col items-start hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                🫶
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Terapia de Pareja</h3>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                Mejora la comunicación, resuelve conflictos estancados y reconstruye la confianza en tu relación con herramientas prácticas.
              </p>
              <Link href="/servicios" className="text-pink-500 font-bold hover:text-pink-600 flex items-center gap-2">
                Saber más <span className="transform group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>

            {/* Tarjeta 3: Online */}
            <div className="bg-[#FFF5F3]/60 p-8 md:p-10 rounded-3xl border border-pink-100 flex flex-col items-start hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                💻
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Terapia Online</h3>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                La misma calidad y calidez de la terapia presencial, pero desde la comodidad de tu casa, sin importar en qué país estés.
              </p>
              <Link href="/servicios" className="text-pink-500 font-bold hover:text-pink-600 flex items-center gap-2">
                Saber más <span className="transform group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>

          </div>
          
          {/* Botón secundario global */}
          <div className="mt-16">
            <Link 
              href="/contacto" 
              className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-4 px-10 rounded-full transition-colors shadow-md"
            >
              Agendar mi primera sesión
            </Link>
          </div>

        </div>
      </section>
{/* --- SECCIÓN: TESTIMONIOS --- */}
      <section className="w-full py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Encabezado */}
          <div className="text-center mb-20 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
              Palabras de quienes ya dieron el paso
            </h2>
            <p className="text-gray-600 md:text-lg">
              Testimonios reales de personas que han recorrido este camino hacia su bienestar emocional.
            </p>
          </div>

          {/* Grid de Testimonios (Con mayor gap-y para la versión móvil) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 w-full mt-4">
            
            {/* Testimonio 1 */}
            <div className="bg-[#FFF5F3]/30 px-8 pb-8 pt-14 rounded-3xl border border-pink-50 relative flex flex-col">
              {/* Avatar Flotante */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white rounded-full border-4 border-white shadow-md overflow-hidden">
                <Image 
                  src="images/ilustrations/avatar-woman.svg" 
                  alt="Avatar Mujer" 
                  fill 
                  className="object-cover" 
                />
              </div>

              {/* Estrellas */}
              <div className="flex justify-center gap-1 mb-4 text-pink-400 text-sm">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-gray-600 italic mb-6 flex-grow leading-relaxed text-center">
                "Llegué con niveles de ansiedad que no me dejaban vivir tranquila. Dani no solo me escuchó sin juzgarme, sino que me dio herramientas súper prácticas que aplico todos los días. Mi vida cambió."
              </p>
              <div className="text-center">
                <p className="font-bold text-gray-800">C. M.</p>
                <p className="text-sm text-gray-500">Terapia Individual</p>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className="bg-[#FFF5F3]/30 px-8 pb-8 pt-14 rounded-3xl border border-pink-50 relative flex flex-col">
              {/* Avatar Flotante */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white rounded-full border-4 border-white shadow-md overflow-hidden">
                <Image 
                  src="images/ilustrations/avatar-couple.svg" 
                  alt="Avatar Pareja" 
                  fill 
                  className="object-cover pt-2" 
                />
              </div>

              <div className="flex justify-center gap-1 mb-4 text-pink-400 text-sm">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-gray-600 italic mb-6 flex-grow leading-relaxed text-center">
                "Estábamos a punto de separarnos cuando empezamos las sesiones. Aprender a comunicarnos desde la empatía y dejar de atacarnos salvó nuestra relación. Estamos inmensamente agradecidos."
              </p>
              <div className="text-center">
                <p className="font-bold text-gray-800">A. y J.</p>
                <p className="text-sm text-gray-500">Terapia de Pareja</p>
              </div>
            </div>

            {/* Testimonio 3 */}
            <div className="bg-[#FFF5F3]/30 px-8 pb-8 pt-14 rounded-3xl border border-pink-50 relative flex flex-col">
              {/* Avatar Flotante */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white rounded-full border-4 border-white shadow-md overflow-hidden">
                <Image 
                  src="images/ilustrations/avatar-male.svg" 
                  alt="Avatar Hombre" 
                  fill 
                  className="object-cover" 
                />
              </div>

              <div className="flex justify-center gap-1 mb-4 text-pink-400 text-sm">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-gray-600 italic mb-6 flex-grow leading-relaxed text-center">
                "Pensé que la terapia online iba a sentirse fría, pero Dani logra transmitir muchísima cercanía a través de la pantalla. Ha sido la mejor inversión que he hecho en mi crecimiento personal."
              </p>
              <div className="text-center">
                <p className="font-bold text-gray-800">L. R.</p>
                <p className="text-sm text-gray-500">Terapia Online</p>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* --- AQUÍ IRÁN LAS SIGUIENTES SECCIONES (Servicios, etc.) --- */}
{/* --- SECCIÓN: CONTACTO RÁPIDO --- */}
      <section className="w-full py-24 px-6  bg-gradient-to-b from-[#FFF5F3](50) to-pink-200/40 border-t border-pink-100">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-pink-100/50">

          {/* Mitad Izquierda: Info directa y WhatsApp */}
          <div className="w-full lg:w-2/5 bg-pink-50 p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">
            {/* Elementos decorativos sutiles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/40 rounded-tr-full"></div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 z-10 tracking-tight font-serif">
              ¿Dudas sobre cómo empezar?
            </h3>
            <p className="text-gray-600 mb-8 z-10 leading-relaxed">
              Escríbeme directamente por WhatsApp para una respuesta rápida, o déjame tus datos en el formulario y me pondré en contacto contigo lo antes posible.
            </p>

            <a
              href="https://wa.me/573016245662?text=%C2%A1Hola%21%20estoy%20interesad@%20en%20las%20consultas%20psicol%C3%B3gicas."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white p-4 rounded-2xl hover:shadow-md transition-shadow group z-10 w-fit"
            >
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                💬
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">WhatsApp Directo</p>
                <p className="text-gray-800 font-medium">+57 301 624 5662</p>
              </div>
            </a>
          </div>

          {/* Mitad Derecha: Formulario Reducido */}
          <div className="w-full lg:w-3/5 p-10 md:p-14">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Déjame tus datos</h3>

            {/* Nota: Si vas a manejar el estado onSubmit aquí igual que en la página de contacto, 
                recuerda poner 'use client'; en la primera línea del archivo de tu página de inicio. */}
            <form className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Tu nombre *"
                  required
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors text-gray-700"
                />
                <input
                  type="tel"
                  placeholder="Celular / WhatsApp *"
                  required
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors text-gray-700"
                />
              </div>
              
              <input
                type="email"
                placeholder="Tu correo electrónico *"
                required
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors text-gray-700"
              />
              
              <textarea
                rows={3}
                placeholder="¿En qué te puedo ayudar? (Opcional)"
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors resize-none text-gray-700"
              ></textarea>

              <button
                type="button" 
                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5 mt-2"
              >
                Enviar mensaje
              </button>
              
              <p className="text-xs text-gray-400 text-center mt-2">
                Tus datos están protegidos por nuestra política de privacidad.
              </p>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
}