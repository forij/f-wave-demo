const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	entry: './src/ts/index.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(glsl|vert|frag)$/,
				use: 'ts-shader-loader'
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'F wave demo',
			template: path.resolve(__dirname, './src/index.html')
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins: [
			new TsconfigPathsPlugin({
				configFile: path.resolve(__dirname, './tsconfig.json')
			}),
		],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};