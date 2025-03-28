import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Canva Clone - Crie designs incríveis',
  description: 'Uma plataforma de design online para criar apresentações, posts para redes sociais, e muito mais.',
  keywords: 'design, editor online, canva clone, criação de conteúdo',
  authors: [{ name: 'Canva Clone Team' }],
  openGraph: {
    title: 'Canva Clone - Crie designs incríveis',
    description: 'Uma plataforma de design online para criar apresentações, posts para redes sociais, e muito mais.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <div id="modal-root"></div>
        <div id="toast-root"></div>
        {children}
      </body>
    </html>
  );
}