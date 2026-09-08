import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ZAIPIO — One Dashboard. Every Platform. Zero Chaos.',
  description:
    'Automate labels, sync stock, track profits across Amazon, Flipkart, Meesho & Shopify — all in one place. The #1 seller tool for Indian e-commerce businesses.',
  keywords: [
    'e-commerce seller tool', 'amazon seller dashboard', 'flipkart seller',
    'meesho seller', 'shopify india', 'label automation', 'stock sync',
    'profit calculator', 'seller SaaS India', 'ZAIPIO',
  ],
  openGraph: {
    title: 'ZAIPIO — One Dashboard. Every Platform. Zero Chaos.',
    description: 'Automate labels, sync stock, track profits across all your platforms.',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-outfit antialiased">{children}</body>
    </html>
  )
}
