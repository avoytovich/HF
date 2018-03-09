const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    './dev/js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist/js'),
    publicPath: "/js/",
    filename: 'bundle.js',
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'dev/js'),
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [ 'react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.(sass|scss)/,
        include: path.join(__dirname, 'dev/sass'),
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loaders: ['url-loader']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin({
      "mangle": {
        "screw_ie8": true
      },
      "compress": {
        "screw_ie8": true,
        "warnings": false
      },
      "sourceMap": false
    })
  ],
};
