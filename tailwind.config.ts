import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./schemas/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1200px",
        },
      },
      // AQUÍ ESTÁ LA MAGIA:
      // Configuramos typography para que use colores FUERTES por defecto
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            // Forzamos a que el cuerpo del texto sea neutral-900 (casi negro) en lugar del gris por defecto
            "--tw-prose-body": theme("colors.neutral.900"),
            "--tw-prose-headings": theme("colors.neutral.900"),
            "--tw-prose-lead": theme("colors.neutral.900"),
            "--tw-prose-links": theme("colors.neutral.900"),
            "--tw-prose-bold": theme("colors.neutral.900"),
            "--tw-prose-counters": theme("colors.neutral.900"),
            "--tw-prose-bullets": theme("colors.neutral.900"),
            "--tw-prose-hr": theme("colors.neutral.300"),
            "--tw-prose-quotes": theme("colors.neutral.900"),
            "--tw-prose-quote-borders": theme("colors.neutral.300"),
            "--tw-prose-captions": theme("colors.neutral.600"),
            "--tw-prose-code": theme("colors.neutral.900"),
            "--tw-prose-pre-code": theme("colors.neutral.100"),
            "--tw-prose-pre-bg": theme("colors.neutral.900"),
            
            // Estilos globales para imágenes y videos
            "img, video, figure": {
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "0.75rem",
            },
            pre: {
              borderRadius: "0.75rem",
            },
          },
        },
        // Configuración explícita para modo oscuro (invert)
        // Esto asegura que cuando uses 'dark:prose-invert', los colores sean blanco brillante
        invert: {
          css: {
            "--tw-prose-body": theme("colors.neutral.50"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-lead": theme("colors.neutral.300"),
            "--tw-prose-links": theme("colors.white"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.neutral.300"),
            "--tw-prose-bullets": theme("colors.neutral.300"),
            "--tw-prose-hr": theme("colors.neutral.700"),
            "--tw-prose-quotes": theme("colors.neutral.100"),
            "--tw-prose-quote-borders": theme("colors.neutral.700"),
            "--tw-prose-captions": theme("colors.neutral.400"),
            "--tw-prose-code": theme("colors.white"),
            "--tw-prose-pre-code": theme("colors.neutral.300"),
            "--tw-prose-pre-bg": "rgb(0 0 0 / 50%)",
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
