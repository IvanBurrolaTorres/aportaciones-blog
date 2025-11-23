"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "../lib/utils";

interface TextRevealProps {
    text: string;
    className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const words = text.split(" ");

    return (
        <div ref={targetRef} className={cn("relative z-0 min-h-[150vh]", className)}>
            <div className={"sticky top-0 flex h-[50vh] items-center justify-center bg-transparent"}>
                <p className={"flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"}>
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + 1 / words.length;
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        );
                    })}
                </p>
            </div>
        </div>
    );
}

interface WordProps {
    children: React.ReactNode;
    progress: any;
    range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <span className="relative mx-1 lg:mx-2.5">
            <motion.span style={{ opacity: opacity }} className={"text-foreground transition-opacity duration-200"}>
                {children}
            </motion.span>
        </span>
    );
};
