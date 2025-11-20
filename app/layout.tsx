import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Shell } from '../components/Shell'
import { ThemeProvider } from '../components/ThemeProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    default: 'Aportaciones Blog',
    template: '%s | Aportaciones',
  },
  description: 'Blog de aportaciones con Next.js 16 y Sanity v3.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <body className={inter.variable}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  )
}
