/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'nithish-saffron': '#FF9933',
                'nithish-orange': '#FF6600',
                'nithish-gold': '#FFD700',
                'nithish-maroon': '#800000',
                'nithish-cream': '#FFFDD0',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            backgroundImage: {
                'diwali-gradient': 'linear-gradient(to right, #FF9933, #FF6600, #800000)',
            }
        },
    },
    plugins: [],
}
