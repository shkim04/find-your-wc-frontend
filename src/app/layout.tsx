import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Find your wc',
  description: 'Find or contribute your toilet experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
