/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Gabarito', 'system-ui', 'sans-serif'],
        gabarito: ['Gabarito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '6xl': '64px',
        '7xl': '72px',
      },
      fontSize: {
        sm: ['0.875rem', '1rem'], // [fontSize, lineHeight]
      },
      colors: {
        yellow: {
          primary: '#FBC50A',
          secondary: '#FBAD0A',
          tertiary: '#FFD32D',
        },
        grayscale: {
          100: '#3C3A3B',
          300: '#858384',
          400: '#ACAAAB',
          500: '#E4DFDF',
          600: '#EDEDED',
          700: '#F8F8F8',
          black: '#101010',
        },
        warmGray: {
          100: '#F8F5F3',
          500: '#F5EAE0',
          700: '#9F948B',
        },
        teal: {
          primary: '#27B9D7',
          secondary: '#00A9CE',
          100: '#87DAE4',
          700: '#0188A9',
        },
        outline: { primary: '#E4DFDF' },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(100px, 1fr))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
