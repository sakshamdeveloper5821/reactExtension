const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssFilename = 'static/css/styles.css';

module.exports = {
  resolve: {
    modules: [
      path.resolve('./app'),
      path.resolve('./node_modules')
    ]
  },
  // Tell webpack to start bundling our app at app/index.js
  entry: __dirname + '/app/index.js',
  // Output our app to the build/ directory
  output: {
    filename: 'static/js/bundle.js',
    path: __dirname + "/build"
  },
  // Emit source maps so we can debug our code in the browser
  devtool: 'source-map',
  // Tell webpack to run our source code through Babel
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include : path.join(__dirname, 'app/static/images'),
        loader  : 'url-loader?limit=30000&name=static/images/[name].[ext]'
      },
      {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader']
    },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          {fallback: {loader:"style-loader"} , 
                use: {loader: "css-loader",options: {minimize: true}}} 
        )
      }

    ]
  },
  // Since Webpack only understands JavaScript, we need to
  // add a plugin to tell it how to handle html files.
  plugins: [
    // Configure HtmlPlugin to use our own index.html file
    // as a template.
    // Check out https://github.com/jantimon/html-webpack-plugin
    // for the full list of options.
    new HtmlPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
     new CopyWebpackPlugin([
            { from: 'app/static/js', to: 'static/js'},
            { from: 'app/static/images', to: 'static/images'},
            { from: 'app/manifest.json'}
    ]),
     new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true,
      }
    }),
     // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: cssFilename,
    })
  ]
}