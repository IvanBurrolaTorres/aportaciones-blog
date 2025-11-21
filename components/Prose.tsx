import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "../lib/image";

// CONFIGURACIÓN DE ESTILOS:
// Definimos una constante para el color del texto.
// 'text-neutral-900': Negro casi puro para modo claro (Soluciona lo deslavado/opaco).
// 'dark:text-neutral-50': Blanco brillante para modo oscuro.
const TEXT_COLOR = "text-neutral-900 dark:text-neutral-50";

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
    // INYECCIÓN DIRECTA DE CLASES:
    // En lugar de esperar que el padre herede el color, se lo ponemos explícitamente a cada etiqueta.
    h1: ({ children }) => (
      <h1 className={`mt-10 mb-6 text-3xl font-extrabold tracking-tight lg:text-4xl ${TEXT_COLOR}`}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className={`mt-10 mb-4 border-b border-border pb-2 text-2xl font-semibold tracking-tight first:mt-0 ${TEXT_COLOR}`}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={`mt-8 mb-4 text-xl font-semibold tracking-tight ${TEXT_COLOR}`}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className={`mt-6 mb-3 text-lg font-semibold tracking-tight ${TEXT_COLOR}`}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      // AQUÍ ESTABA EL PROBLEMA DE "DESLAVADO":
      // Al poner TEXT_COLOR directo aquí, forzamos el negro intenso.
      // Agregamos 'leading-7' para buena lectura y 'mb-4' para separación.
      <p className={`leading-7 [&:not(:first-child)]:mt-6 ${TEXT_COLOR}`}>
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
    // Listas también forzadas con el color
    bullet: ({ children }) => (
      <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 ${TEXT_COLOR}`}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className={`my-6 ml-6 list-decimal [&>li]:mt-2 ${TEXT_COLOR}`}>{children}</ol>
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
    // CAMBIO IMPORTANTE EN EL CONTENEDOR:
    // 1. Quitamos 'mx-auto' y 'px' porque eso ya lo maneja el padre (page.tsx).
    // 2. Mantenemos 'w-full'.
    // 3. IMPORTANTE: Quitamos la clase 'prose' de aquí. 
    //    ¿Por qué? Porque la clase 'prose' es la que inyecta los colores grises opacos por defecto.
    //    Como ya estilizamos cada <h1> y <p> manualmente arriba, ya no necesitamos 'prose' para el color,
    //    solo necesitamos que renderice el contenido.
    <div className="w-full max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
