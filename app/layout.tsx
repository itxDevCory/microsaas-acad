import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1f2937',
};

export const metadata: Metadata = {
  title: 'MicroSaaS Academy AI - Learn, Build, Earn',
  description: 'Your personal AI mentor for building and selling profitable micro-SaaS products',
  keywords: ['micro-saas', 'ai', 'learning', 'coding', 'entrepreneurship'],
  authors: [{ name: 'MicroSaaS Academy' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
