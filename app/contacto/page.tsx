'use client';

import React from 'react';
import { useContactForm } from '@/hooks/useContactForm';

export default function ContactoPage() {
  // Importamos la lógica centralizada
  const { isSubmitting, handleFormAction } = useContactForm();

  return (
    <main className="flex flex-col w-full min-h-screen bg-blancoluz/30">
      
      {/* --- HERO DE CONTACTO --- */}
      <section className="w-full pt-32 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-eucalipto-dark font-bold uppercase tracking-wider text-sm mb-4 block">Hablemos</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 tracking-tight font-serif">
            Agenda tu cita
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Dar el primer paso requiere valentía. Déjame tus datos y me pondré en contacto contigo para resolver cualquier duda que tengas sobre iniciar tu proceso.
          </p>
        </div>
      </section>

      {/* --- SECCIÓN PRINCIPAL: SPLIT (Info + Formulario) --- */}
      <section className="w-full pb-24 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-salvia">
          
          {/* Columna Izquierda: Información de Contacto */}
          <div className="w-full lg:w-2/5 bg-arena p-10 md:p-14 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 font-serif">
                ¿Prefieres hablar de inmediato?
              </h2>
              <p className="text-gray-600 mb-10 leading-relaxed">
                Si tienes preguntas rápidas sobre disponibilidad, precios o cómo funciona la terapia online, escríbeme directamente por WhatsApp.
              </p>

              <div className="space-y-6">
                <a 
                  href="https://wa.me/573016245662?text=%C2%A1Hola%21%20estoy%20interesad@%20en%20las%20consultas%20psicol%C3%B3gicas." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white p-4 rounded-2xl hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    💬
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">WhatsApp</p>
                    <p className="text-gray-800 font-medium">+57 301 624 5662</p>
                  </div>
                </a>

                <a 
                  href="mailto:danielavargaspsicologa@gmail.com" 
                  className="flex items-center gap-4 bg-white p-4 rounded-2xl hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 bg-salvia text-eucalipto-dark rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    ✉️
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Correo Electrónico</p>
                    <p className="text-gray-800 font-medium text-sm md:text-base">danielavargaspsicologa<br/>@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-salvia">
              <p className="text-sm text-gray-500 italic">
                * Las consultas se atienden en orden de llegada. Responderé a tu solicitud lo antes posible.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Formulario (Ahora usando handleFormAction) */}
          <div className="w-full lg:w-3/5 p-10 md:p-14">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Déjame tus datos</h3>
            
            <form id="contact-form" action={handleFormAction} className="space-y-6">
              
              {/* Fila 1: Nombre y Celular */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Nombre completo *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" // Obligatorio para FormData
                    required 
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eucalipto focus:bg-white transition-colors text-gray-700"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="cellphone" className="block text-sm font-bold text-gray-700 mb-2">Celular / WhatsApp *</label>
                  <input 
                    type="tel" 
                    id="cellphone" 
                    name="cellphone" // Obligatorio para FormData
                    required 
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eucalipto focus:bg-white transition-colors text-gray-700"
                    placeholder="+57 300 000 0000"
                  />
                </div>
              </div>

              {/* Fila 2: Correo y Edad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Correo electrónico *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" // Obligatorio para FormData
                    required 
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eucalipto focus:bg-white transition-colors text-gray-700"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-bold text-gray-700 mb-2">Edad *</label>
                  <input 
                    type="number" 
                    id="age" 
                    name="age" // Obligatorio para FormData
                    required 
                    min="1"
                    max="99"
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eucalipto focus:bg-white transition-colors text-gray-700"
                    placeholder="Tu edad"
                  />
                </div>
              </div>

              {/* Tipo de Servicio */}
              <div>
                <label htmlFor="service" className="block text-sm font-bold text-gray-700 mb-2">Tipo de servicio de interés *</label>
                <select 
                  id="service" 
                  name="service" // Obligatorio para FormData
                  required
                  defaultValue=""
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eucalipto focus:bg-white transition-colors text-gray-700 appearance-none"
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="individual">Terapia Online Individual</option>
                  <option value="pareja">Terapia Online de Pareja</option>
                  <option value="infantojuvenil">Terapia Online Infanto-Juvenil</option>
                  <option value="empresa">Servicios para Empresa (B2B)</option>
                  <option value="duda">Tengo una duda general</option>
                </select>
              </div>

              {/* Motivo de consulta */}
              <div>
                <label htmlFor="reason" className="block text-sm font-bold text-gray-700 mb-2">Describe brevemente el motivo de tu consulta</label>
                <textarea 
                  id="reason" 
                  name="reason" // Obligatorio para FormData
                  rows={4}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eucalipto focus:bg-white transition-colors resize-none text-gray-700"
                  placeholder="Escribe aquí..."
                ></textarea>
              </div>

              {/* Checkbox Privacidad */}
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  name="privacy" 
                  required
                  className="mt-1 w-4 h-4 text-eucalipto-dark bg-gray-100 border-gray-300 rounded focus:ring-eucalipto-dark focus:ring-2"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600 leading-relaxed">
                  He leído y acepto la <a href="#" className="text-eucalipto-dark font-bold hover:underline">política de privacidad y protección de datos personales</a>.
                </label>
              </div>

              {/* Botón de Enviar (Cambiado a type="submit") */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-eucalipto text-white cursor-not-allowed' 
                    : 'bg-eucalipto-dark hover:bg-eucalipto-darker text-white hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </button>

            </form>
          </div>

        </div>
      </section>

    </main>
  );
}