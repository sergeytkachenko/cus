const path = require('path');

module.exports = {
	entry: './src/index.ts',
	mode: 'production',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'awesome-typescript-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js", ".tsx", ".jsx"]
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'CssFinder',
		libraryTarget: 'commonjs2'
	}
};
