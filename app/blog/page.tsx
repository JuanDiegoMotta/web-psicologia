import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/contentful';
import NewsletterForm from '@/components/NewsletterForm';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="flex flex-col w-full min-h-screen bg-gray-50">

      {/* --- HERO DEL BLOG --- */}
      <section className="relative w-full overflow-hidden pt-32 pb-20 px-6 border-b border-gray-100 text-center">
        <Image
          src="/images/backgrounds/blog.jpg"
          alt="Fondo acogedor para un espacio de lectura sobre salud mental"
          fill
          className="absolute inset-0 object-cover z-0"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gray-900/60 z-10" />
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
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Imagen del Post */}
              <Link href={`/blog/${post.slug}`} className="relative w-full h-64 overflow-hidden block bg-gray-200">
                <Image
                  src={post.heroImage.url}
                  alt={post.heroImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-pink-600 uppercase tracking-wider">
                  {post.category}
                </div>
              </Link>

              {/* Contenido del Post */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-400 font-medium mb-4">
                  <span>📅 {new Date(post.publishedDate).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
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

      <NewsletterForm />

    </main>
  );
}
