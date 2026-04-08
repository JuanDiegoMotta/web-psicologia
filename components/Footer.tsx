import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#2D313A] text-gray-200 py-6 px-8 text-sm text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Sección 1: Redes y Correo */}
        <div className="flex flex-col md:flex-row gap-6 ">
          <div>
            <p className="mb-2 font-medium text-pink-300">Sígueme en mis redes 🧠</p>
            <div className="flex gap-2 justify-center md:justify-start">
              <Image src="/icons/socials/fb.svg" alt="Facebook" width={27} height={27} className="brightness-0 invert opacity-100" />
              <Image src="/icons/socials/insta.svg" alt="Instagram" width={30} height={30} className="brightness-0 invert opacity-100" />
            </div>
          </div>
          
          <div>
            <p className="mb-1 font-medium text-pink-300">Escríbeme 💌</p>
            <p>danielavargaspsicologa@gmail.com</p>
          </div>
        </div>

        {/* Sección 2: Logos de Pago */}
        <div className="flex flex-col items-center gap-3 ">
          {/* Redujimos el gap (de gap-8 a gap-5) para que todos quepan en la misma línea horizontal */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-5 mt-2">
            
            <Image 
              src="/icons/payments/bancolombia.svg" 
              alt="Bancolombia" 
              width={100} height={40} 
              className="w-auto h-5 md:h-6 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" 
            />
            <Image 
              src="/icons/payments/daviplata.svg" 
              alt="Daviplata" 
              width={100} height={40} 
              className="w-auto h-5 md:h-6 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" 
            />
            <Image 
              src="/icons/payments/paypal-3.svg" 
              alt="PayPal" 
              width={100} height={40} 
              className="w-auto h-5 md:h-6 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" 
            />
            <Image 
              src="/icons/payments/nequi-2.svg" 
              alt="Nequi" 
              width={100} height={40} 
              className="w-auto h-5 md:h-6 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" 
            />
            <Image 
              src="/icons/payments/pse-logo.svg" 
              alt="PSE" 
              width={100} height={40} 
              className="w-auto h-5 md:h-6 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" 
            />
          </div>
        </div>

        {/* Sección 3: Legal y Copyright */}
        <div className="flex flex-col gap-1 items-center md:items-end ">
          <Link href="#" className="hover:text-pink-400 underline transition-colors">
            Política de privacidad
          </Link>
          <p>Copyright 2020</p>
        </div>

      </div>
    </footer>
    )
}