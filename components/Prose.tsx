import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "../lib/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8 w-full">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-100 shadow-sm dark:bg-neutral-800">
            <Image
              src={urlFor(value).width(1200).fit("max").auto("format").url()}
              alt={value.alt || "Imagen del artículo"}
              fill
              className="object-contain"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    // Usamos text-black para máximo contraste en modo light.
    // Tailwind ahora podrá procesar esto correctamente en Safari gracias al fix en globals.css
    h1: ({ children }) => (
      <h1 className="mt-10 mb-6 text-3xl font-extrabold tracking-tight lg:text-4xl text-black dark:text-white">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 border-b border-neutral-200 pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-black dark:text-white dark:border-neutral-700">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-4 text-xl font-semibold tracking-tight text-black dark:text-white">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-3 text-lg font-semibold tracking-tight text-black dark:text-white">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-black dark:text-white font-normal">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-neutral-300 pl-6 italic text-neutral-800 dark:border-neutral-600 dark:text-neutral-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-black dark:text-white">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-black dark:text-white">{children}</ol>
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
          className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="relative rounded bg-neutral-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-black dark:bg-neutral-800 dark:text-white">
        {children}
      </code>
    ),
  },
};

export function Prose({ value }: { value: any }) {
  return (
    // Quitamos la clase 'prose' para evitar conflictos de herencia de color.
    // El control de color ahora es manual y robusto en cada etiqueta.
    <div className="w-full max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
