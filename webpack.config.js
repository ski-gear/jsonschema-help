const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
	entry: ["./src/index.tsx"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	node: {
		fs: 'empty',
		tls: 'empty',
		net: 'empty'
	},
	resolve: {
		extensions: ["*", ".ts", ".tsx", ".js"]
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: 'assets/**/*', to: '' },
			{ from: 'index.html', to: '' },
			{
				from: 'node_modules/monaco-editor/min/vs',
				to: 'vs',
			}
		])
	],
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/
			}
		]
	}
};

module.exports = config;
