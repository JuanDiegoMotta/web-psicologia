import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// --- MOCK DATA CON CONTENIDO RICH TEXT ---
// Simulamos lo que te devolvería un CMS (Content Management System)
const MOCK_POSTS = [
  {
    slug: "herramientas-ataque-ansiedad",
    title: "5 herramientas prácticas para calmar un ataque de ansiedad",
    category: "Ansiedad",
    date: "12 de Abril, 2024",
    readTime: "4 min de lectura",
    imageUrl: "/images/backgrounds/hero-terapia-individual-3.jpg",
    // El contenido de los blogs suele venir en formato HTML desde el editor
    content: `
      <p>La ansiedad es una respuesta natural del cuerpo, pero cuando se desborda y se convierte en un ataque, puede sentirse aterradora. Las palpitaciones, la falta de aire y la sensación de pérdida de control son muy reales.</p>
      <p>Sin embargo, luchar contra la ansiedad suele darle más fuerza. La clave está en <strong>aprender a transitarla</strong> y regular nuestro sistema nervioso. Aquí te comparto 5 herramientas prácticas:</p>
      
      <h3 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-top: 2rem; margin-bottom: 1rem;">1. La respiración 4-7-8</h3>
      <p>Cuando estamos ansiosos, nuestra respiración se vuelve superficial y rápida, lo que envía una señal de "peligro" al cerebro. La técnica 4-7-8 revierte esto: inhala por la nariz durante 4 segundos, sostén el aire 7 segundos y exhala lentamente por la boca durante 8 segundos. Repite 4 veces.</p>
      
      <h3 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-top: 2rem; margin-bottom: 1rem;">2. La técnica 5-4-3-2-1 (Grounding)</h3>
      <p>Esta técnica te ayuda a salir de tu mente y anclarte al momento presente usando tus sentidos. Busca a tu alrededor:</p>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem;">
        <li>5 cosas que puedas ver.</li>
        <li>4 cosas que puedas tocar (y tócalas).</li>
        <li>3 cosas que puedas escuchar.</li>
        <li>2 cosas que puedas oler.</li>
        <li>1 cosa que puedas saborear.</li>
      </ul>

      <blockquote style="border-left: 4px solid #f472b6; padding-left: 1rem; font-style: italic; color: #4b5563; background-color: #fdf2f8; padding: 1rem; border-radius: 0 0.5rem 0.5rem 0; margin: 2rem 0;">
        "La ansiedad nos proyecta hacia un futuro catastrófico; el grounding nos devuelve a un presente seguro."
      </blockquote>

      <h3 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-top: 2rem; margin-bottom: 1rem;">3. El cambio de temperatura (Hielo)</h3>
      <p>El "Reflejo de inmersión en mamíferos" se activa cuando exponemos nuestro rostro a agua muy fría. Si sientes que un ataque es inminente, salpica tu cara con agua helada o sostén un cubo de hielo en tus manos. Este choque térmico obliga al sistema nervioso parasimpático a activarse, reduciendo la frecuencia cardíaca de golpe.</p>

      <p style="margin-top: 2rem;"><strong>Recuerda:</strong> Un ataque de ansiedad tiene un pico máximo y luego, inevitablemente, baja. No durará para siempre. Sin embargo, si estos episodios son frecuentes, buscar acompañamiento terapéutico es el acto de amor propio más grande que puedes hacer por ti.</p>
    `
  }
];

// 1. Agregamos "async" a la función y decimos que params es una Promesa
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 2. Esperamos (await) a que Next.js lea la URL
  const { slug } = await params;

  // 3. Ahora sí buscamos el artículo con el slug correcto
  const post = MOCK_POSTS.find((p) => p.slug === slug);

  // Si el artículo no existe (ej. alguien escribe mal la URL), mostramos la página de Error 404
  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-white">
      
      {/* --- BOTÓN VOLVER --- */}
      <div className="max-w-3xl mx-auto w-full px-6 pt-32 pb-8">
        <Link href="/blog" className="text-pink-500 font-semibold hover:text-pink-600 flex items-center gap-2 transition-colors">
          <span>←</span> Volver al blog
        </Link>
      </div>

      {/* --- CABECERA DEL ARTÍCULO --- */}
      <header className="max-w-3xl mx-auto w-full px-6 text-center mb-10">
        <span className="inline-block bg-pink-50 text-pink-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 font-serif leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
          <span>📅 {post.date}</span>
          <span>•</span>
          <span>⏱️ {post.readTime}</span>
        </div>
      </header>

      {/* --- IMAGEN HERO DEL ARTÍCULO --- */}
      <div className="max-w-5xl mx-auto w-full px-6 mb-16">
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg bg-gray-100">
          <Image 
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* --- CONTENIDO DEL ARTÍCULO (RICH TEXT) --- */}
      {/* Usamos dangerouslySetInnerHTML porque el contenido viene como etiquetas HTML desde el Mock/CMS */}
      <article className="max-w-2xl mx-auto w-full px-6 mb-20 text-gray-600 text-lg leading-relaxed space-y-6">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      {/* --- CAJA DE AUTOR Y CTA (CALL TO ACTION) --- */}
      <section className="max-w-3xl mx-auto w-full px-6 mb-24">
        <div className="bg-[#FFF5F3]/50 p-8 md:p-10 rounded-3xl border border-pink-100 flex flex-col md:flex-row items-center gap-8">
          
          <div className="w-24 h-24 relative rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
            {/* Foto de Daniela */}
            <Image 
              src="/images/daniela/sobre-mi-1.jpg" 
              alt="Psicóloga Dani Vargas" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Escrito por Dani Vargas</h3>
            <p className="text-gray-600 text-sm mb-4">
              Psicóloga Clínica especializada en Terapias Basadas en Evidencia. Mi misión es brindarte herramientas prácticas para que recuperes tu calma y bienestar.
            </p>
            <Link 
              href="/servicios/terapia-individual" 
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium text-sm py-2.5 px-6 rounded-full transition-colors shadow-sm"
            >
              Agendar una sesión conmigo
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}