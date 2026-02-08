import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WhatsApp Broadcasting Portal',
  description: 'Professional admin dashboard for WhatsApp chatbot and broadcasting',
  keywords: ['WhatsApp', 'broadcast', 'admin dashboard', 'chatbot', 'marketing', 'automation'],
  generator: 'Mr Saleem',
  authors: [{ name: 'Mr Saleem', url: 'https://yourdomain.com' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  openGraph: {
    title: 'WhatsApp Broadcasting Portal',
    description: 'Professional admin dashboard for WhatsApp chatbot and broadcasting',
    url: 'https://yourdomain.com',
    siteName: 'WhatsApp Broadcasting Portal',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WhatsApp Broadcasting Portal OG Image',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsApp Broadcasting Portal',
    description: 'Professional admin dashboard for WhatsApp chatbot and broadcasting',
    site: '@yourtwitterhandle',
    images: ['/og-image.png'],
    creator: '@yourtwitterhandle',
  },
  themeColor: '#1faa50',
  manifest: '/site.webmanifest'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
