import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        // Custom dark/light palette
        background: "var(--background)",
        foreground: "var(--foreground)",
        neutral: {
          900: "#171717",
          800: "#262626",
          // ...
        }
      },
    },
  },
  plugins: [],
};
export default config;
