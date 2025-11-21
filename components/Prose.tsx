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
            <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mt-10 mb-6 text-3xl font-extrabold tracking-tight lg:text-4xl text-black dark:text-white">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-black dark:text-white dark:border-gray-700">
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
      <blockquote className="mt-6 border-l-4 border-gray-300 pl-6 italic text-gray-800 dark:border-gray-600 dark:text-gray-300">
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
      <code className="relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-black dark:bg-gray-800 dark:text-white">
        {children}
      </code>
    ),
  },
};

export function Prose({ value }: { value: any }) {
  return (
    <div className="mx-auto w-full max-w-none prose prose-lg dark:prose-invert prose-headings:text-black dark:prose-headings:text-white prose-p:text-black dark:prose-p:text-white prose-li:text-black dark:prose-li:text-white prose-strong:text-black dark:prose-strong:text-white">
      <PortableText value={value} components={components} />
    </div>
  );
}
