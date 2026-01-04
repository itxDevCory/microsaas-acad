import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MicroSaaS Academy AI - Learn, Build, Earn',
  description: 'Your personal AI mentor for building and selling profitable micro-SaaS products',
  keywords: ['micro-saas', 'ai', 'learning', 'coding', 'entrepreneurship'],
  authors: [{ name: 'MicroSaaS Academy' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#1f2937',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
