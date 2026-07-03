/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#f8f9fa',
        ink: '#191c1d',
        muted: '#3f4941',
        line: '#bec9bf',
        green: {
          950: '#002110',
          900: '#145f18',
          800: '#1f7a1f',
          200: '#b4dc72'
        },
        orange: {
          600: '#6b330d',
          700: '#4a2108',
          100: '#ead8b8'
        },
        brown: {
          900: '#3b1705',
          800: '#4a2108',
          700: '#6b330d'
        },
        slatekit: {
          900: '#1a1c1e',
          800: '#2e3132',
          700: '#444548',
          100: '#e7e8e9',
          50: '#f3f4f5'
        }
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
        label: ['Poppins', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 70px rgba(0, 80, 46, 0.12)'
      }
    }
  },
  plugins: []
};
