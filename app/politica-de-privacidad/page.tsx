import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Psicóloga Dani Vargas',
  description:
    'Política de tratamiento de datos personales de la web de la Psicóloga Dani Vargas, conforme a la Ley 1581 de 2012 de Colombia.',
};

export default function PoliticaPrivacidadPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-blancoluz">
      <section className="max-w-3xl mx-auto w-full px-6 pt-32 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold text-tinta mb-3 font-serif">
          Política de Privacidad y Tratamiento de Datos
        </h1>
        <p className="text-sm text-gray-500 mb-8">Última actualización: pendiente de publicación.</p>

        {/* Aviso interno: borrador pendiente de validación legal */}
        <div className="bg-arena border-l-4 border-eucalipto rounded-r-lg p-4 mb-10 text-sm text-gray-700">
          ⚠️ <strong>Borrador.</strong> Este texto es una base adaptada a la{' '}
          <strong>Ley 1581 de 2012</strong> (Habeas Data, Colombia) y debe ser{' '}
          <strong>revisado y validado por un profesional legal</strong> antes de publicarse en producción.
        </div>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-tinta mb-3">1. Responsable del tratamiento</h2>
            <p>
              Daniela Vargas (Psicóloga Dani Vargas), responsable del tratamiento de los datos personales
              recogidos a través de este sitio web. Contacto:{' '}
              <a href="mailto:hola@psicologadanivargas.com" className="text-eucalipto-dark underline hover:text-eucalipto-darker">
                hola@psicologadanivargas.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tinta mb-3">2. Datos que recogemos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Formulario de contacto:</strong> nombre, correo electrónico, teléfono/WhatsApp y el mensaje que nos envías.</li>
              <li><strong>Newsletter:</strong> correo electrónico, si decides suscribirte.</li>
              <li><strong>Compra de guías digitales:</strong> datos de la transacción y correo de contacto (el pago se procesa a través de la pasarela Bold; no almacenamos los datos de tu tarjeta).</li>
              <li><strong>Datos de navegación:</strong> métricas anónimas de uso del sitio.</li>
            </ul>
            <p className="mt-3">
              La terapia y los datos de salud asociados se gestionan en el marco de la consulta clínica, no a
              través de esta web. Cualquier dato sensible recibe protección reforzada conforme a la ley.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tinta mb-3">3. Finalidades</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responder a tus consultas y solicitudes de cita.</li>
              <li>Gestionar la compra y entrega de las guías digitales.</li>
              <li>Enviarte la newsletter cuando te has suscrito (con opción de baja en cada envío).</li>
              <li>Mejorar el sitio web mediante estadísticas agregadas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tinta mb-3">4. Encargados y proveedores</h2>
            <p>Para prestar estos servicios nos apoyamos en terceros que actúan como encargados del tratamiento:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Resend</strong> — envío de correos (contacto, entrega de guías, newsletter).</li>
              <li><strong>Supabase</strong> — base de datos (registro de pagos y suscriptores).</li>
              <li><strong>Bold</strong> — pasarela de pago.</li>
              <li><strong>Contentful</strong> — gestión de contenidos del blog y guías.</li>
              <li><strong>Vercel</strong> — alojamiento del sitio y métricas de uso.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tinta mb-3">5. Tus derechos</h2>
            <p>
              Conforme a la Ley 1581 de 2012, tienes derecho a conocer, actualizar, rectificar y suprimir tus
              datos, así como a revocar el consentimiento. Para ejercerlos, escríbenos a{' '}
              <a href="mailto:hola@psicologadanivargas.com" className="text-eucalipto-dark underline hover:text-eucalipto-darker">
                hola@psicologadanivargas.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-tinta mb-3">6. Conservación</h2>
            <p>
              Conservamos tus datos únicamente durante el tiempo necesario para las finalidades descritas y para
              cumplir las obligaciones legales aplicables.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
