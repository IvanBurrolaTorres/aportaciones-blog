import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "../lib/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8 w-full">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-card shadow-sm">
            <Image
              src={urlFor(value).width(1200).fit("max").auto("format").url()}
              alt={value.alt || "Imagen del artículo"}
              fill
              className="object-contain"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    // Quitamos los estilos manuales de aquí para limpiar el código.
    // Los controlaremos todos desde el contenedor padre (ver abajo).
    h1: ({ children }) => (
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl mt-10 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mt-6 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-accent pl-6 italic text-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="font-medium text-accent underline underline-offset-4 hover:text-accent/80"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="relative rounded bg-card px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-text">
        {children}
      </code>
    ),
  },
};

export function Prose({ value }: { value: any }) {
  return (
    <div className="mx-auto w-full max-w-none px-0
      prose prose-lg dark:prose-invert
      
      {/* AQUÍ ESTÁ LA SOLUCIÓN: FORZAMOS EL COLOR DIRECTAMENTE */}
      {/* Esto anula el gris por defecto de tailwind/typography */}
      prose-p:text-black dark:prose-p:text-white
      prose-headings:text-black dark:prose-headings:text-white
      prose-li:text-black dark:prose-li:text-white
      prose-strong:text-black dark:prose-strong:text-white
      
      {/* Aseguramos peso de fuente para legibilidad en móvil */}
      prose-p:font-normal md:prose-p:font-normal
    ">
      <PortableText value={value} components={components} />
    </div>
  );
}
