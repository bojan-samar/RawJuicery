/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,liquid}",
    "./layout/**/*.{html,js,liquid}",
    "./sections/**/*.{html,js,liquid}",
    "./snippets/**/*.{html,js,liquid}",
    "./templates/**/*.{html,js,liquid}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#313e25",
          light: "#213e15"
        },
      },
    },
  },
  plugins: [],
}
