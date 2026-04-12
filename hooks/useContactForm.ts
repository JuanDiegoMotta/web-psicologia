import { useState } from 'react';

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // En React 19 / Next.js moderno, recibimos 'FormData' directamente a través del atributo 'action'
  const handleFormAction = async (formData: FormData) => {
    setIsSubmitting(true);

    // Mágicamente convierte todos los inputs (que tengan el atributo 'name') en un objeto plano
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        alert('¡Gracias por escribirme! Me pondré en contacto contigo muy pronto.');
        // Limpiamos el formulario buscando su ID
        const form = document.getElementById('contact-form') as HTMLFormElement;
        if (form) form.reset();
      } else {
        alert('Hubo un problema al enviar el mensaje. Por favor, inténtalo más tarde.');
      }
    } catch (error) {
      alert('Error de conexión. Revisa tu internet e inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handleFormAction };
};