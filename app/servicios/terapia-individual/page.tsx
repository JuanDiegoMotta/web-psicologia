import Image from 'next/image';
import Link from 'next/link';

export default function TerapiaIndividualPage() {
  return (
    <main className="flex flex-col w-full">
      
      {/* --- HERO / HOOK EMPÁTICO --- */}
{/* Hacemos la section relative para que la imagen absoluta se posicione dentro de ella */}
<section className="relative w-full pt-32 pb-24 px-6 text-center overflow-hidden">
  
  {/* Imagen de fondo optimizada */}
  <Image
    src="/images/backgrounds/hero-terapia-individual-3.jpg" 
    alt="Un entorno tranquilo y acogedor para la terapia online" 
    fill 
    className="absolute inset-0 object-cover z-0" 
    priority 
    sizes="100vw" 
  />

  {/* EL TRUCO SENIOR: Capa oscura semitransparente para dar contraste al texto */}
  <div className="absolute inset-0 bg-gray-900/20 z-10" />

  {/* Contenido principal: Relativo y con z-index más alto para estar sobre la imagen */}
  <div className="max-w-4xl mx-auto relative z-20">
    
    {/* Este lo dejamos rosa pero un poco más brillante (eucalipto) para que resalte en la oscuridad */}
    <span className="text-gray-800 font-bold uppercase tracking-wider text-sm mb-4 block drop-shadow-sm">
      Terapia Psicológica Online
    </span>
    
    {/* Usamos el crema de tu marca (#FDFBF1) para un contraste perfecto y elegante */}
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blancoluz mb-8 tracking-tight font-serif leading-tight drop-shadow-md">
      ¿Sientes que tu mente no descansa o que tus emociones te sobrepasan?
    </h1>
    
    {/* Mismo crema pero con opacidad (/80) para darle jerarquía visual respecto al título */}
    <p className="text-xl md:text-2xl text-blancoluz/80 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
      No tienes que enfrentarlo sola/o. La terapia es el primer paso para recuperar la calma, la confianza y el sentido en tu vida.
    </p>
    
    <a 
      href="#inversion" 
      className="inline-block bg-eucalipto-dark hover:bg-eucalipto-darker text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
    >
      Quiero empezar mi proceso
    </a>
  </div>
</section>

      {/* --- IDENTIFICACIÓN DEL DOLOR Y LA SOLUCIÓN --- */}
      <section className="w-full py-20 px-6 bg-blancoluz/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Columna Izquierda: El Dolor */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-arena">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🌧️
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Te entiendo, este espacio es para ti si buscas...</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✔</span> Manejar la ansiedad, la depresión o el estrés constante.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✔</span> Romper patrones repetitivos que te mantienen bloqueada/o.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✔</span> Encontrar un espacio seguro y humano donde hablar sin miedo a juicios.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✔</span> Aprender a manejar pensamientos intrusivos que no te dejan dormir.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✔</span> Dejar de compararte y reconstruir tu autoestima.</li>
            </ul>
          </div>

          {/* Columna Derecha: La Solución */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-arena">
            <div className="w-14 h-14 bg-arena rounded-2xl flex items-center justify-center text-3xl mb-6">
              🌱
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Juntos lograremos:</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> <strong>Más calma y confianza:</strong> Recuperando el control de tu mente y tu cuerpo.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> <strong>Gestión Emocional:</strong> Herramientas para sentir sin desbordarte.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> <strong>Vitalidad:</strong> Recuperar la energía, la motivación y el placer en tu día a día.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> <strong>Relaciones sanas:</strong> Aprender a poner límites claros sin sentir culpa.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> <strong>Aceptación:</strong> Soltar el pasado y avanzar con resiliencia.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* --- CÓMO FUNCIONA Y BENEFICIOS ONLINE --- */}
      <section className="w-full py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Metodología */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight font-serif">
              ¿Cómo funciona el proceso?
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-salvia text-eucalipto-darker rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Primera sesión (70 min)</h3>
                  <p className="text-gray-600">Exploramos a profundidad tus desafíos, tu historia emocional y tus expectativas.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-salvia text-eucalipto-darker rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Plan de trabajo a medida</h3>
                  <p className="text-gray-600">Definimos con total claridad los objetivos y la ruta terapéutica a seguir.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-salvia text-eucalipto-darker rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Técnicas y herramientas</h3>
                  <p className="text-gray-600">Te llevarás tareas prácticas entre sesiones para que el progreso no se quede solo en el consultorio.</p>
                </div>
              </div>
            </div>
            
            {/* Regalo */}
            <div className="mt-8 bg-arena border border-salvia p-4 rounded-2xl flex items-start gap-4">
              <div className="text-3xl">🎁</div>
              <p className="text-gray-700 text-sm md:text-base">
                <strong>Incluye regalo:</strong> Guía digital de bienvenida con ejercicios iniciales para acompañar tus primeros pasos desde el día uno.
              </p>
            </div>
          </div>

          {/* Beneficios Online */}
          <div className="w-full lg:w-1/2 bg-gray-800 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-eucalipto-dark/20 rounded-bl-full blur-xl"></div>
            <h3 className="text-2xl font-bold mb-8 z-10 relative">Beneficios de la modalidad Online</h3>
            <ul className="space-y-5 z-10 relative">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">📊</span> 
                <span><strong>Igual de efectiva</strong> que la presencial (respaldada por la APA).</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">⏰</span> 
                <span><strong>Flexibilidad horaria</strong> para adaptarse a tu rutina.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">🏡</span> 
                <span><strong>Sin desplazamientos:</strong> tómala desde tu lugar seguro.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">🔒</span> 
                <span><strong>Privacidad total</strong> y confianza en todo momento.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* --- AUTORIDAD (Mini Bio) --- */}
      <section className="w-full py-16 px-6 bg-blancoluz/50 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed italic mb-6">
            "A lo largo de mis <strong className="text-eucalipto-dark">+7.800 horas de experiencia clínica</strong>, he comprobado que el cambio real ocurre cuando combinamos una empatía profunda con terapias basadas en ciencia."
          </p>
          <p className="text-gray-500">— Psicóloga Dani Vargas</p>
        </div>
      </section>

      {/* --- PRECIOS / INVERSIÓN (EL NÚCLEO DEL EMBUDO) --- */}
      <section id="inversion" className="w-full py-24 px-6 bg-gray-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight font-serif">
              Opciones de inversión en tu bienestar
            </h2>
            <p className="text-gray-600 md:text-lg">
              Elige el plan que mejor se adapte a tu momento actual.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Paquete 1: 1 Sesión */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <span>🌱</span> Sesión Claridad
              </h3>
              <p className="text-sm font-semibold text-eucalipto-dark mb-6">1 sesión</p>
              
              <div className="flex-grow space-y-4 text-sm text-gray-600">
                <p className="font-medium text-eucalipto-dark italic">Para entender lo que estás viviendo y dar tus primeros pasos.</p>
                <ul className="space-y-2">
                  <li>• Evaluación profunda de tu situación emocional.</li>
                  <li>• Identificamos lo que más te está costando y te damos retroalimentación clara.</li>
                  <li>• Espacio seguro para ordenar tu proceso: lo urgente y lo confuso.</li>
                  <li>• Primeros pasos para avanzar con acompañamiento profesional.</li>
                </ul>
              </div>
              
              <a 
                href="https://wa.me/573016245662?text=%C2%A1Hola%21%20Quiero%20agendar%20una%20Sesi%C3%B3n%20Claridad%20de%20terapia%20individual."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center bg-salvia hover:bg-salvia text-eucalipto-darker font-bold py-3 rounded-xl transition-colors"
              >
                Agendar Sesión Claridad
              </a>
            </div>

            {/* Paquete 2: 3 Sesiones (Destacado) */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-eucalipto flex flex-col h-full relative transform lg:-translate-y-4">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-eucalipto-dark text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                Más Recomendado
              </div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-1">
                <span>🤎</span> Proceso Volver a ti
              </h3>
              <p className="text-sm font-semibold text-eucalipto-dark mb-6">4 sesiones</p>
              
              <div className="flex-grow space-y-4 text-sm text-gray-600">
                <p className="font-medium text-eucalipto-dark italic">Para avanzar con claridad, estructura y bases sólidas.</p>
                <ul className="space-y-2">
                  <li>• Claridad emocional y organización en lo que sientes.</li>
                  <li>• Mayor avance con guía profesional constante.</li>
                  <li>• Identificación de patrones y factores que te afectan.</li>
                  <li>• Retroalimentación continua para avanzar con conciencia.</li>
                  <li>• Construcción de bases reales para tu bienestar.</li>
                  <li>• Herramientas aplicables a tu día a día.</li>
                  <li>• Plan estructurado con objetivos y primeros avances.</li>
                </ul>
              </div>
              
              <a 
                href="https://wa.me/573016245662?text=%C2%A1Hola%21%20Quiero%20agendar%20el%20Paquete%20Impulso%20de%204%20sesiones%20de%20terapia%20individual."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center bg-eucalipto-dark hover:bg-eucalipto-darker text-white font-bold py-4 rounded-xl transition-colors shadow-md"
              >
                Agendar Proceso Volver a ti
              </a>
            </div>

            {/* Paquete 3: 5 Sesiones */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-1">
                <span>❤️‍🩹</span> Proceso Vivir en Calma
              </h3>
              <p className="text-sm font-semibold text-eucalipto-dark mb-6">8 sesiones</p>
              
              <div className="flex-grow space-y-4 text-sm text-gray-600">
                <p className="font-medium text-eucalipto-dark italic">Para profundizar, sostener tu proceso y generar cambios duraderos.</p>
                <ul className="space-y-2">
                  <li>• Proceso profundo con continuidad emocional.</li>
                  <li>• Exploración detallada de tus patrones y su origen.</li>
                  <li>• Acompañamiento sostenido sesión a sesión.</li>
                  <li>• Construcción de cambios estables en tu día a día.</li>
                  <li>• Herramientas y seguimiento para transformar desde la raíz.</li>
                </ul>
              </div>
              
              <a 
                href="https://wa.me/573016245662?text=%C2%A1Hola%21%20Quiero%20agendar%20el%20Paquete%20Transformaci%C3%B3n%20de%208%20sesiones%20de%20terapia%20individual."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Agendar Proceso Vivir en Calma
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA DE CIERRE --- */}
      <section className="w-full py-20 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-8">
            🤎 No tienes que seguir cargando con todo sola/o. La terapia es más que hablar: es un entrenamiento para tu mente y tus emociones, un camino hacia la calma, la claridad y la plenitud.
          </p>
          <a 
            href="https://wa.me/573016245662?text=%C2%A1Hola%21%20estoy%20interesad@%20en%20las%20consultas%20psicol%C3%B3gicas%20online." 
            target="_blank"
            rel="noopener noreferrer"
            className="text-eucalipto-dark font-bold text-xl hover:text-eucalipto-darker underline underline-offset-4 transition-colors"
          >
            👉 Agenda hoy tu primera sesión
          </a>
        </div>
      </section>

    </main>
  );
}