"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // Estado para el submenú en móvil

  const closeMenu = () => {
    setIsOpen(false);
    setIsServicesOpen(false); // Cerramos también el submenú al cambiar de página
  };

  return (
    <nav className="bg-blancoluz px-6 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm relative">
      
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

      {/* Botón Hamburguesa (Móvil) */}
      <button 
        className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 z-50 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menú"
      >
        <span className={`block w-6 h-0.5 bg-gray-800 group-hover:bg-eucalipto-dark transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-800 group-hover:bg-eucalipto-dark transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-800 group-hover:bg-eucalipto-dark transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* --- ENLACES DE NAVEGACIÓN (ESCRITORIO) --- */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800 list-none">
        <li><Link href="/" className="hover:text-eucalipto-dark transition-colors cursor-pointer">Inicio</Link></li>
        <li><Link href="/sobre-mi" className="hover:text-eucalipto-dark transition-colors cursor-pointer">Sobre mí</Link></li>
        
        {/* Dropdown: Servicios */}
        <li className="relative group py-4">
          <Link href="/servicios" className="hover:text-eucalipto-dark transition-colors cursor-pointer flex items-center gap-1">
            Servicios
            <svg className="w-3 h-3 text-gray-500 group-hover:text-eucalipto-dark transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </Link>
          
          {/* Submenú (Invisible hasta hacer hover) */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0 w-64 bg-white shadow-xl rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 flex flex-col">
            <Link href="/servicios/terapia-individual" className="px-5 py-3 hover:bg-arena text-gray-700 hover:text-eucalipto-darker transition-colors border-b border-gray-50">Terapia Individual</Link>
            <Link href="/servicios/terapia-de-pareja" className="px-5 py-3 hover:bg-arena text-gray-700 hover:text-eucalipto-darker transition-colors border-b border-gray-50">Terapia de Pareja</Link>
            <Link href="/servicios/terapia-infantojuvenil" className="px-5 py-3 hover:bg-arena text-gray-700 hover:text-eucalipto-darker transition-colors border-b border-gray-50">Terapia Infantojuvenil</Link>
            <Link href="/servicios/empresas" className="px-5 py-3 hover:bg-arena text-gray-700 hover:text-eucalipto-darker transition-colors">Empresas (B2B)</Link>
          </div>
        </li>

        <li><Link href="/guias" className="hover:text-eucalipto-dark transition-colors cursor-pointer">Guías digitales</Link></li>
        <li><Link href="/blog" className="hover:text-eucalipto-dark transition-colors cursor-pointer">Blog</Link></li>
        
        {/* Botón de Contacto Destacado */}
        <li>
          <Link 
            href="/contacto" 
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md font-bold cursor-pointer"
          >
            Contacto
          </Link>
        </li>
      </ul>

      {/* --- MENÚ DESPLEGABLE (MÓVIL) --- */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-blancoluz shadow-lg border-t border-salvia flex flex-col md:hidden list-none overflow-y-auto max-h-[85vh]">
          
          <Link href="/" onClick={closeMenu} className="w-full text-center py-4 font-medium text-gray-800 hover:text-eucalipto-darker hover:bg-arena transition-colors border-b border-salvia/50 cursor-pointer">
            Inicio
          </Link>
          
          <Link href="/sobre-mi" onClick={closeMenu} className="w-full text-center py-4 font-medium text-gray-800 hover:text-eucalipto-darker hover:bg-arena transition-colors border-b border-salvia/50 cursor-pointer">
            Sobre mí
          </Link>
          
          {/* Acordeón de Servicios en Móvil */}
          <div className="w-full flex flex-col border-b border-salvia/50">
            <div className="flex justify-between items-center px-8 py-4">
              <Link href="/servicios" onClick={closeMenu} className="font-medium text-gray-800 hover:text-eucalipto-darker transition-colors flex-grow text-center pl-6">
                Servicios
              </Link>
              {/* Botón para desplegar submenú */}
              <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="p-2 text-eucalipto-dark bg-salvia/50 rounded-full">
                <svg className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
            
            {/* Submenú Móvil */}
            {isServicesOpen && (
              <div className="flex flex-col bg-white/40 py-2">
                <Link href="/servicios/terapia-individual" onClick={closeMenu} className="py-3 text-center text-sm text-gray-600 hover:text-eucalipto-darker">Terapia Individual</Link>
                <Link href="/servicios/terapia-de-pareja" onClick={closeMenu} className="py-3 text-center text-sm text-gray-600 hover:text-eucalipto-darker">Terapia de Pareja</Link>
                <Link href="/servicios/terapia-infantojuvenil" onClick={closeMenu} className="py-3 text-center text-sm text-gray-600 hover:text-eucalipto-darker">Terapia Infantojuvenil</Link>
                <Link href="/servicios/empresas" onClick={closeMenu} className="py-3 text-center text-sm text-gray-600 hover:text-eucalipto-darker">Empresas (B2B)</Link>
              </div>
            )}
          </div>

          <Link href="/guias" onClick={closeMenu} className="w-full text-center py-4 font-medium text-gray-800 hover:text-eucalipto-darker hover:bg-arena transition-colors border-b border-salvia/50 cursor-pointer">
            Guías digitales
          </Link>
          
          <Link href="/blog" onClick={closeMenu} className="w-full text-center py-4 font-medium text-gray-800 hover:text-eucalipto-darker hover:bg-arena transition-colors cursor-pointer">
            Blog
          </Link>

          {/* Botón Destacado en Móvil */}
          <div className="p-6 pb-8">
            <Link 
              href="/contacto" 
              onClick={closeMenu} 
              className="block w-full text-center bg-eucalipto-dark hover:bg-eucalipto-darker text-white font-bold py-4 rounded-xl transition-all shadow-md"
            >
              Contacto
            </Link>
          </div>

        </div>
      )}
    </nav>
  );
}