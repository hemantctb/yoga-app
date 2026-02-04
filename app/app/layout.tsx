import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sutra | AI-Powered Yoga Teacher Training',
  description: 'Master your yoga cueing with AI-powered feedback. Record, practice, and perfect your teaching skills.',
  keywords: ['yoga', 'teacher training', 'cueing', 'AI', 'asana', 'practice'],
  authors: [{ name: 'Sutra' }],
  openGraph: {
    title: 'Sutra | AI-Powered Yoga Teacher Training',
    description: 'Master your yoga cueing with AI-powered feedback',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
