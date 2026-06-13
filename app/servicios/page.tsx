import Link from 'next/link';

export default function ServiciosPage() {
  return (
    <main className="flex flex-col w-full">
      
      {/* --- HERO DE SERVICIOS --- */}
        <section className="w-full pt-32 pb-20 px-6 bg-gradient-to-b from-salvia/40 via-blancoluz/60 to-white text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 tracking-tight font-serif">
            Cada proceso es único, <br />
            <span className="text-eucalipto-dark">y el tuyo también.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Por eso trabajamos contigo desde una mirada cercana y personalizada, con terapias basadas en evidencia. Elige el área en la que necesitas acompañamiento y demos juntos el primer paso.
          </p>
        </div>
      </section>

      {/* --- EL CATÁLOGO VISUAL (Grid de Servicios) --- */}
      <section className="w-full py-24 px-6 bg-white border-y border-salvia">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Tarjeta 1: Terapia Individual */}
            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-salvia transition-all duration-300 group flex flex-col items-start cursor-pointer">
              <div className="w-16 h-16 bg-arena rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                🛋️
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Terapia Individual</h2>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                Para manejar la ansiedad, la depresión o romper patrones que te bloquean. Un espacio 1 a 1, seguro y profesional, para recuperar tu vitalidad y confianza.
              </p>
              <Link href="/servicios/terapia-individual" className="inline-flex items-center gap-2 bg-arena text-eucalipto-dark font-semibold py-3 px-6 rounded-full group-hover:bg-eucalipto-dark group-hover:text-white transition-colors">
                Ver detalles <span>→</span>
              </Link>
            </div>

            {/* Tarjeta 2: Terapia de Pareja */}
            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-salvia transition-all duration-300 group flex flex-col items-start cursor-pointer">
              <div className="w-16 h-16 bg-arena rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                🫶
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Terapia de Pareja</h2>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                Reconstruye el vínculo, aprende herramientas prácticas para gestionar conflictos y crea una relación más sana, conectada y segura.
              </p>
              <Link href="/servicios/terapia-de-pareja" className="inline-flex items-center gap-2 bg-arena text-eucalipto-dark font-semibold py-3 px-6 rounded-full group-hover:bg-eucalipto-dark group-hover:text-white transition-colors">
                Ver detalles <span>→</span>
              </Link>
            </div>

            {/* Tarjeta 3: Orientación a Padres / Infantil */}
            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-salvia transition-all duration-300 group flex flex-col items-start cursor-pointer">
              <div className="w-16 h-16 bg-arena rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                🌱
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Acompañamiento a Padres</h2>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                Un espacio donde tu hijo/a aprende a entender y gestionar sus emociones y a construir resiliencia, con orientación práctica para que la familia le acompañe mejor desde casa.
              </p>
              <Link href="/servicios/terapia-infantojuvenil" className="inline-flex items-center gap-2 bg-arena text-eucalipto-dark font-semibold py-3 px-6 rounded-full group-hover:bg-eucalipto-dark group-hover:text-white transition-colors">
                Ver detalles <span>→</span>
              </Link>
            </div>

            {/* Tarjeta 4: Modalidad Online (Destacada) */}
            <div className="bg-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col items-start relative overflow-hidden">
              {/* Elemento decorativo */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-eucalipto-dark/20 rounded-full blur-2xl"></div>
              
              <div className="w-16 h-16 bg-gray-700/50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform z-10">
                💻
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 z-10">La Terapia es 100% Online</h2>
              <ul className="text-gray-300 mb-8 flex-grow space-y-3 z-10">
                <li className="flex items-center gap-2">🌍 <span className="text-sm">Sin barreras geográficas.</span></li>
                <li className="flex items-center gap-2">🏡 <span className="text-sm">Desde tu casa, con total privacidad.</span></li>
                <li className="flex items-center gap-2">🕒 <span className="text-sm">Horarios flexibles.</span></li>
                <li className="flex items-center gap-2">🤝 <span className="text-sm">Misma calidad y calidez que en presencial.</span></li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- NUESTRO EQUIPO TERAPÉUTICO --- */}
      <section className="w-full py-24 px-6 bg-arena/40">
        <div className="max-w-6xl mx-auto">
          {/* Encabezado + lead */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-eucalipto-dark font-bold uppercase tracking-wider text-sm mb-4 block">Nuestro equipo</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 tracking-tight font-serif">
              Nuestro equipo terapéutico
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Trabajamos con un equipo de psicólogas profesionales que comparten un mismo enfoque: un acompañamiento <span className="text-eucalipto-dark font-medium">cálido, humano y basado en evidencia científica</span>.
            </p>
          </div>

          {/* Grid de cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1: Selección y evolución */}
            <div className="bg-white p-8 rounded-3xl border border-salvia shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-start">
              <div className="w-14 h-14 bg-arena rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                🌿
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Selección cuidadosa</h3>
              <p className="text-gray-600 leading-relaxed">
                Seleccionamos a cada terapeuta con mucho cuidado, priorizando la calidad humana, la ética, la formación sólida y la capacidad de crear un espacio seguro para ti.
              </p>
            </div>

            {/* Card 2: Acompañamiento a tu medida */}
            <div className="bg-white p-8 rounded-3xl border border-salvia shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-start">
              <div className="w-14 h-14 bg-arena rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                🎯
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Acompañamiento a tu medida</h3>
              <p className="text-gray-600 leading-relaxed">
                Esto nos permite ofrecerte un acompañamiento flexible, especializado y alineado a tus necesidades emocionales.
              </p>
            </div>

            {/* Card 3: Cerca de ti */}
            <div className="bg-white p-8 rounded-3xl border border-salvia shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-start">
              <div className="w-14 h-14 bg-arena rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                💛
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Cerca de ti</h3>
              <p className="text-gray-600 leading-relaxed">
                Encontrarás un profesional que te escucha, te contiene y te guía con la claridad y el respeto que merece tu proceso.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECCIÓN B2B: EMPRESAS --- */}
      <section className="w-full py-24 px-6 bg-blancoluz/80 border-y border-salvia">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-full md:w-1/2">
            <span className="text-eucalipto-dark font-bold uppercase tracking-wider text-sm mb-2 block">Servicios Corporativos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 tracking-tight">
              Empresas y Entorno Laboral
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Talleres y conferencias diseñadas para transformar tu equipo. Trabajamos habilidades críticas como la gestión del estrés, comunicación asertiva y prevención del burnout.
            </p>
            <div className="flex gap-4 mb-8">
              <div className="flex-1 bg-white p-4 rounded-xl shadow-sm text-center border border-arena">
                <p className="text-2xl mb-1">🚀</p>
                <p className="text-sm font-semibold text-gray-800">Más Productividad</p>
              </div>
              <div className="flex-1 bg-white p-4 rounded-xl shadow-sm text-center border border-arena">
                <p className="text-2xl mb-1">👥</p>
                <p className="text-sm font-semibold text-gray-800">Retención de Talento</p>
              </div>
            </div>
            <Link href="/servicios/empresas" className="inline-block border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-semibold py-3 px-8 rounded-full transition-colors">
              Ver plan para empresas
            </Link>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            {/* Un pequeño collage o imagen representativa de corporativo */}
            <div className="relative w-full aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
               {/* SUGERENCIA: Aquí puedes poner una de las fotos donde sales trabajando con gente o en taller */}
               <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                 [Añadir foto corporativa]
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- PREGUNTAS FRECUENTES (FAQ) --- */}
      <section className="w-full py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center tracking-tight">
            Preguntas Frecuentes
          </h2>
          
          <div className="space-y-4">
            {/* Pregunta 1 */}
            <details className="group border border-gray-200 rounded-2xl bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-800 font-semibold">
                ¿Quién puede asistir a terapia?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-gray-600">
                Cualquier persona que desee mejorar su bienestar emocional, enfrentar un reto o crecer a nivel personal. No necesitas estar "mal" para buscar una mejor versión de ti.
              </p>
            </details>

            {/* Pregunta 2 */}
            <details className="group border border-gray-200 rounded-2xl bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-800 font-semibold">
                ¿Ir al psicólogo es signo de debilidad?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-gray-600">
                No. Al contrario, reconocer que necesitas herramientas nuevas es un acto de autocuidado y un paso inmensamente valiente hacia tu bienestar.
              </p>
            </details>

            {/* Pregunta 3 */}
            <details className="group border border-gray-200 rounded-2xl bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-800 font-semibold">
                ¿Cómo sé si necesito terapia?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-gray-600">
                Si notas cambios en tu ánimo, en tus hábitos de sueño o alimentación, o sientes que tu capacidad para manejar emociones y relaciones está al límite, la terapia puede darte el ancla que necesitas.
              </p>
            </details>

            {/* Pregunta 4 */}
            <details className="group border border-gray-200 rounded-2xl bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-800 font-semibold">
                ¿Cómo es el proceso?
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-gray-600">
                Iniciamos con una sesión de evaluación para conocer tu historia. A partir de ahí, definimos un plan de acción adaptado a ti y trabajamos juntos sesión a sesión con herramientas prácticas y basadas en evidencia.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL DIRECTO --- */}
      <section className="w-full py-20 px-6 bg-gradient-to-b from-white to-salvia/40 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Da tu primer paso hoy
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Agenda tu sesión y comienza tu proceso de bienestar desde un espacio cálido, confidencial y sin juicios.
          </p>
          {/* Aquí pondremos tu enlace directo a WhatsApp */}
          <a 
            href="https://wa.me/573016245662?text=%C2%A1Hola%21%20estoy%20interesad@%20en%20agendar%20una%20consulta." 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
          >
            Agendar por WhatsApp 💬
          </a>
        </div>
      </section>

    </main>
  );
}