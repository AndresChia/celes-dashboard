/** @type {import('tailwindcss').Config} */
import { colors } from './src/theme/colors';
const defaultsColors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      ...defaultsColors,
      ...colors
    }
  },
  plugins: []
};
