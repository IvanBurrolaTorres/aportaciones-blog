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
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.neutral.900"),
            "h1, h2, h3, h4": {
              color: theme("colors.neutral.950"),
            },
            strong: {
              color: theme("colors.neutral.950"),
            },
            a: {
              color: theme("colors.blue.600"),
              textDecoration: "underline",
              fontWeight: "500",
              "&:hover": {
                color: theme("colors.blue.700"),
              },
            },
            code: {
              color: theme("colors.neutral.950"),
            },
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
        invert: {
          css: {
            color: theme("colors.neutral.50"),
            "h1, h2, h3, h4": {
              color: theme("colors.white"),
            },
            strong: {
              color: theme("colors.white"),
            },
            a: {
              color: theme("colors.blue.400"),
              "&:hover": {
                color: theme("colors.blue.300"),
              },
            },
            code: {
              color: theme("colors.white"),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
