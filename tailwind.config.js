module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['sofiapro'],
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    extend: {
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        72: '72px',
      },
      colors: {
        'near-black': '#1d2129',
        'ice-blue': '#f0f4f7',
        'light-orange': '#fff7e8',
        primary: '#4EE69C',
        'light-black': '#565a64',
      },
      borderRadius: {
        l: '8px',
        xl: '16px',
        xxl: '24px',
        xxxl: '36px',
        xxxl2: '42px',
      },
      boxShadow: {
        'xl-light': '0 5px 20px 0 rgba(86, 90, 100, 0.05);',
        'sm-light': '0 2px 3px 0 rgba(86, 90, 100, 0.1);',
      },
      letterSpacing: {
        '1px': '1px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
