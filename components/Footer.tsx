import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#2D313A] text-gray-200 py-6 px-8 text-sm text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Sección 1: Redes y Correo */}
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <p className="mb-2 font-medium text-pink-300">Sígueme en mis redes 🧠</p>
            <div className="flex gap-2 justify-center md:justify-start">
              <Image src="/icons/socials/icons8-facebook.png" alt="Facebook" width={30} height={30} className="bg-white rounded" />
              <Image src="/icons/socials/icons8-instagram.png" alt="Instagram" width={30} height={30} className="bg-white rounded" />
            </div>
          </div>
          
          <div>
            <p className="mb-1 font-medium text-pink-300">Escríbeme 💌</p>
            <p>danielavargaspsicologa@gmail.com</p>
          </div>
        </div>

        {/* Sección 2: Logos de Pago */}
        <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-md">
          {/* He puesto algunos, luego puedes agregar el resto de la carpeta */}
          <Image src="/icons/payments/bancolombia.svg" alt="Bancolombia" width={40} height={25} />
          <Image src="/icons/payments/daviplata.svg" alt="Daviplata" width={40} height={25} />
          <Image src="/icons/payments/paypal-3.svg" alt="PayPal" width={40} height={25} />
          <Image src="/icons/payments/nequi-2.svg" alt="Nequi" width={40} height={25} />
          <Image src="/icons/payments/pse_logo.svg" alt="PSE" width={40} height={25} />
        </div>

        {/* Sección 3: Legal y Copyright */}
        <div className="flex flex-col gap-1 items-center md:items-end">
          <Link href="#" className="hover:text-pink-400 underline transition-colors">
            Política de privacidad
          </Link>
          <p>Copyright 2020</p>
          <p>Diseñada por: <span className="text-pink-300">@michelle.caicedo y @juandiego.motta</span></p>
        </div>

      </div>
    </footer>
    )
}