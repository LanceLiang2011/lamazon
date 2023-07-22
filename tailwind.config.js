/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#777cf9",

          secondary: "#a210ce",

          accent: "#db7281",

          neutral: "#202537",

          "base-100": "#ebecf4",

          info: "#496fd0",

          success: "#3fd9c2",

          warning: "#eda65a",

          error: "#fc3b65",
          body: {
            "background-color": "#e3e6e6",
          },
        },
      },
    ],
  },
};
