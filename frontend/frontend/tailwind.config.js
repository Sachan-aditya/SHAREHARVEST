/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       "milk-white": "#F9F9F0",
        "primary-green": "#4A7048",
        "leaf-green": "#A9CBA4",
        "soil-brown": "#8B5A2B",
        "harvest-gold": "#F4D35E",
        "light-yellow": "#FFF9C4",
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-bg': "url('https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMjYxOTYwfHxlbnwwfHx8fHw%3D')",
        'food-bg': "url('https://images.unsplash.com/photo-1633368475182-7c4773552630?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      },
    },
 
  plugins: [require('@tailwindcss/forms')],
}
}