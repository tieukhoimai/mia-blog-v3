// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }], // ~10px — index numbers, labels
        xs: ['0.75rem', { lineHeight: '1rem' }], // ~12px — captions, timestamps
        sm: ['0.875rem', { lineHeight: '1.5rem' }], // ~14px — secondary UI text
        base: ['1rem', { lineHeight: '1.75rem' }], // ~16px — body
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // ~18px — lead text
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      fontFamily: {
        sans: ['var(--font-ibm-plex-sans)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.neutral,
        gray: colors.gray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            fontSize: '0.90rem',
            lineHeight: '1.75',
            p: { marginTop: '1em', marginBottom: '1em' },
            a: {
              color: theme('colors.primary.700'),
              '&:hover': {
                color: `${theme('colors.primary.900')}`,
              },
              code: { color: theme('colors.primary.600') },
            },
            'h1,h2': {
              fontWeight: '600',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            h4: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
              fontSize: '0.875em',
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.300'),
              '&:hover': {
                color: `${theme('colors.primary.100')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
