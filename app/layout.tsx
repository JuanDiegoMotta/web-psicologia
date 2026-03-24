import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        {/* Aquí construiremos nuestro Navbar más adelante */}
        <header className="bg-gray-100 p-4 text-center border-b">
          <p className="text-gray-500">Aquí irá el Navbar</p>
        </header>

        {/* 'children' representa el contenido de cada página individual (como tu page.tsx) */}
        <div className="min-h-screen">
          {children}
        </div>

        {/* Aquí construiremos nuestro Footer más adelante */}
        <footer className="bg-gray-100 p-4 text-center border-t">
          <p className="text-gray-500">Aquí irá el Footer</p>
        </footer>
      </body>
    </html>
  );
}