/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // San Francisco en iPhone/Mac (system-ui); Inter en Android y Windows.
        display: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'Inter', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        body: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', 'Inter', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#E27D19',
        'on-primary': '#FFFFFF',
      },
      borderRadius: {
        sm: '20px',
        lg: '30px',
        // Tarjetas y fotos, como las tarjetas de iOS.
        card: '28px',
      },
    },
  },
  plugins: [],
}