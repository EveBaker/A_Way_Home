const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    // Adjust based on your directory structure
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-text': '#000000',
        'light-text': '#FFFFFF',
        'background-light': '#FAFAFA',
        'primary': '#87DDD0',
        'secondary': '#509173',
        'gray-light': '#D9D9D9',
        'blue-main': '#0097B2',
        'secondary-main': '#61988E',
        'page-bg-primary': '#374273',
        'gray-dark': '#BDBDBD',
        'gray-light-2': '#EEEEEE',
      },
      fontFamily: {
        sumana: ['Sumana', 'serif'],
      },
    },
  },
  plugins: [],
});
