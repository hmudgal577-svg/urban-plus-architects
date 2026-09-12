import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#fbfbf9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Urban Plus Architects & Associates | Luxury Architecture & Design – Gwalior',
    template: '%s | Urban Plus Architects & Associates',
  },
  description:
    'Urban Plus Architects & Associates is a premier architecture, interior design, planning and 3D visualization studio based in Gwalior, Madhya Pradesh. Founded in 2012 by Ar. Shailendra Bhadoria.',
  keywords: [
    'Architects in Gwalior',
    'Architecture firm in Gwalior',
    'Residential architects Gwalior',
    'Commercial architects Gwalior',
    'Interior designers Gwalior',
    'Ar. Shailendra Bhadoria',
    'Building design Gwalior',
    '3D architectural visualization Gwalior',
    'Luxury villa architects Madhya Pradesh',
  ],
  authors: [{ name: 'Ar. Shailendra Bhadoria', url: 'https://urbanplusarchitects.com' }],
  creator: 'Urban Plus Architects & Associates',
  publisher: 'Urban Plus Architects & Associates',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://urbanplusarchitects.com',
    siteName: 'Urban Plus Architects & Associates',
    title: 'Urban Plus Architects & Associates | Luxury Architecture & Design – Gwalior',
    description:
      'Designing Spaces. Shaping Experiences. Premium modern architecture, interiors, and visualization studio based in Gwalior since 2012.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Urban Plus Architects & Associates – Luxury Architecture Studio Gwalior',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urban Plus Architects & Associates – Gwalior',
    description: 'Modern architecture, interiors, and master planning in Central India.',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#fbfbf9] font-sans text-[#2b2e35] antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
