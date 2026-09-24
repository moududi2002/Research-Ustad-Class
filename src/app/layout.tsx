// src/app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/providers/ThemeProvider';

/* ------------------------------------------------------------------ */
/* Fonts                                                               */
/* ------------------------------------------------------------------ */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: {
    default: 'Research Ustad Classes',
    template: '%s | Research Ustad Classes',
  },
  description:
    'A modern, web-based educational presentation platform by Research Ustad Classes — replacing traditional slides with fast, shareable, and elegant web presentations.',
  applicationName: 'Research Ustad Classes',
  authors: [{ name: 'Research Ustad Classes' }],
  keywords: [
    'Research Ustad',
    'Research',
    'Higher Study',
    'Scholarship',
    'Publication',
    'Educational Presentations',
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/RU_logo.png',
  },
  openGraph: {
    title: 'Research Ustad Classes',
    description:
      'Modern web-based educational presentations for researchers and students.',
    type: 'website',
    images: ['/RU_logo.png'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0a09' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/* ------------------------------------------------------------------ */
/* Root Layout                                                         */
/* ------------------------------------------------------------------ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}