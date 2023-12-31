/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"gradient-primary-background":
					"linear-gradient(to right bottom, #2c004418, #41006949, #2f004d23)",
				"gradient-secondary-background":
					"linear-gradient(to right bottom, #2c004400, #41006925, #2f004d0e)",
				"gradient-primary-blue":
					"linear-gradient(to right bottom, hsla(207, 100%, 13%, 0.094), hsla(207, 100%, 21%, 0.286), hsla(207, 100%, 15%, 0.137));",
			},
			borderColor: {
				custompurple: "#8300cf",
				customblue: "#0073d1",
			},
			colors: {
				appella: {
					primary: {
						400: "#bc0bf7",
					},
					secondary: {
						100: "#2c1b63",
						200: "#1d144d",
						300: "#110642",
						700: "#040035",
					},
				},
			},
		},
	},
	safelist: [
		"absolute",
		"hidden",
		"origin-left",
		"origin-top",
		"grid-rows-1",
		"grid-cols-1",
		"grid-rows-2",
		"grid-cols-2",
		"grid-rows-3",
		"grid-cols-3",
		"grid-rows-4",
		"grid-cols-4",
		"grid-rows-5",
		"grid-cols-5",
		"grid-rows-6",
		"grid-cols-6",
	],
	plugins: [],
};
