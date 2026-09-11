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
        paper: "var(--paper)",
        putty: "var(--putty)",
        "putty-deep": "var(--putty-deep)",
        "moss-dark": "var(--moss-dark)",
        moss: "var(--moss)",
        sage: "var(--sage)",
        ochre: "var(--ochre)",
        line: "var(--line)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)"],
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
