import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Shell } from '../components/Shell'
import { ThemeProvider } from '../components/ThemeProvider'
import './globals.css'
import { cn } from '../lib/utils'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Aportaciones Blog',
    template: '%s | Aportaciones',
  },
  description: 'Blog de aportaciones con Next.js y Sanity.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        geistSans.variable
      )}>
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
