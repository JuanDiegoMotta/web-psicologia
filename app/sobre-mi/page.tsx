import Image from 'next/image';
import Link from 'next/link';

export default function SobreMiPage() {
  return (
    <main className="flex flex-col w-full">
      
        {/* --- HERO CON COLLAGE (TAILWIND GRID) --- */}
      <section className="w-full pt-32 pb-20 px-6 bg-gradient-to-b from-pink-200/40 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Columna Izquierda: Texto */}
          <div className="w-full lg:w-5/12 text-center lg:text-left z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 tracking-tight font-serif">
              Detrás de la profesional, <br />
              <span className="text-pink-500">hay una persona.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              Creo firmemente que la terapia no debe ser un proceso frío y distante. Aquí te cuento un poco más sobre mi camino y mi forma de acompañarte.
            </p>
          </div>

          {/* Columna Derecha: Mosaico de 5 Fotos (CSS Grid) */}
          <div className="w-full lg:w-7/12 h-[500px] md:h-[600px]">
            <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 md:gap-4 h-full w-full">
              
              {/* Foto 1 (Principal y más grande) */}
              <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300">
                <Image 
                  src="/images/daniela/daniela-rio.png" 
                  fill 
                  className="object-cover object-[60%_center]" 
                  alt="Daniela Vargas en el bosque" 
                  priority 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                />
              </div>

                {/* Foto 2 (Arriba, centro) */}
              <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300">
                <Image 
                  src="/images/daniela/daniela-consulta.jpg" 
                  fill 
                  className="object-cover object-right" 
                  alt="Daniela Vargas en consulta" 
                  priority // Añadido para el LCP
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Foto 3 (Arriba) */}
              <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300">
                <Image 
                  src="/images/daniela/daniela-rio.png" 
                  fill 
                  className="object-cover" 
                  alt="Daniela Vargas en el río" 
                  priority // Añadido para el LCP
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Foto 4 (Abajo) */}
              <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300">
                <Image 
                  src="/images/daniela/daniela-escritorio.jpg" 
                  fill 
                  className="object-cover object-[70%_center]" 
                  alt="Daniela Vargas en su escritorio" 
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Foto 5 (Abajo) */}
              <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300">
                <Image 
                  src="/images/daniela/daniela-sofa-tablet.jpg" 
                  fill 
                  className="object-cover" 
                  alt="Daniela Vargas con tablet" 
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

            </div>
          </div>
          
        </div>
      </section>

        {/* --- SECCIÓN 1: LA VOCACIÓN Y LA PROFESIONAL (Rediseño con Imagen de Fondo) --- */}
      <section className="relative w-full py-24 px-6 md:px-12 lg:px-20 overflow-hidden min-h-screen flex items-center">
        
        {/* Capa 1: Imagen de Fondo Optimizada */}
        <Image 
          src="/images/daniela/daniela-consulta.jpg" 
          alt="Psicóloga Daniela Vargas" 
          fill
          priority 
          sizes="100vw" // Al ser fondo, siempre ocupa el 100%
          className="object-cover object-center z-0 brightness-[0.8]" 
        />

        {/* Capa 2: Contenedor de Contenido (Alineado a la izquierda) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full text-left">
          
          {/* Capa 3: Panel de Texto Legible (Ancho limitado en la izquierda) */}
          <div className="md:w-1/2 lg:w-2/5 p-6 md:p-8 bg-white/60 rounded-3xl backdrop-blur-sm shadow-xl space-y-6 text-gray-600 md:text-lg leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight mb-8 font-serif">
              De la empatía a la vocación
            </h2>
            <p>
              Creo firmemente que la salud mental es un pilar de la vida, aunque muchas veces el mundo la subestime. Desde niña tuve una conexión especial con el sufrimiento humano, una sensibilidad que me llevó a elegir la psicología no solo como carrera, sino como vocación.
            </p>
            <p>
              Soy <strong className="text-gray-800 font-semibold">Psicóloga Clínica</strong>, formada específicamente en trastornos emocionales y afectivos como la <span className="text-pink-500 font-medium">ansiedad, depresión, duelo y trauma</span>. 
            </p>
            <p>
              A lo largo de mi trayectoria y en constante actualización, he acompañado a cientos de personas en Latinoamérica, España y Estados Unidos, siempre con una meta clara: ofrecer un estilo de terapia <strong className="text-gray-800 font-semibold">basado en evidencia, humano y cálido</strong>.
            </p>
          </div>

        </div>
      </section>

      {/* --- SECCIÓN 2: EL EQUIPO (Transición) --- */}
      <section className="w-full py-16 px-6 bg-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-200 font-medium leading-relaxed italic">
            "Hoy no estoy sola. Lidero un equipo de psicólogos que comparte mi misma esencia: cercanía, empatía y una terapia 100% centrada en ti, para que encuentres un espacio seguro donde sanar y crecer."
          </p>
        </div>
      </section>

      {/* --- SECCIÓN 3: MÁS ALLÁ DEL CONSULTORIO --- */}
      <section className="w-full py-24 px-6 bg-pink-50/40">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight font-serif">
              Más allá del consultorio
            </h2>
            <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
              Porque antes de ser tu psicóloga, soy un ser humano en constante aprendizaje.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1: Sencillez */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100/50 hover:-translate-y-1 transition-transform">
              <div className="text-3xl mb-4">🌸</div>
              <p className="text-gray-600 leading-relaxed">
                Soy una persona sencilla. Disfruto profundamente de la lectura, una buena tarde de cine, escuchar música y rodearme de la naturaleza.
              </p>
            </div>

            {/* Tarjeta 2: Viajes y Autocuidado */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100/50 hover:-translate-y-1 transition-transform">
              <div className="text-3xl mb-4">✈️</div>
              <p className="text-gray-600 leading-relaxed">
                Me apasiona viajar y conocer nuevas culturas, pero valoro igual o más las charlas auténticas y mis propios momentos de autocuidado.
              </p>
            </div>

            {/* Tarjeta 3: Dog Mom */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100/50 hover:-translate-y-1 transition-transform">
              <div className="text-3xl mb-4">🐾</div>
              <p className="text-gray-600 leading-relaxed">
                Soy orgullosa <span className="font-semibold text-pink-500">Dog Mom</span> de Molly y Tariq. Ellos me recuerdan a diario la importancia del amor incondicional y de estar presente.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECCIÓN 4: EL COMPROMISO Y CTA --- */}
      <section className="w-full py-24 px-6 text-center border-t border-gray-100 bg-gradient-to-b from-white to-pink-200/40">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-2xl mb-6">
            🤝
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-snug">
            Mi compromiso contigo es claro:
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-10 italic">
            "Que encuentres en la terapia un espacio donde sentirte escuchada/o, comprendida/o y acompañada/o de forma real."
          </p>
          <Link 
            href="/servicios" 
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Da el primer paso hoy
          </Link>
        </div>
      </section>

    </main>
  );
}