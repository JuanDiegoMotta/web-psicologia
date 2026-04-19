'use client';

import Image from 'next/image';
import BoldPaymentButton from '@/components/BoldPaymentButton';

export default function GuiasDigitalesPage() {
  console.log("Mi llave pública es:", process.env.NEXT_PUBLIC_BOLD_API_KEY);
  return (
    <main className="flex flex-col w-full">
      
      {/* --- HERO DE PRODUCTOS DIGITALES --- */}
      <section className="w-full pt-32 pb-20 px-6 bg-gradient-to-b from-pink-200/40 to-white  text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-pink-500 font-bold uppercase tracking-wider text-sm mb-4 block">Recursos Clínicos a tu ritmo</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 tracking-tight font-serif leading-tight">
            Transforma tu bienestar <br /> y tus relaciones
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            En cada etapa de tu vida, necesitas herramientas claras y prácticas que te acompañen a sanar, crecer y conectar mejor. He creado estas guías para darte pasos concretos que puedes aplicar desde hoy.
          </p>
        </div>
      </section>

      {/* --- GRID DE GUÍAS (E-COMMERCE STYLE) --- */}
      <section className="w-full py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          
          {/* GUÍA 1: Hablar para conectar */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            {/* Imagen del E-book (Asegúrate de subir la imagen a la carpeta public) */}
            <div className="w-full h-64 bg-pink-50 relative flex items-center justify-center p-6 border-b border-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-pink-100 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              {/* Aquí va el mockp de tu libro */}
              <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                <Image 
                  src="/images/guides/hablar-para-conectar.png" // (Asegúrate de que esta ruta coincida con la tuya)
                  alt="Libro digital Hablar para Conectar" 
                  fill 
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📖</span>
                <h3 className="text-2xl font-bold text-gray-800">Hablar para conectar</h3>
              </div>
              <p className="text-pink-500 font-medium mb-6 text-sm">Guía práctica para mejorar la comunicación</p>
              
              <div className="flex-grow">
                <p className="font-bold text-gray-800 mb-3 text-sm">🔑 ¿Qué lograrás?</p>
                <ul className="space-y-3 text-gray-600 text-sm mb-6">
                  <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">•</span> Aprender a escuchar y validar emociones sin generar discusiones.</li>
                  <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">•</span> Expresar lo que sientes con claridad, sin culpar ni herir.</li>
                  <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">•</span> Descubrir la fuerza del lenguaje no verbal en tu relación.</li>
                </ul>
                <p className="text-xs text-gray-500 italic bg-gray-50 p-3 rounded-xl border border-gray-100">
                  👉 Ideal para parejas que sienten que sí se aman, pero no siempre se entienden.
                </p>
              </div>

              <a 
                href="https://pay.hotmart.com/L98064362T?_gl=1*1ykdm0i*_gcl_au*MTgyODM2NTcwNy4xNzU3NzM0NzAyLjE1MDQzNDkzNjMuMTc2MDA1MDQyNS4xNzYwMDUwNTc4*FPAU*MTgyODM2NTcwNy4xNzU3NzM0NzAy*_ga*MTc4ODU5NzUzMS4xNzU3NzM0NzAy*_ga_GQH2V1F11Q*czE3NjAwNTA0MDUkbzM5JGcxJHQxNzYwMDUwNTc2JGoxMSRsMCRoNTk1MDUxMjU3&bid=1760050583974" 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md"
              >
                Adquirir mi guía
              </a>
            </div>
          </div>

          {/* GUÍA 2: Conexión Real */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-full h-64 bg-[#FFF5F3] relative flex items-center justify-center p-6 border-b border-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-pink-200 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                <Image 
                  src="/images/guides/conexion-real.png" 
                  alt="Libro digital Conexión Real" 
                  fill 
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💬</span>
                <h3 className="text-2xl font-bold text-gray-800">Conexión real</h3>
              </div>
              <p className="text-pink-500 font-medium mb-6 text-sm">50 preguntas de terapia para descubrirse</p>
              
              <div className="flex-grow">
                <p className="font-bold text-gray-800 mb-3 text-sm">💡 Lo que encontrarás:</p>
                <ul className="space-y-3 text-gray-600 text-sm mb-6">
                  <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">•</span> 5 categorías de preguntas (historia, metas, intimidad).</li>
                  <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">•</span> Un método guiado para conversar cada semana sin juicios ni evasiones.</li>
                  <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">•</span> Herramienta para convertir la curiosidad en intimidad real.</li>
                </ul>
                <p className="text-xs text-gray-500 italic bg-gray-50 p-3 rounded-xl border border-gray-100">
                  👉 Para quienes desean sentirse más cerca y redescubrirse como pareja.
                </p>
              </div>

              <a 
                href="https://pay.hotmart.com/H98068688R?_gl=1*156xolp*_gcl_au*MTgyODM2NTcwNy4xNzU3NzM0NzAyLjE1MDQzNDkzNjMuMTc2MDA1MDQyNS4xNzYwMDUwNTM4*FPAU*MTgyODM2NTcwNy4xNzU3NzM0NzAy*_ga*MTc4ODU5NzUzMS4xNzU3NzM0NzAy*_ga_GQH2V1F11Q*czE3NjAwNTA0MDUkbzM5JGcxJHQxNzYwMDUwNTM0JGo1MyRsMCRoODY4MzQxOTU1&bid=1760050539418" 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md"
              >
                Adquirir mi guía
              </a>
            </div>
          </div>

          {/* GUÍA 3: Amor en equilibrio */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-full h-64 bg-pink-50 relative flex items-center justify-center p-6 border-b border-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-pink-100 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                <Image 
                  src="/images/guides/amor-en-equilibrio.png" 
                  alt="Libro digital Amor en Equilibrio" 
                  fill 
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">❤️</span>
                <h3 className="text-2xl font-bold text-gray-800">Amor en equilibrio</h3>
              </div>
              <p className="text-pink-500 font-medium mb-6 text-sm">Cómo cuidar de ti misma/o mientras amas</p>
              
              <div className="flex-grow">
                <p className="font-bold text-gray-800 mb-3 text-sm">🌿 Con esta guía aprenderás a:</p>
                <ul className="space-y-3 text-gray-600 text-sm mb-6">
                  <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">•</span> Amar sin perderte en la relación.</li>
                  <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">•</span> Reconocer tu valor y fortalecer tu autoestima.</li>
                  <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">•</span> Establecer límites claros y sanos, sin culpa ni miedo.</li>
                  <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">•</span> Crear rituales de autocuidado que nutran tu vida.</li>
                </ul>
                <p className="text-xs text-gray-500 italic bg-gray-50 p-3 rounded-xl border border-gray-100">
                  👉 Pensada para quienes han dado todo en una relación y ahora desean amar desde la plenitud.
                </p>
              </div>

              <BoldPaymentButton
                amount = "150000"
                description = "Amor en equilibrio"
              />
            </div>
          </div>

        </div>
      </section>

      {/* --- CÓMO FUNCIONAN ESTAS GUÍAS (Propuesta de Valor) --- */}
      <section className="w-full py-16 px-6 bg-[#FFF5F3]/50">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-pink-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl">🚀</div>
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
      <section className="w-full py-24 px-6 bg-gradient-to-b from-white to-pink-200/40 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="text-4xl mb-6">🎁</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Empieza tu cambio hoy
          </h2>
          <p className="text-gray-600/80 mb-10 text-lg md:text-xl">
            Las relaciones más sanas no se construyen con suerte, sino con herramientas. Elige la guía que más resuene contigo y comienza a transformar tu vida emocional.
          </p>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-white text-pink-500 font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl hover:bg-gray-50 transform hover:-translate-y-1"
          >
            Ver catálogo de guías 👆
          </a>
        </div>
      </section>

    </main>
  );
}