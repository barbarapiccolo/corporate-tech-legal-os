import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Tech Legal OS • In-House & Tech Counsel Command Center',
  description: 'Sistema Operativo y Centro de Mando Integral para el Abogado Corporativo Tech y Legal Ops',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-[#090d16] text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
