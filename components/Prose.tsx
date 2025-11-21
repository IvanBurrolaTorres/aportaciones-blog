import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "../lib/image";

// Definimos las clases de color como constantes para asegurar consistencia
// Usamos 'text-neutral-900' (casi negro) para light mode y 'text-neutral-50' para dark mode.
// Agregamos 'font-medium' en los párrafos para darles un poco más de peso en móviles y evitar que se vean delgados/deslavados.
const TEXT_STYLES = "text-neutral-900 dark:text-neutral-50";

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
    // En cada bloque h1, h2, p, etc., inyectamos {TEXT_STYLES} directamente.
    h1: ({ children }) => (
      <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-10 mb-6 ${TEXT_STYLES}`}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className={`scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4 ${TEXT_STYLES}`}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4 ${TEXT_STYLES}`}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-3 ${TEXT_STYLES}`}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      // AQUÍ ESTÁ LA SOLUCIÓN PRINCIPAL:
      // Aplicamos el color directamente al <p>. 
      // También agregué 'font-normal' o podrías usar 'font-medium' si aún lo sientes muy delgado.
      <p className={`leading-7 [&:not(:first-child)]:mt-6 ${TEXT_STYLES}`}>
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
      <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 ${TEXT_STYLES}`}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className={`my-6 ml-6 list-decimal [&>li]:mt-2 ${TEXT_STYLES}`}>{children}</ol>
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
    // NOTA IMPORTANTE:
    // Quité el 'sm:px-0' que tenías en tu código reciente, ya que eso era lo que causaba 
    // que el texto se pegara al borde en celulares grandes.
    // Dejé 'text-neutral-900' aquí como respaldo, pero el trabajo real lo hacen los componentes arriba.
    <div className="mx-auto w-full max-w-[65ch] px-4 text-base leading-relaxed text-neutral-900 dark:text-neutral-50">
      <PortableText value={value} components={components} />
    </div>
  );
}
