import Image from 'next/image';

export default function TerapiaParejaPage() {
  return (
    <main className="flex flex-col w-full">
      
      {/* --- HERO / HOOK EMPÁTICO --- */}
      <section className="relative w-full pt-32 pb-24 px-6 text-center overflow-hidden">
        
        {/* Imagen de fondo optimizada (Asegúrate de poner una imagen de una pareja o ambiente cálido aquí) */}
        <Image
          src="/images/backgrounds/couples-3.jpg" 
          alt="Pareja sentada junta, reflejando la búsqueda de conexión" 
          fill 
          className="absolute inset-0 object-cover z-0" 
          priority 
          sizes="100vw" 
        />

        {/* Capa oscura semitransparente para dar contraste al texto */}
        <div className="absolute inset-0 bg-gray-900/60 z-10" />

        <div className="max-w-4xl mx-auto relative z-20">
          <span className="text-eucalipto-dark font-bold uppercase tracking-wider text-sm mb-4 block drop-shadow-sm">
            Terapia Integrativa de Pareja (TIP)
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blancoluz mb-8 tracking-tight font-serif leading-tight drop-shadow-md">
            ¿Sienten que discuten más de lo que disfrutan juntos?
          </h1>
          <p className="text-xl md:text-2xl text-blancoluz/80 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Si la confianza se ha debilitado o la comunicación ya no fluye como antes, la terapia de pareja puede ser ese punto de inflexión para recuperar la conexión emocional y fortalecer el vínculo.
          </p>
          <a 
            href="#inversion" 
            className="inline-block bg-eucalipto-dark hover:bg-eucalipto-darker text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
          >
            Queremos empezar nuestro proceso
          </a>
        </div>
      </section>

      {/* --- IDENTIFICACIÓN DEL DOLOR Y LA SOLUCIÓN --- */}
      <section className="w-full py-20 px-6 bg-blancoluz/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Columna Izquierda: El Dolor / Objetivo */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-arena">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
              💔
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Este espacio es para ustedes si buscan...</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">💬</span> Mejorar la comunicación y dejar de girar en círculos.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">🔄</span> Resolver conflictos y diferencias estancadas.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">🤝</span> Recuperar la confianza mutua tras una crisis.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">🌱</span> Afrontar cambios importantes en su vida de pareja.</li>
            </ul>
          </div>

          {/* Columna Derecha: La Solución */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-arena">
            <div className="w-14 h-14 bg-arena rounded-2xl flex items-center justify-center text-3xl mb-6">
              ❤️‍🩹
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Juntos lograremos:</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> <strong>Reconexión:</strong> Volver a encontrarse en lo emocional y lo sexual.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> <strong>Perdón y Aceptación:</strong> Herramientas para sanar heridas del pasado.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> <strong>Crecimiento mutuo:</strong> Crecer juntos como pareja y como individuos.</li>
              <li className="flex items-start gap-3"><span className="text-eucalipto-dark">✨</span> <strong>Acuerdos reales:</strong> Transformar las discusiones en soluciones.</li>
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
                <div className="w-10 h-10 shrink-0 bg-salvia text-eucalipto-dark rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Primera sesión (70 min)</h3>
                  <p className="text-gray-600">Exploramos sus desafíos actuales, la historia de la relación y sus expectativas conjuntas.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-salvia text-eucalipto-dark rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Evaluación inicial</h3>
                  <p className="text-gray-600">Identificamos las fortalezas, dificultades y dinámicas ocultas de la pareja.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-salvia text-eucalipto-dark rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Plan de trabajo</h3>
                  <p className="text-gray-600">Fijamos objetivos claros y realistas para mejorar la relación.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-salvia text-eucalipto-dark rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Proceso continuo</h3>
                  <p className="text-gray-600">Avanzamos con técnicas y tareas prácticas basadas en la Terapia Integrativa de Pareja.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Beneficios Online */}
          <div className="w-full lg:w-1/2 bg-gray-800 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-eucalipto-dark/20 rounded-bl-full blur-xl"></div>
            <h3 className="text-2xl font-bold mb-8 z-10 relative">Beneficios de la modalidad Online</h3>
            <ul className="space-y-5 z-10 relative">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">🌍</span> 
                <span><strong>Sin barreras:</strong> Siempre tendrán acceso, sin importar dónde estén.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">🏡</span> 
                <span><strong>Comodidad:</strong> Sesiones desde la privacidad de su espacio.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">🕒</span> 
                <span><strong>Flexibilidad horaria</strong> para que ambos puedan coordinar.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">✨</span> 
                <span><strong>Igual de efectiva</strong> que la presencial (respaldada por la APA).</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* --- AUTORIDAD (Mini Bio Parejas) --- */}
      <section className="w-full py-16 px-6 bg-blancoluz/50 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed italic mb-6">
            "Soy Psicóloga Clínica con formación especializada en <strong className="text-eucalipto-dark">Terapia Integrativa de Pareja (TIP)</strong>. Mi compromiso es claro: ayudarles a construir una relación más sana, plena y consciente."
          </p>
          <p className="text-gray-500">— Psicóloga Dani Vargas</p>
        </div>
      </section>

      {/* --- PRECIOS / INVERSIÓN (PAREJAS) --- */}
      <section id="inversion" className="w-full py-24 px-6 bg-gray-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight font-serif">
              Opciones de inversión en su relación
            </h2>
            <p className="text-gray-600 md:text-lg">
              Elijan el acompañamiento que mejor se adapte a sus necesidades.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Paquete 1: 1 Sesión */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <span>📌</span> Sesión Única
              </h3>
              <p className="text-2xl font-black text-gray-900 mb-6">$170.000 COP</p>
              
              <div className="flex-grow space-y-4 text-sm text-gray-600">
                <p className="font-medium text-gray-800">Ideal si desean:</p>
                <p>Tener una primera sesión para explorar la situación actual y comprender juntos qué está pasando en la relación antes de comprometerse a un paquete mayor.</p>
              </div>
              
              <a 
                href="https://wa.me/573016245662?text=%C2%A1Hola%21%20Queremos%20agendar%20una%20Sesi%C3%B3n%20%C3%9Anica%20de%20Pareja."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center bg-salvia hover:bg-salvia text-eucalipto-dark font-bold py-3 rounded-xl transition-colors"
              >
                Agendar 1 Sesión
              </a>
            </div>

            {/* Paquete 2: 3 Sesiones */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-eucalipto flex flex-col h-full relative transform lg:-translate-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-1">
                <span>✅</span> Paquete de 3 sesiones
              </h3>
              <p className="text-3xl font-black text-eucalipto-dark mb-1">$439.800 COP</p>
              <p className="text-xs text-gray-500 mb-6">Suscripción por 40 días • <span className="font-semibold text-green-600">Ahorran $70.200</span></p>
              
              <div className="flex-grow space-y-4 text-sm text-gray-600">
                <p className="font-medium text-gray-800">Perfecto para:</p>
                <p>Empezar a identificar dinámicas tóxicas, establecer objetivos conjuntos y recibir las primeras herramientas de comunicación asertiva para aplicar en casa.</p>
              </div>
              
              <a 
                href="https://wa.me/573016245662?text=%C2%A1Hola%21%20Queremos%20agendar%20el%20Paquete%20de%203%20Sesiones%20de%20Pareja."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center bg-eucalipto-dark hover:bg-eucalipto-darker text-white font-bold py-4 rounded-xl transition-colors shadow-md"
              >
                Agendar Paquete de 3
              </a>
            </div>

            {/* Paquete 3: 5 Sesiones (Destacado Parejas) */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
               <div className="inline-block bg-gray-800 text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full mb-4 w-max">
                Recomendado
              </div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-1">
                <span>✨</span> Paquete de 5 sesiones
              </h3>
              <p className="text-2xl font-black text-gray-900 mb-1">$636.900 COP</p>
              <p className="text-xs text-gray-500 mb-6">Suscripción por 60 días • <span className="font-semibold text-green-600">Ahorran $213.100</span></p>
              
              <div className="flex-grow space-y-4 text-sm text-gray-600">
                <p className="font-medium text-gray-800">Ideal si buscan:</p>
                <p>Un acompañamiento más constante, con espacio profundo para trabajar temas de fondo, sanar heridas y construir acuerdos reales a largo plazo como pareja.</p>
              </div>
              
              <a 
                href="https://wa.me/573016245662?text=%C2%A1Hola%21%20Queremos%20agendar%20el%20Paquete%20de%205%20Sesiones%20de%20Pareja."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl transition-colors"
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
            💞 La relación que sueñan no tiene que quedar en el pasado. Con las herramientas adecuadas, es posible transformar las discusiones en acuerdos, la distancia en cercanía y el dolor en aprendizaje.
          </p>
          <a 
            href="https://wa.me/573016245662?text=%C2%A1Hola%21%20estamos%20interesados%20en%20las%20consultas%20de%20pareja." 
            target="_blank"
            rel="noopener noreferrer"
            className="text-eucalipto-dark font-bold text-xl hover:text-eucalipto-darker underline underline-offset-4 transition-colors"
          >
            👉 Den hoy el primer paso hacia una relación más fuerte
          </a>
        </div>
      </section>

    </main>
  );
}