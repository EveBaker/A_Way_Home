const withMT = require("@material-tailwind/react/utils/withMT");

const config = {
  content: [
    // Adjust based on your directory structure
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
      },
      fontFamily: {
        sumana: ['Sumana', 'serif'],
      },
    },
  },
  plugins: [],
}

module.exports = withMT(config);
