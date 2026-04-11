import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sinais de Imortalidade',
  description: 'Editorial sobre imortalidade, longevidade e futuro humano.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
