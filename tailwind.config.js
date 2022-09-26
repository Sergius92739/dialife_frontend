/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                'success': '#58A9A5',
                'danger': '#fc5c65'
            },
            animation: {
                ring: "ring 1.5s linear infinite",
                text: "text 2s ease-in-out infinite",
            },
            keyframes: {
                ring: {
                    "0%": {transform: "rotate(0deg)", boxShadow: "1px 5px 2px #e65c00"},
                    "50%": {
                        transform: "rotate(180deg)",
                        boxShadow: "1px 5px 2px #18b201",
                    },
                    "100%": {
                        transform: "rotate(360deg)",
                        boxShadow: "1px 5px 2px #0456c8",
                    },
                },
                text: {
                    "50%": {color: "#000"},
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        plugin(function ({addComponents}) {
            addComponents({
                '.popup.open': {
                    opacity: '1',
                    visibility: 'visible'
                },
                '.popup.open .popup_content': {
                    transform: 'perspective(600px) translate(0) rotateX(0deg)'
                },
                '.popup': {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                    zIndex: '12',
                    backgroundColor: 'rgba(0,0,0,.8)',
                    opacity: '0',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    transition: 'all .8s ease 0s',
                    visibility: 'hidden',
                },
                '.popup_body': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh'
                },

                '.popup_content': {
                    padding: '1.25rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.25rem',
                    transform: 'perspective(600px) translateY(-100%) rotateX(45deg)',
                    transition: 'all .8s ease 0s'
                },
            })
        })
    ],
};
