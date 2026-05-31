// カラーは theme/palette.cjs（単一の真実）を require して流し込む。
const palette = require('./theme/palette.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // ネストキーは bg-catHoiku-bg / text-catHoiku-tx のように展開される。
      colors: palette,
      borderRadius: {
        card: '16px',
        pill: '9999px',
      },
      fontSize: {
        tag: '12px',
        body: '16px',
        headingSm: '18px',
        heading: '20px',
        headingLg: '22px',
      },
      minWidth: { touch: '48px' },
      minHeight: { touch: '48px' },
    },
  },
  plugins: [],
};
