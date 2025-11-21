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
      typography: {
        DEFAULT: {
          css: {
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
      },
    },
  },
  plugins: [typography],
};

export default config;
