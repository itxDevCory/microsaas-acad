import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AIWebology - Build Websites with AI | No Code Required',
  description: 'Transform ideas into professional websites using AI. Build, customize, and launch web applications without coding. Free AI-powered website builder and development platform.',
  keywords: ['ai website builder', 'no code', 'ai web development', 'website creator', 'ai tools', 'web design ai', 'automated website builder', 'ai coding assistant'],
  authors: [{ name: 'AIWebology' }],
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
