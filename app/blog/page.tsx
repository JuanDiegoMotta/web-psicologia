'use client';
import Image from 'next/image';
import Link from 'next/link';

// --- DATOS FALSOS (MOCKS) ---
// Cuando conectemos una base de datos o CMS, estos datos vendrán de ahí de forma dinámica.
const MOCK_POSTS = [
  {
    id: 1,
    title: "5 herramientas prácticas para calmar un ataque de ansiedad",
    excerpt: "La ansiedad no se controla luchando contra ella, sino aprendiendo a transitarla. Descubre 5 pasos basados en ciencia para regular tu sistema nervioso.",
    category: "Ansiedad",
    date: "12 de Abril, 2024",
    readTime: "4 min de lectura",
    slug: "herramientas-ataque-ansiedad",
    imageUrl: "/images/backgrounds/hero-terapia-individual.jpg"
  },
  {
    id: 2,
    title: "¿Cómo saber si es momento de ir a terapia de pareja?",
    excerpt: "No hay que esperar a estar al borde del divorcio para pedir ayuda. Estas son las señales rojas de que la comunicación en pareja está fallando.",
    category: "Pareja",
    date: "28 de Marzo, 2024",
    readTime: "6 min de lectura",
    slug: "cuando-ir-terapia-pareja",
    imageUrl: "/images/backgrounds/couples.jpg"
  },
  {
    id: 3,
    title: "El Síndrome del Impostor en el trabajo: Cómo dejar de dudar de ti",
    excerpt: "¿Sientes que tus logros son solo suerte y que pronto descubrirán que eres un fraude? No estás sola. Así es como la psicología aborda este síndrome.",
    category: "Desarrollo Personal",
    date: "15 de Febrero, 2024",
    readTime: "5 min de lectura",
    slug: "sindrome-impostor-trabajo",
    imageUrl: "/images/backgrounds/enterprise.jpg"
  },
  {
    id: 4,
    title: "Crianza Respetuosa: Límites sanos sin perder la conexión",
    excerpt: "Poner límites no significa ser autoritario, y ser empático no significa permisividad. Encuentra el equilibrio para criar niños emocionalmente fuertes.",
    category: "Familia",
    date: "02 de Febrero, 2024",
    readTime: "7 min de lectura",
    slug: "crianza-respetuosa-limites",
    imageUrl: "/images/backgrounds/infant.jpg"
  }
];

export default function BlogPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-gray-50">
      
  {/* --- HERO DEL BLOG (CON IMAGEN DE FONDO) --- */}
  {/* Hacemos la section relative y overflow-hidden para la imagen absoluta */}
  <section className="relative w-full overflow-hidden pt-32 pb-20 px-6 border-b border-gray-100 text-center">
    
    {/* Imagen de fondo optimizada: absoluta, fill para llenar, object-cover para escalar sin distorsionar */}
    <Image
      src="/images/backgrounds/blog.jpg" // Cambia esto a la ruta real de tu imagen en la carpeta public
      alt="Fondo acogedor para un espacio de lectura sobre salud mental" // Texto alternativo descriptivo
      fill // Hace que la imagen llene el contenedor padre
      className="absolute inset-0 object-cover z-0" // Posicionamiento y escalado CSS
      priority // Sugiere cargar esta imagen con prioridad alta
      sizes="100vw" // Indica que la imagen ocupará todo el ancho de la ventana
    />
    <div className="absolute inset-0 bg-gray-900/60 z-10"/>
    {/* Contenido principal: Relativo y con un z-index más alto para estar sobre la imagen */}
    <div className="max-w-3xl mx-auto relative z-10">
      <span className="text-pink-500 font-bold uppercase tracking-wider text-sm mb-4 block">Espacio de Lectura</span>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-serif">
        Reflexiones para tu salud mental
      </h1>
      <p className="text-lg text-white/90 leading-relaxed">
        Artículos, herramientas clínicas y perspectivas psicológicas para ayudarte a entender tu mente, mejorar tus relaciones y vivir con más calma.
      </p>
    </div>
  </section>
      {/* --- GRID DE ARTÍCULOS --- */}
      <section className="w-full py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          
          {MOCK_POSTS.map((post) => (
            <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
              
              {/* Imagen del Post */}
              <Link href={`/blog/${post.slug}`} className="relative w-full h-64 overflow-hidden block bg-gray-200">
                <Image 
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Etiqueta de Categoría Flotante */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-pink-600 uppercase tracking-wider">
                  {post.category}
                </div>
              </Link>

              {/* Contenido del Post */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-400 font-medium mb-4">
                  <span>📅 {post.date}</span>
                  <span>•</span>
                  <span>⏱️ {post.readTime}</span>
                </div>
                
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-pink-500 transition-colors leading-snug">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-pink-500 font-bold hover:text-pink-600 transition-colors"
                >
                  Leer artículo completo <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

            </article>
          ))}

        </div>
      </section>

      {/* --- CTA PARA SUSCRIBIRSE AL NEWSLETTER --- */}
      <section className="w-full py-20 px-6 bg-pink-50 border-t border-pink-100">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-14 rounded-3xl shadow-md text-center">
          <div className="text-4xl mb-4">💌</div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-serif">
            ¿Te gustaría recibir estos artículos en tu correo?
          </h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Únete a nuestra comunidad. Cero spam, solo reflexiones útiles y herramientas prácticas para tu bienestar, una vez al mes.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Tu mejor correo electrónico" 
              required
              className="w-full sm:w-2/3 px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button 
              type="button" 
              className="w-full sm:w-1/3 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}