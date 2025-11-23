import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { MobileMenu } from "./MobileMenu"
import { cn } from "../lib/utils"

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-noise" />

      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary/80">
                Aportaciones
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/feed.xml"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                RSS
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </header>
      <main className="flex-1 relative z-10">{children}</main>
      <footer className="border-t border-white/10 py-6 md:px-8 md:py-0 bg-background/50 backdrop-blur-sm relative z-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js 16 & Sanity. Designed by <span className="font-semibold text-foreground">Ivan Burrola</span>.
          </p>
        </div>
      </footer>
    </div>
  )
}
