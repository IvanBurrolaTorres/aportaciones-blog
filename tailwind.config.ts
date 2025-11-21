import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  // Importante: Asegúrate de que darkMode esté configurado para usar clases o data-attributes
  // Si usas next-themes con data-theme='dark', esto ayuda:
  darkMode: ["class", '[data-theme="dark"]'], 
  
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
    },
  },
  plugins: [typography],
};

export default config;
