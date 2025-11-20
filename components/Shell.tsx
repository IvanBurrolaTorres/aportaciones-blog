import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { cn } from "../lib/utils"

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight hover:text-accent transition-colors">
                Aportaciones
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className="flex items-center text-sm font-medium text-muted hover:text-text transition-colors"
              >
                Home
              </Link>
              <Link
                href="/feed.xml"
                className="flex items-center text-sm font-medium text-muted hover:text-text transition-colors"
              >
                RSS
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted md:text-left">
            Built with Next.js 16 & Sanity.
          </p>
        </div>
      </footer>
    </div>
  )
}
