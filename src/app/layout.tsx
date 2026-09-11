import './globals.css';
import { Fraunces, Inter } from 'next/font/google';

const fraunces = Fraunces({ 
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Leaf & Ridge',
  description: 'Grown slowly, chosen carefully.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
