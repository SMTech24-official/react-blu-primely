import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1324px",
          xl: "1580px",
        },
      },
      colors: {
        primary_highlighted: "#1E90FF",
        secondary_highlighted: "#B463FF",
        third_highlighted: "#FFC431",
        bg_secondary: "#2E2E2E",
        warning: "#F97066",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-animate"),
    function ({ addComponents }: PluginAPI) {
      addComponents({
        ".section-gap": {
          paddingTop: "2rem", // Default padding for all screen sizes
          paddingBottom: "2rem", // Default padding for all screen sizes

          // For small screens (sm)
          "@screen sm": {
            paddingTop: "2rem", // Adjust padding for small screens
            paddingBottom: "2rem",
          },

          // For medium screens (md)
          "@screen md": {
            paddingTop: "3rem", // Adjust padding for medium screens
            paddingBottom: "3rem",
          },

          // For large screens (lg)
          "@screen lg": {
            paddingTop: "4rem", // Adjust padding for large screens
            paddingBottom: "4rem",
          },

          // For extra-large screens (xl)
          "@screen xl": {
            paddingTop: "4rem", // Adjust padding for extra-large screens
            paddingBottom: "4rem",
          },
        },
        ".dashboard-containers": {
          maxWidth: "100%", // Default for all screen sizes
          paddingTop: "4rem", // Default padding for all screen sizes
          paddingBottom: "2rem", // Default padding for all screen sizes
          paddingRight: "1rem", // Default padding for all screen sizes
          paddingLeft: "1rem", // Default padding for all screen sizes
          margin: "0 auto", // Center the container

          // For small screens (sm)
          "@screen sm": {
            maxWidth: "100%", // Full width
            padding: "4rem", // Adjust padding for small screens
          },

          // For medium screens (md)
          "@screen md": {
            maxWidth: "100%", // Medium screen container width
            padding: "2rem", // Adjust padding for medium screens
          },

          // For large screens (lg)
          "@screen lg": {
            maxWidth: "100%", // Larger screen container width
            padding: "3rem",
          },

          // For extra-large screens (xl)
          "@screen xl": {
            maxWidth: "100%", // Maximum width for the container on extra-large screens
            padding: "4rem",
          },
        },
      });
    },
  ],
};
export default config;
