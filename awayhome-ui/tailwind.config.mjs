// tailwind.config.mjs
import withMT from '@material-tailwind/react/utils/withMT.js';

const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-text': '#000000',
        'light-text': '#FFFFFF',
        'light-gray': '#FAFAFA',
        'bright-teal': '#87DDD0',
        'dark-green': '#509173',
        'mid-gray': '#D9D9D9',
        'turquoise': '#0097B2',
        'primary-green': '#61988E',
        'primary-blue': '#374273',
        'dark-gray': '#BDBDBD',
        'light-gray-2': '#EEEEEE',
        'dark-blue': '#0E1949',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        serif: ['Open Sans', 'Georgia', 'serif'],
        sumana: ['Sumana', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 4s infinite',
      },
    },
  },
  plugins: [],
};

export default withMT(config);
