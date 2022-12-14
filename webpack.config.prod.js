const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const { builtinModules } = require('module');

module.exports = {
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			title: 'wasted potential',
			metaDesc: 'just a weird interactive anagram swapping thingy',
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body',
			minify: false,
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: 'src/assets', to: 'assets' }],
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(js)$/,
				loader: 'string-replace-loader',
				options: {
					multiple: [
						{ search: '__ROOT_URL__', replace: '' },
						{ search: '__CLICKTHRU_URL__', replace: 'archives' },
					],
					flags: 'g',
				},
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					keep_classnames: true,
				},
			}),
		],
	},
	mode: 'production',
	output: {
		clean: true,
		filename: 'main.js',
		path: path.resolve(__dirname, 'www'),
	},
	devServer: {
		static: './www',
		open: true,
		devMiddleware: {
			writeToDisk: true,
		},
	},
};
