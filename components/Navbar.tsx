"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-[#FFF5F3] px-6 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm relative">
      
      {/* Logo */}
      <Link href="/" onClick={closeMenu}>
        <Image 
          src="/icons/logos/logo-mariposa-fondo.svg" 
          alt="Logo Psicóloga Daniela Vargas" 
          width={300} 
          height={300} 
          className="w-auto h-12 md:h-16 object-contain cursor-pointer"
          priority
        />
      </Link>

      {/* Botón Hamburguesa - Añadido 'cursor-pointer' y 'group' */}
      <button 
        className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 z-50 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menú"
      >
        {/* Usamos group-hover para cambiar el color de las rayas al pasar el ratón por el botón */}
        <span className={`block w-6 h-0.5 bg-gray-800 group-hover:bg-pink-500 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-800 group-hover:bg-pink-500 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-800 group-hover:bg-pink-500 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Enlaces de Navegación (Escritorio) */}
      <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-800 list-none">
        <li><Link href="/" className="hover:text-pink-500 transition-colors cursor-pointer">Inicio</Link></li>
        <li><Link href="/sobre-mi" className="hover:text-pink-500 transition-colors cursor-pointer">Sobre mí</Link></li>
        <li><Link href="/servicios" className="hover:text-pink-500 transition-colors cursor-pointer">Servicios</Link></li>
        <li><Link href="/guias" className="hover:text-pink-500 transition-colors cursor-pointer">Guías digitales</Link></li>
        <li><Link href="/blog" className="hover:text-pink-500 transition-colors cursor-pointer">Blog</Link></li>
        <li><Link href="/contacto" className="hover:text-pink-500 transition-colors cursor-pointer">Contacto</Link></li>
      </ul>

      {/* Menú Desplegable (Móvil) - Mejorado con áreas táctiles grandes */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FFF5F3] shadow-md border-t border-pink-100 flex flex-col md:hidden list-none">
          <Link 
            href="/" 
            onClick={closeMenu} 
            className="w-full text-center py-4 font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 transition-colors border-b border-pink-100/50 cursor-pointer"
          >
            Inicio
          </Link>
          <Link 
            href="/sobre-mi" 
            onClick={closeMenu} 
            className="w-full text-center py-4 font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 transition-colors border-b border-pink-100/50 cursor-pointer"
          >
            Sobre mí
          </Link>
          <Link 
            href="/servicios" 
            onClick={closeMenu} 
            className="w-full text-center py-4 font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 transition-colors border-b border-pink-100/50 cursor-pointer"
          >
            Servicios
          </Link>
          <Link 
            href="/guias" 
            onClick={closeMenu} 
            className="w-full text-center py-4 font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 transition-colors border-b border-pink-100/50 cursor-pointer"
          >
            Guías digitales
          </Link>
          <Link 
            href="/blog" 
            onClick={closeMenu} 
            className="w-full text-center py-4 font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 transition-colors border-b border-pink-100/50 cursor-pointer"
          >
            Blog
          </Link>
          <Link 
            href="/contacto" 
            onClick={closeMenu} 
            className="w-full text-center py-4 font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 transition-colors cursor-pointer"
          >
            Contacto
          </Link>
        </div>
      )}
    </nav>
  );
}