/** @type {import('tailwindcss').Config} */
export default {
    content : [
        "./index.html", "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme : {
        extend: {
            colors: {
                primary: {
                    500: '#008080',
                    600: '#007D7D',
                    300: '#8DA3A3'
                },
                secondary: {
                    500: '#FFFFFF'
                },
                accent: {
                    500: '#FF7F50'
                },
                text: {
                    500: '#8D8D8D'
                },
                customGray: '#444444'
            },
            fontFamily: {
                rounded: ['"Arial Rounded MT Bold"', 'sans-serif']
            },
            fontSize: {
                'h1': '64px',
                'h2': '48px',
                'h3': '36px',
                'h4': '30px',
                'h5': '24px',
                'h6': '20px',
                'paragraph': '18px'
            },
            backgroundImage: theme => ({'primary-gradient': `linear-gradient(90deg, ${theme('colors.primary.500')} 0%, ${theme('colors.primary.600')} 50%, ${theme('colors.primary.300')} 100%)`}),
            backgroundColor: theme => ({'default': theme('colors.customGray')})
        }
    },
    plugins : []
};
