/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    // The accessibility panel toggles classes on <html> from plain JS in
    // public/ (see public/scripts/a11y.js) rather than from a Tailwind
    // class attribute — Tailwind's content scan otherwise never sees
    // those class names as literal strings and purges the CSS rules
    // that target them out of the build. Scanning this file is enough
    // to keep them: it doesn't need to be templated content.
    './public/scripts/*.js',
    './node_modules/@material-tailwind/html/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
