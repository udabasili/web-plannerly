/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./features/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				header: ['var(--header)', ...fontFamily.sans],
				paragraph: ['var(--paragraph)', ...fontFamily.sans],
			},
			colors: {
				primaryDark: 'var(--primary-dark)',
				secondary: 'var(--secondary)',
				primaryLight: 'var(--primary-light)',
				primary: 'var(--primary)',
				background: 'var(--background)',
			},
			screens: {
				desktop: { min: '1800px' },
				tabLand: { max: '1200px' },
				tabPort: { max: '900px' },
				mobile: { max: '600px' },
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
