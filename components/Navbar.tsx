import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return(
    <nav className="bg-[#FFF5F3] px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      {/* Logo */}
      <Link href="/">
        <Image 
          src="/icons/logos/logo-mariposa-fondo.svg" 
          alt="Logo Psicóloga Daniela Vargas" 
          width={300} 
          height={300} 
          className="w-auto h-16 object-contain cursor-pointer"
          priority
        />
      </Link>

      {/* Enlaces de navegación con nuestras nuevas rutas */}
      <ul className="flex gap-6 text-sm font-medium text-gray-800 list-none">
        <li><Link href="/" className="hover:text-pink-500 transition-colors">Inicio</Link></li>
        <li><Link href="/sobre-mi" className="hover:text-pink-500 transition-colors">Sobre mí</Link></li>
        <li><Link href="/servicios" className="hover:text-pink-500 transition-colors">Servicios</Link></li>
        <li><Link href="/guias" className="hover:text-pink-500 transition-colors">Guías digitales</Link></li>
        <li><Link href="/blog" className="hover:text-pink-500 transition-colors">Blog</Link></li>
        <li><Link href="/contacto" className="hover:text-pink-500 transition-colors">Contacto</Link></li>
      </ul>
    </nav>)
}