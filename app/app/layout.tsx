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
  title: 'Sutra | The Smart Assistant for the Path of Yoga',
  description: 'The digital operating system that honors ancient yoga lineage with modern techniques. AI-powered tools for yoga schools and personalized feedback for students.',
  keywords: ['yoga', 'teacher training', 'cueing', 'AI', 'asana', 'practice', 'yoga lineage', 'white-label yoga app', 'yoga school software'],
  authors: [{ name: 'Sutra' }],
  openGraph: {
    title: 'Sutra | The Smart Assistant for the Path of Yoga',
    description: 'Bridging ancient tradition and modern intelligence for yoga students and schools.',
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
