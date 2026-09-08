import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#072946',
          50:  '#e8f0f7',
          100: '#c5d8eb',
          200: '#9fbedd',
          300: '#79a4ce',
          400: '#5890c3',
          500: '#3878b8',
          600: '#2a6099',
          700: '#1d4a7a',
          800: '#10345c',
          900: '#072946',
          950: '#041a2e',
        },
        accent: {
          DEFAULT: '#0EA5E9',
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0EA5E9',
          600: '#0284c7',
          700: '#0369a1',
        },
        emeraldTheme: {
          DEFAULT: '#10B981',
          50: '#ecfdf5',
          500: '#10B981',
          600: '#059669',
        },
        indigoTheme: {
          DEFAULT: '#6366F1',
          50: '#eef2ff',
          500: '#6366F1',
          600: '#4f46e5',
        },
        violetTheme: {
          DEFAULT: '#8B5CF6',
          50: '#f5f3ff',
          500: '#8B5CF6',
          600: '#7c3aed',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'slide-right':'slideRight 0.5s ease-out forwards',
        'float':      'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -10%, #c5d8eb33 0%, transparent 70%)',
        'navy-gradient': 'linear-gradient(135deg, #072946 0%, #0d3d63 100%)',
        'accent-gradient': 'linear-gradient(135deg, #0EA5E9 0%, #0284c7 100%)',
      },
      boxShadow: {
        'navy-sm': '0 2px 8px rgba(7,41,70,0.12)',
        'navy-md': '0 4px 20px rgba(7,41,70,0.15)',
        'navy-lg': '0 8px 40px rgba(7,41,70,0.18)',
        'accent':  '0 4px 20px rgba(14,165,233,0.35)',
      },
    },
  },
  plugins: [],
}

export default config
