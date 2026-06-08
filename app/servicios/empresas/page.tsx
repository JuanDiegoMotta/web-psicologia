import Image from 'next/image';

export default function EmpresasPage() {
  return (
    <main className="flex flex-col w-full">
      
      {/* --- HERO CORPORATIVO --- */}
      <section className="relative w-full pt-32 pb-24 px-6 text-center overflow-hidden">
        
        {/* Imagen de fondo optimizada (Sugiero una foto de un equipo de trabajo en una oficina o tú dando una charla) */}
        <Image
          src="/images/backgrounds/enterprise.jpg" 
          alt="Equipo de trabajo colaborando en un ambiente sano" 
          fill 
          className="absolute inset-0 object-cover z-0" 
          priority 
          sizes="100vw" 
        />

        {/* Capa oscura semitransparente para dar contraste al texto */}
        <div className="absolute inset-0 bg-gray-900/70 z-10" />

        <div className="max-w-4xl mx-auto relative z-20">
          <span className="text-salvia font-bold uppercase tracking-wider text-sm mb-4 block drop-shadow-sm">
            Psicología Clínica Corporativa
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blancoluz mb-8 tracking-tight font-serif leading-tight drop-shadow-md">
            Impulsa el éxito de tu empresa cuidando la salud mental de tu equipo
          </h1>
          <p className="text-xl md:text-2xl text-blancoluz/80 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Brinda un espacio seguro, confiable y enriquecedor. Programas basados en evidencia científica diseñados para prevenir el burnout, retener talento y mejorar la productividad.
          </p>
          <a 
            href="#contacto-corporativo" 
            className="inline-block bg-eucalipto-dark hover:bg-eucalipto-darker text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
          >
            Solicitar propuesta para mi empresa
          </a>
        </div>
      </section>

      {/* --- EL PROBLEMA Y LA SOLUCIÓN (Enfoque B2B) --- */}
      <section className="w-full py-20 px-6 bg-blancoluz/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 font-serif leading-tight">
              Una empresa exitosa se construye con colaboradores emocionalmente sanos
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              En el entorno laboral actual, el estrés y la falta de herramientas emocionales limitan el potencial de los equipos. 
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              A través de <strong className="text-gray-800">talleres experienciales, conferencias y sesiones personalizadas</strong>, entrego a tus colaboradores el conocimiento que necesitan para gestionar sus desafíos diarios desde una postura profesional y científica.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-salvia shadow-sm text-sm font-semibold text-gray-700">
                <span>💻</span> Online Global
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-salvia shadow-sm text-sm font-semibold text-gray-700">
                <span>🏢</span> Presencial (Bogotá)
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl border border-salvia relative">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-salvia rounded-full flex items-center justify-center text-3xl shadow-sm">
              🎯
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Temáticas de Capacitación</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-eucalipto-dark font-bold">✓</span> 
                <span><strong>Gestión del estrés</strong> y prevención del síndrome de <em>Burnout</em>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-eucalipto-dark font-bold">✓</span> 
                <span><strong>Regulación emocional</strong> en entornos de alta presión.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-eucalipto-dark font-bold">✓</span> 
                <span><strong>Productividad</strong> y gestión efectiva del tiempo.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-eucalipto-dark font-bold">✓</span> 
                <span><strong>Comunicación asertiva</strong> para la resolución de conflictos.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-eucalipto-dark font-bold">✓</span> 
                <span><strong>Habilidades blandas:</strong> Liderazgo, trabajo en equipo y empatía.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-eucalipto-dark font-bold">✓</span> 
                <span>Prácticas de <strong>Mindfulness</strong> y autocuidado corporativo.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* --- EL RETORNO DE INVERSIÓN (ROI) --- */}
      <section className="w-full py-24 px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight font-serif">
              El impacto real en tu organización
            </h2>
            <p className="text-gray-400 md:text-lg max-w-2xl mx-auto">
              Cultivar la salud mental en la empresa no es solo un beneficio para el empleado, es una estrategia clave para el crecimiento del negocio a largo plazo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Beneficio 1 */}
            <div className="bg-gray-700/50 p-8 rounded-3xl border border-gray-600 hover:bg-gray-700 transition-colors">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-white mb-3">Productividad</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Colaboradores que logran gestionar sus desafíos satisfactoriamente alcanzan su máximo potencial y mejoran su rendimiento general.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="bg-gray-700/50 p-8 rounded-3xl border border-gray-600 hover:bg-gray-700 transition-colors">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-white mb-3">Clima Laboral</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Fomenta un ambiente positivo, empático y de colaboración, reduciendo la fricción y mejorando la satisfacción laboral.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="bg-gray-700/50 p-8 rounded-3xl border border-gray-600 hover:bg-gray-700 transition-colors">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-3">Retención</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Las empresas que cuidan genuinamente de sus equipos fidelizan el talento clave y reducen los altos costos de rotación.
              </p>
            </div>

            {/* Beneficio 4 */}
            <div className="bg-gray-700/50 p-8 rounded-3xl border border-gray-600 hover:bg-gray-700 transition-colors">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-bold text-white mb-3">Prevención</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Mitiga las bajas por estrés y el "síndrome del trabajador quemado", protegiendo la salud operativa de la empresa.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA FINAL (CONTACTO B2B) --- */}
      <section id="contacto-corporativo" className="w-full py-24 px-6 bg-white text-center scroll-mt-20">
        <div className="max-w-3xl mx-auto flex flex-col items-center bg-arena p-10 md:p-16 rounded-3xl border border-salvia shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 font-serif">
            Diseñemos un plan a la medida
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Cada empresa es única. Cuéntame sobre los desafíos actuales de tu equipo y estructuraremos un programa de talleres o conferencias adaptado a tus necesidades específicas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            {/* Botón WhatsApp */}
            <a 
              href="https://wa.me/573016245662?text=%C2%A1Hola%21%20Me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20sus%20servicios%20para%20empresas." 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>💬</span> Escribir por WhatsApp
            </a>
            
            {/* Botón Email (Suele ser más usado en corporativo) */}
            <a 
              href="mailto:danielavargaspsicologa@gmail.com?subject=Solicitud%20de%20Servicios%20Corporativos" 
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>✉️</span> Enviar un Correo
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}