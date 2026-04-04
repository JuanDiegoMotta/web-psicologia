import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// Cargamos una fuente optimizada de Google Fonts
const inter = Inter({ subsets: ["latin"] });

// Estos son los metadatos globales para SEO
export const metadata: Metadata = {
  title: "Clínica de Psicología",
  description: "Tu espacio para la salud mental y el bienestar emocional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar/>        
        {/* 'children' representa el contenido de cada página individual (como tu page.tsx) */}
        <div className="min-h-screen">
          {children}
        </div>

        {/* Aquí construiremos nuestro Footer más adelante */}
        <Footer/>
      </body>
    </html>
  );
}