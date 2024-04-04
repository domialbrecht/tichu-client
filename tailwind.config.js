import typography from '@tailwindcss/typography'
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif']
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-3deg)'
          },
          '50%': {
            transform: 'rotate(3deg)'
          }
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      colors: {
        light: '#c9cbd1',
        default: '#f2ecbc',
        chroma: '#716e61',
        dark: '#545464',
        darker: '#43436c',
        accent: '#00909E',
        deep: '#f2ecbc',
        sky: '#43436c',
        skylight: '#836f4a',
        subdue: '#8a8980',
        mellow: '#d7474b',
        contrast: '#5e857a',
        highlight: '#ff86e2'
      }
    }
  },
  plugins: [typography],
  safelist: ['prose', 'prose-sm', 'm-auto', 'text-left']
}
