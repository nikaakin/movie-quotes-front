/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        'helvetica-neue': 'Helvetica Neue',
        'helvetica-georgian': 'Helventica Georgian',
        'helvetica-georgian-roman': 'Helventica Georgian roman',
        'helvetica-georgian-caps-roman': 'Helventica Georgian caps roman',
      },
      backgroundImage: {
        'lg-landing-first':
          'linear-gradient(180deg, #11101A 0%, #08080D 80.52%, rgba(0, 0, 0, 0) 100%)',
        'lg-landing-second':
          'linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%)',
        'lg-landing-third':
          'linear-gradient(180deg, rgba(17, 16, 26, 0.95) 0%, rgba(8, 8, 13, 0.13) 50%, rgba(0, 0, 0, 0) 100%)',
        'lg-landing-fourth':
          'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%)',
        'lg-landing-little-screen':
          'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
        'lg-main':
          'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)',
        'lg-modals':
          'linear-gradient(225deg, #181623 0.07%, #191725 50.66%, #0D0B14 96.88%)',
        'lg-blur':
          'linear-gradient(112.94deg, rgba(239, 239, 239, 0.3) -1.81%, rgba(239, 239, 239, 0.00514528) -102.5%, rgba(1, 1, 1, 0.00260417) -102.51%, rgba(239, 239, 239, 0.05) 102.52%)',
        'image-tranparent': 'transparent',
      },

      boxShadow: {
        input: '0px 0px 0px 4px rgba(13, 110, 253, 0.25)',
      },

      blur: {
        0.75: '3px',
      },
      colors: {
        neutral: {
          450: '#9C9A9A',
          850: '#212529',
          920: '#12101A',
          950: '#11101A',
        },
        zinc: {
          150: '#EFEFEF',
          350: '#D9D9D9',
          650: '#54535A',
          850: '#222030',
          870: '#24222F',
        },
        gray: {
          250: '#E9ECEF',
          330: '#D1E7DD',
          350: '#CED4DA',
          550: '#6C757D',
          950: '#181624',
        },
        red: {
          550: '#DC3545',
          650: '#E31221',
          750: '#CC0E10',
          770: '#B80D0F',
        },
        blue: {
          650: '#0D6EFD',
        },
        orange: {
          250: '#DDCCAA',
        },
        green: {
          750: '#198754',
          950: '#0F5132',
        },
        purple: {
          550: '#9747ff',
        },
        rose: {
          550: '#EC4C57',
        },
      },
      width: {
        68: '17rem',
        87: '21.75rem',
        90: '22.5rem',
        125: '31.25rem',
        175: '43.75rem',
        200: '50rem',
        250: '62.5rem',
      },
      margin: {
        25: '6.25rem',
        105: '26.25rem',
        125: '31.25rem',
      },
      padding: {
        107: '26.75rem',
        200: '50rem',
      },
      height: {
        22: '5.5rem',
        70: '17.5rem',
        107: '26.75rem',
        125: '31.25rem',
        206: '51.5rem',
        300: '75rem',
      },
      minHeight: {
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        22: '5.5rem',
      },
      inset: {
        68: '17rem',
      },
      maxWidth: {
        32: '8rem',
        56: '14rem',
        68: '17rem',
      },
    },
  },
  plugins: [],
};
