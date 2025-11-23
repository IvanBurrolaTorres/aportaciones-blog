import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "../lib/image";
import { cn } from "../lib/utils";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8 w-full">
          <div className="relative w-full overflow-hidden rounded-xl bg-muted shadow-sm border border-border">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || "Imagen del artículo"}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground">
        {children}
      </code>
    ),
  },
};

export function Prose({
  value,
  className,
}: {
  value: any;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-lg dark:prose-invert max-w-none",
        "prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground",
        "prose-p:leading-relaxed prose-p:text-muted-foreground",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-ul:text-muted-foreground prose-ol:text-muted-foreground",
        "prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:italic",
        className
      )}
    >
      <PortableText value={value} components={components} />
    </div>
  );
}
