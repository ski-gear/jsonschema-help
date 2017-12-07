const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
	entry: ["./src/index.tsx"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	resolve: {
		extensions: ["*", ".ts", ".tsx", ".js"]
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: 'assets/**/*', to: '' },
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
