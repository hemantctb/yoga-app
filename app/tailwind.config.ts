import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        paper: '#F9F8F4',
        'paper-light': '#FFFEFA',

        // Primary Actions
        clay: '#C86B56',
        'clay-hover': '#A85745',
        'clay-light': '#E8A997',

        // Text
        ink: '#2C3333',
        'ink-light': '#5D6565',

        // Feedback Colors
        sage: '#798F79',
        'sage-light': '#EBF0EB',
        turmeric: '#D8A658',
        'turmeric-light': '#FFF8EB',
        sand: '#E6E2D8',

        // Backwards compatibility
        background: '#F9F8F4',
        foreground: '#2C3333',
        primary: {
          DEFAULT: '#C86B56',
          light: '#E8A997',
          dark: '#A85745',
        },
        secondary: {
          DEFAULT: '#D8A658',
          light: '#FFF8EB',
          dark: '#B8874E',
        },
        accent: {
          DEFAULT: '#798F79',
          light: '#EBF0EB',
          dark: '#5D7A5D',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
