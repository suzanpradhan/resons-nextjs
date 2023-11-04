/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/core/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        whiteShade: '#ECF2F8',
        accentRed: '#D9362F',
        redShade: '#F0D0CE',
        primaryGray: {
          200: '#E7EBEE',
          300: '#DEDEE0',
          500: '#717172',
        },
        dark: {
          500: '#2D2D2E',
        },
        grey: {
          200: '#EDF3F9',
          100: '#F5F8FA',
        },
        purple: '#FFA4FF',
        primary: {
          900: '#343543',
          800: '#474855',
          700: '#5C5D68',
          600: '#70717B',
          500: '#85858E',
          400: '#9999A0',
          300: '#ADAEB3',
          200: '#C1C2C6',
          100: '#D6D6D9',
        },
        accent: '#de5b6d',
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
};
