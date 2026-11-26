/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', 'Arial', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
        display: ['Fraunces', 'serif']
      }
    }
  },
  plugins: []
};
