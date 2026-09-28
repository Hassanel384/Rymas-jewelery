/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#d25d5d",
          "primary-hover": "#b84747",
          "primary-light": "#fff5f5",
          gold: "#d4af37",
          "gold-hover": "#b89528",
          "gold-light": "#fef9ec",
          dark: "#1c1917",
          charcoal: "#292524",
          cream: "#fbf9f5",
          sand: "#f5efe6",
          whatsapp: "#25D366",
          "whatsapp-hover": "#1ebd56",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        floating: "0 10px 25px -5px rgba(210, 93, 93, 0.25), 0 8px 10px -6px rgba(210, 93, 93, 0.2)",
        bottomNav: "0 -2px 10px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
