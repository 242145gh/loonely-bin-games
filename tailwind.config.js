/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
      colors: {
        neutral: {
          white: '#ffffff',
          n1: '#f6f6f6',
          n2: '#f1f1f1',
          n3: '#e5e5e5',
          n4: '#d7d7d7',
          n5: '#c2c2c2',
          n6: '#adadad',
          n7: '#939393',
          n8: '#797979',
          n9: '#6e6e6e',
          n10: '#3f3f3f',
          n11: '#292929',
          n12: '#141414',
          n13: '#111111',
          black: '#000000',
        },
        plum: {
          p1: '#f4e9f1',
          p2: '#e3d0df',
          p3: '#d7b3cf',
          p4: '#8d2676',
          p5: '#711e5e',
          p6: '#47133b',
        },
        yellow: {
          y1: '#fdefd2',
          y2: '#f8d077',
          y3: '#f3b01c',
          y4: '#e7a71b',
        },
        red: {
          r1: '#fcd6d5',
          r2: '#f15d59',
          r3: '#ee342f',
          r4: '#d62f2a',
        },
        green: {
          g1: '#e5f3dc',
          g2: '#72c043',
          g3: '#4fb014',
          g4: '#479e12',
        },
        accent: {
          a1: '#07bfe8',
          a2: '#074ee8',
          a3: '#7651e0',
          a4: '#ee9f73',
        },
        transparent: 'transparent',
        discord: '#5865f2',
      },
      fontFamily: {
        display:
          '"Roboto Flex", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        body: '"Inter", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        mono: 'monospace',
      },
      fontSize: {
        xs: '0.6875rem', // 11px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '2.375rem', // 38px
        '3xl': '2.5rem', // 40px
        '4xl': '2.625rem', // 42px
        '5xl': '2.875rem', // 46px
        '6xl': '3.125rem', // 50px
        '7xl': '3.5rem', // 56px
        '8xl': '3.75rem', // 60px
      },
    },
    
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  
  
  plugins: [
    ({ addUtilities }) => {
      /* Intended for use with the Roboto Flex variable font. */
      addUtilities({
        '.stretch-min': {
          fontStretch: '25%',
        },
        '.stretch-thin': {
          fontStretch: '75%',
        },
        '.stretch-default': {
          fontStretch: '100%',
        },
        '.stretch-wide': {
          fontStretch: '125%',
        },
        '.stretch-max': {
          fontStretch: '150%',
        },
      });
    },
  
    require("tailwindcss-animate"),
  ],
}