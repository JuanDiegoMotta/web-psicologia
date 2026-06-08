import Image from 'next/image';

export default function TerapiaInfantojuvenilPage() {
  return (
    <main className="flex flex-col w-full">
      
      {/* --- HERO / HOOK EMPÁTICO --- */}
      <section className="relative w-full pt-32 pb-24 px-6 text-center overflow-hidden">
        
        {/* Imagen de fondo optimizada (Sugiero una imagen cálida de un padre/madre con su hijo, o un niño jugando/dibujando) */}
        <Image
          src="/images/backgrounds/infant.jpg" 
          alt="Acompañamiento psicológico para niños y adolescentes" 
          fill 
          className="absolute inset-0 object-cover z-0" 
          priority 
          sizes="100vw" 
        />

        {/* Capa oscura semitransparente para dar contraste al texto */}
        <div className="absolute inset-0 bg-gray-900/40 z-10" />

        <div className="max-w-4xl mx-auto relative z-20">
          <span className="text-eucalipto-dark font-bold uppercase tracking-wider text-sm mb-4 block drop-shadow-sm">
            Psicología para Niños y Adolescentes
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blancoluz mb-8 tracking-tight font-serif leading-tight drop-shadow-md">
            ¿Te preocupa no saber cómo acompañar a tu hijo/a en esta etapa?
          </h1>
          <p className="text-xl md:text-2xl text-blancoluz/80 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Si notas que se muestra ansioso, triste, irritable o desconectado, no tienes que enfrentarlo sola/o. Recibe orientación clara para guiarlo, mientras él/ella aprende a manejar sus emociones.
          </p>
          <a 
            href="#inversion" 
            className="inline-block bg-eucalipto-dark hover:bg-eucalipto-darker text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
          >
            Quiero agendar una valoración
          </a>
        </div>
      </section>

      {/* --- IDENTIFICACIÓN DEL DOLOR Y LA SOLUCIÓN (Doble Enfoque) --- */}
      <section className="w-full py-20 px-6 bg-blancoluz/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-800 font-serif">Un proceso pensado para ambos</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">La terapia infantojuvenil es un trabajo en equipo. Creamos un espacio seguro para tu hijo, pero también te damos las herramientas a ti.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            
            {/* Beneficios para el Niño/Adolescente */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-arena h-full">
              <div className="w-14 h-14 bg-arena rounded-2xl flex items-center justify-center text-3xl mb-6">
                🧸
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Para tu hijo/a o adolescente</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> Manejar la ansiedad, el enojo y la tristeza de forma más sana.</li>
                <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> Mejorar su autoestima y seguridad personal.</li>
                <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> Desarrollar habilidades sociales y de comunicación.</li>
                <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> Tener un espacio de confianza para expresarse sin miedo a ser juzgado.</li>
                <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> Aumentar la motivación y la confianza en sí mismo.</li>
              </ul>
            </div>

            {/* Beneficios para los Padres */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-arena h-full">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
                👨‍👩‍👧‍👦
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Para ti, como madre o padre</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✔</span> Recibir orientación clara para entender su mundo emocional.</li>
                <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✔</span> Mejorar la comunicación y reducir los conflictos en casa.</li>
                <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✔</span> Aprender estrategias prácticas para acompañarlo en cada etapa de desarrollo.</li>
                <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✔</span> Entender el origen de sus conductas desafiantes o su aislamiento.</li>
                <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✔</span> Sentirte acompañado/a y guiado/a por un profesional en este proceso.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- CÓMO FUNCIONA Y BENEFICIOS ONLINE --- */}
      <section className="w-full py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Metodología */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight font-serif">
              ¿Cómo funciona?
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-salvia text-eucalipto-dark rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Primera sesión (70 min)</h3>
                  <p className="text-gray-600">Espacio con los padres y el niño/a para conocer la situación actual, la historia familiar y las expectativas.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-salvia text-eucalipto-dark rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Evaluación inicial</h3>
                  <p className="text-gray-600">Comprensión profunda de los desafíos emocionales y conductuales del menor.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-salvia text-eucalipto-dark rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Plan de trabajo</h3>
                  <p className="text-gray-600">Definimos objetivos claros, tareas prácticas y un acompañamiento personalizado para la familia.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-salvia text-eucalipto-dark rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Seguimiento y Retroalimentación</h3>
                  <p className="text-gray-600">Sesiones periódicas con el menor y espacios exclusivos de retroalimentación para guiar a los padres.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Beneficios Online / Presencial */}
          <div className="w-full lg:w-1/2 bg-gray-800 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-eucalipto-dark/20 rounded-bl-full blur-xl"></div>
            <h3 className="text-2xl font-bold mb-8 z-10 relative">La Terapia desde Casa</h3>
            <ul className="space-y-5 z-10 relative">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">🏡</span> 
                <span><strong>Entorno seguro:</strong> El niño/a se conecta desde su propio cuarto, reduciendo la ansiedad clínica.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">🕒</span> 
                <span><strong>Flexibilidad:</strong> Facilidad para ajustar las sesiones con los horarios escolares y familiares.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">✨</span> 
                <span><strong>Efectividad:</strong> Igual de efectiva que la presencial, avalada por la APA.</span>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-gray-700 z-10 relative">
              <p className="text-eucalipto-dark text-sm font-medium">
                📍 Nota: También ofrecemos procesos presenciales en Bogotá, Colombia y alrededores si el caso lo requiere.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- AUTORIDAD (Mini Bio Equipo) --- */}
      <section className="w-full py-16 px-6 bg-blancoluz/50 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed italic mb-6">
            "Junto a mi equipo de psicólogos especializados en infancia y adolescencia, hemos creado un espacio humano para que tu hijo/a se sienta validado, mientras tú recibes las herramientas para fortalecer el vínculo familiar."
          </p>
          <p className="text-gray-500">— Psicóloga Dani Vargas & Equipo</p>
        </div>
      </section>

      {/* --- PRECIOS / INVERSIÓN --- */}
      <section id="inversion" className="w-full py-24 px-6 bg-gray-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight font-serif">
              Opciones de inversión en el bienestar de tu hijo/a
            </h2>
            <p className="text-gray-600 md:text-lg">
              Elige el plan inicial para la valoración y acompañamiento.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Paquete 1: 1 Sesión */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <span>📌</span> Una Sesión
              </h3>
              <p className="text-2xl font-black text-gray-900 mb-6">$140.000 COP</p>
              
              <div className="flex-grow space-y-4 text-sm text-gray-600">
                <p>El primer paso fundamental para comprender la situación actual, conocer al profesional y recibir orientación inicial sobre cómo abordar el problema en casa.</p>
              </div>
              
              <a 
                href="https://wa.me/573016245662?text=%C2%A1Hola%21%20Quiero%20agendar%20una%20Sesi%C3%B3n%20Infantojuvenil."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center bg-salvia hover:bg-salvia text-eucalipto-dark font-bold py-3 rounded-xl transition-colors"
              >
                Agendar Valoración
              </a>
            </div>

            {/* Paquete 2: 3 Sesiones */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-1">
                <span>🌿</span> Paquete de 3 sesiones
              </h3>
              <p className="text-3xl font-black text-gray-900 mb-1">$343.900 COP</p>
              <p className="text-xs text-gray-500 mb-6">Suscripción por 40 días • <span className="font-semibold text-green-600">Ahorras $76.100</span></p>
              
              <div className="flex-grow space-y-4 text-sm text-gray-600">
                <p>Ideal para comenzar a implementar cambios en casa. Permite hacer la evaluación inicial y las primeras devoluciones de pautas de crianza y manejo emocional.</p>
              </div>
              
              <a 
                href="https://wa.me/573016245662?text=%C2%A1Hola%21%20Quiero%20agendar%20el%20Paquete%20de%203%20Sesiones%20Infantojuvenil."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Agendar Paquete de 3
              </a>
            </div>

            {/* Paquete 3: 5 Sesiones (Destacado Infantil) */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-eucalipto flex flex-col h-full relative transform lg:-translate-y-4">
               <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-eucalipto-dark text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full w-max">
                Mejor para Resultados
              </div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-1">
                <span>🌟</span> Paquete de 5 sesiones
              </h3>
              <p className="text-3xl font-black text-eucalipto-dark mb-1">$493.900 COP</p>
              <p className="text-xs text-gray-500 mb-6">Suscripción por 60 días • <span className="font-semibold text-green-600">Ahorras $206.100</span></p>
              
              <div className="flex-grow space-y-4 text-sm text-gray-600">
                <p><strong>La mejor opción.</strong> El trabajo con niños y adolescentes requiere tiempo para crear vínculo y confianza. Este paquete garantiza la constancia necesaria para ver resultados significativos en su conducta y bienestar.</p>
              </div>
              
              <a 
                href="https://wa.me/573016245662?text=%C2%A1Hola%21%20Quiero%20agendar%20el%20Paquete%20de%205%20Sesiones%20Infantojuvenil."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center bg-eucalipto-dark hover:bg-eucalipto-darker text-white font-bold py-4 rounded-xl transition-colors shadow-md"
              >
                Agendar Paquete de 5
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA DE CIERRE --- */}
      <section className="w-full py-20 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-8">
            💛 La infancia y la adolescencia son etapas decisivas. Tu hijo/a no tiene que enfrentar solo la ansiedad, la tristeza o la inseguridad. Hoy puedes darle la oportunidad de contar con un espacio seguro.
          </p>
          <a 
            href="https://wa.me/573016245662?text=%C2%A1Hola%21%20estoy%20interesad@%20en%20la%20terapia%20infantojuvenil." 
            target="_blank"
            rel="noopener noreferrer"
            className="text-eucalipto-dark font-bold text-xl hover:text-eucalipto-darker underline underline-offset-4 transition-colors"
          >
            ✨ Da el primer paso y agenda su terapia ahora
          </a>
        </div>
      </section>

    </main>
  );
}