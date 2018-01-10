const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './dev/js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist/js'),
    publicPath: "/js/",
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
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
        test: /\.(otf|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loaders: ['url-loader']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'NODE_HA': JSON.stringify('haha'),
      }
    }),
  ]
};
