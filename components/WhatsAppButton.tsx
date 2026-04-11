import React from 'react';
import Image from 'next/image';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/573016245662?text=%C2%A1Hola%21%20estoy%20interesad@%20en%20las%20consultas%20psicol%C3%B3gicas."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#1ebe57] hover:scale-110 transition-all duration-300 group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Tu SVG personalizado desde la carpeta public */}
      <Image 
        src="/icons/socials/whatsapp.svg" 
        alt="Icono de WhatsApp" 
        width={32} 
        height={32} 
        className="w-8 h-8"
      />
    </a>
  );
}