import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, Block, Inline } from '@contentful/rich-text-types';
import { getPostBySlug, getAllSlugs } from '@/lib/contentful';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold text-gray-800">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: unknown, children: React.ReactNode) => (
      <p className="mb-6 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_: unknown, children: React.ReactNode) => (
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4 font-serif">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_: unknown, children: React.ReactNode) => (
      <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_: unknown, children: React.ReactNode) => (
      <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_: unknown, children: React.ReactNode) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_: unknown, children: React.ReactNode) => (
      <li className="leading-relaxed">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_: unknown, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-pink-400 bg-pink-50 pl-4 pr-4 py-3 my-6 italic text-gray-600 rounded-r-lg">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-gray-200" />,
    [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <a
        href={(node as Inline).data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 underline hover:text-pink-600 transition-colors"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

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
          <span>📅 {new Date(post.publishDate).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>•</span>
          <span>⏱️ {post.readTime}</span>
        </div>
      </header>

      {/* --- IMAGEN HERO --- */}
      <div className="max-w-5xl mx-auto w-full px-6 mb-16">
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg bg-gray-100">
          <Image
            src={post.heroImage.url}
            alt={post.heroImage.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* --- CONTENIDO RICH TEXT --- */}
      <article className="max-w-2xl mx-auto w-full px-6 mb-20 text-gray-600 text-lg">
        {documentToReactComponents(post.content, richTextOptions)}
      </article>

      {/* --- CAJA DE AUTOR --- */}
      <section className="max-w-3xl mx-auto w-full px-6 mb-24">
        <div className="bg-[#FFF5F3]/50 p-8 md:p-10 rounded-3xl border border-pink-100 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 relative rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
            <Image
              src="/images/daniela/daniela-consulta.jpg"
              alt="Psicóloga Daniela"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Escrito por Daniela</h3>
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
