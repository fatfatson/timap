module.exports = {
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true
		},
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': [1, { allow: ['warn', 'error', 'log'] }],
		'no-unused-vars': [0],
		'react/prop-types': [0]
	},
	env: {
		es6: true,
		browser: true,
		mocha: true,
		amd: true
	},
	globals: {
		module: false
	}
};
