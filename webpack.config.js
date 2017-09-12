const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const srcPath = `./src/assets`;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
	filename: "[name].css"
});

const config = [{
	entry: {
		main: `${srcPath}/css/main.scss`
	},
	output: {
		path: path.resolve(__dirname, 'public/css'),
		filename: '[name].css'
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: extractSass.extract({
				use: [{
					loader: "css-loader?-minimize",
					options: {
					minimize: true || {/* CSSNano Options */}
				}
			},{
                  loader: 'postcss-loader', // Run post css actions
                  options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                    	return [
                    	require('precss'),
                    	require('autoprefixer')
                    	];
                    }
                  }
                }, {
                	loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
              })
		}]
	},
	plugins: [
	extractSass
	]
}, {
	entry: {
		main: `${srcPath}/js/main.js`,
	},
	output: {
		path: path.resolve(__dirname, 'public/js'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'stage-0'],
					plugins: ['transform-runtime'],
					babelrc: false
				}
			}
		}]
	},
	plugins: [
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1,
	}),
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery',
	}),
	new webpack.optimize.UglifyJsPlugin(),
	],
}];

module.exports = config;