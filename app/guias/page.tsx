import Image from 'next/image';
import Link from 'next/link';
import { getAllGuides } from '@/lib/contentful';

export default async function GuiasDigitalesPage() {
  const guides = await getAllGuides();

  return (
    <main className="flex flex-col w-full">

      {/* --- HERO DE PRODUCTOS DIGITALES --- */}
      <section className="w-full pt-32 pb-20 px-6 bg-gradient-to-b from-salvia/40 to-white  text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-eucalipto-dark font-bold uppercase tracking-wider text-sm mb-4 block">Recursos Clínicos a tu ritmo</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 tracking-tight font-serif leading-tight">
            Transforma tu bienestar <br /> y tus relaciones
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            En cada etapa de tu vida, necesitas herramientas claras y prácticas que te acompañen a sanar, crecer y conectar mejor. He creado estas guías para darte pasos concretos que puedes aplicar desde hoy.
          </p>
        </div>
      </section>

      {/* --- GRID DE GUÍAS (E-COMMERCE STYLE) — dinámico desde Contentful --- */}
      <section id="catalogo" className="w-full py-16 px-6 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">

          {guides.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              Pronto encontrarás aquí nuevas guías. ¡Vuelve en unos días!
            </p>
          )}

          {guides.map((guide, i) => (
            <div
              key={guide.slug}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Imagen del E-book */}
              <div className={`w-full h-64 ${i % 2 === 1 ? 'bg-blancoluz' : 'bg-arena'} relative flex items-center justify-center p-6 border-b border-gray-50 overflow-hidden`}>
                <div className="absolute inset-0 bg-salvia opacity-0 group-hover:opacity-20 transition-opacity"></div>
                {guide.coverImage.url && (
                  <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={guide.coverImage.url}
                      alt={guide.coverImage.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{guide.emoji}</span>
                  <h3 className="text-2xl font-bold text-gray-800">{guide.title}</h3>
                </div>
                <p className="text-eucalipto-dark font-medium mb-6 text-sm">{guide.description}</p>

                <div className="flex-grow">
                  <p className="font-bold text-gray-800 mb-3 text-sm">🔑 ¿Qué lograrás?</p>
                  <ul className="space-y-3 text-gray-600 text-sm mb-6">
                    {guide.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-eucalipto-dark mt-0.5">•</span> {benefit}
                      </li>
                    ))}
                  </ul>
                  {guide.idealFor && (
                    <p className="text-xs text-gray-500 italic bg-gray-50 p-3 rounded-xl border border-gray-100">
                      👉 {guide.idealFor}
                    </p>
                  )}
                </div>

                <Link
                  href={`/checkout/${guide.slug}`}
                  className="mt-6 w-full block text-center bg-eucalipto-dark hover:bg-eucalipto-darker text-white font-bold py-4 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5"
                >
                  Comprar — ${guide.price.toLocaleString('es-CO')} COP
                </Link>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* --- CÓMO FUNCIONAN ESTAS GUÍAS (Propuesta de Valor) --- */}
      <section className="w-full py-16 px-6 bg-blancoluz/50">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-salvia">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-salvia rounded-full flex items-center justify-center text-2xl">🚀</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              ¿Cómo funcionan estas guías?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col gap-2">
              <span className="text-2xl">📱</span>
              <h4 className="font-bold text-gray-800">100% Digitales</h4>
              <p className="text-gray-600 text-sm">Descárgalas inmediatamente tras la compra y accede desde tu celular, tablet o computador para siempre.</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl">✍️</span>
              <h4 className="font-bold text-gray-800">Prácticas</h4>
              <p className="text-gray-600 text-sm">No es solo teoría. Incluyen ejercicios reflexivos y accionables diseñados desde la psicología clínica.</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl">🧠</span>
              <h4 className="font-bold text-gray-800">Confiables</h4>
              <p className="text-gray-600 text-sm">Creadas por Daniela Vargas, Psicóloga Clínica con más de 7.800 horas de experiencia acompañando procesos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="w-full py-24 px-6 bg-gradient-to-b from-white to-salvia/40 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="text-4xl mb-6">🎁</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Empieza tu cambio hoy
          </h2>
          <p className="text-gray-600/80 mb-10 text-lg md:text-xl">
            Las relaciones más sanas no se construyen con suerte, sino con herramientas. Elige la guía que más resuene contigo y comienza a transformar tu vida emocional.
          </p>
          <a
            href="#catalogo"
            className="bg-white text-eucalipto-dark font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl hover:bg-gray-50 transform hover:-translate-y-1"
          >
            Ver catálogo de guías 👆
          </a>
        </div>
      </section>

    </main>
  );
}
