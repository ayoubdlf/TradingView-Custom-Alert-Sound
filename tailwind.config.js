/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    presets: [
		require("./src/ui/tailwind.config")
	]
}

