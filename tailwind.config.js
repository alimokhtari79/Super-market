module.exports = {
	content: ['./src/**/*.{html,js}'],
	theme: {
		extend: {
			Keyframes: {
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'rotate-img': {
					'0%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(-90deg)' },
					'50%': { transform: 'rotate(-180deg)' },
					'75%': { transform: 'rotate(-270deg)' },
					'100%': { transform: 'rotate(-360deg)' },
				},
			},
			animation: {
				'spin-slow': 'spin 13s linear infinite',
				'rotate-img': 'rotate 13s linear infinite',
			},
		},
		fontFamily: {
			Lato: ['Lato', 'sans-serif'],
		},
	},
	plugins: [],
};
