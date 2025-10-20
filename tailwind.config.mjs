/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/views/**/*.ejs",
    "./src/public/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta corporativa Fiscalis & Finances
        'corporate': {
          'navy': '#102133',        // Azul marino principal del logo
          'dark-navy': '#152b42',   // Azul marino más oscuro
          'light-navy': '#2d4f73',  // Azul marino más claro
          'gold': '#d4af37',        // Dorado elegante (complementario)
          'light-gold': '#e6c757',  // Dorado más claro
          'cream': '#f8f6f0',       // Crema suave
          'gray-blue': '#4a5568',   // Gris azulado
          'light-gray': '#f7fafc',  // Gris muy claro
          'accent': '#3182ce',      // Azul de acento
        }
      },
      fontFamily: {
        'corporate': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}