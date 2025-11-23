import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { MobileMenu } from "./MobileMenu"
import { AuroraBackground } from "./AuroraBackground"
import { cn } from "../lib/utils"

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <AuroraBackground>
      <div className="flex min-h-screen flex-col font-sans antialiased relative z-10 w-full">
        {/* Noise Texture Overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-50 mix-blend-overlay" />

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

        <footer className="border-t border-white/10 bg-background/50 backdrop-blur-sm relative z-10">
          <div className="container py-12 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                  Mantente <br /> Curioso.
                </h2>
                <p className="text-lg text-muted-foreground max-w-md">
                  Explorando ideas, tecnología y crecimiento personal. Un espacio para compartir lo que aprendo en el camino.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Navegación</h3>
                  <ul className="space-y-3">
                    <li><Link href="/" className="text-base hover:text-primary transition-colors">Home</Link></li>
                    <li><Link href="/feed.xml" className="text-base hover:text-primary transition-colors">RSS</Link></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Social</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-base hover:text-primary transition-colors">Twitter</a></li>
                    <li><a href="#" className="text-base hover:text-primary transition-colors">GitHub</a></li>
                    <li><a href="#" className="text-base hover:text-primary transition-colors">LinkedIn</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Iván Burrola. Todos los derechos reservados.
              </p>
              <p className="text-sm text-muted-foreground">
                Diseñado con <span className="text-red-500">♥</span> y Next.js
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AuroraBackground>
  )
}
