"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "../lib/utils"

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="flex h-12 w-12 items-center justify-center rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Abrir menú"
            >
                <Menu className="h-6 w-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-sm"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 z-[100] w-full max-w-xs border-l border-border bg-background p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-lg font-bold tracking-tight">Menú</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                    aria-label="Cerrar menú"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-6">
                                <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/feed.xml"
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
                                >
                                    RSS
                                </Link>

                                <div className="mt-8 pt-8 border-t border-border">
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Sígueme en redes
                                    </p>
                                    {/* Add social links here if available */}
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
