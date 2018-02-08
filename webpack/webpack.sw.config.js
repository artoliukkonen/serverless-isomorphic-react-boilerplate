/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const Webpack = require('webpack');

const testMatch = /\.jsx?$/;
const excludeMatch = /node_modules/;

const settings = {
  entry: {
    app: path.resolve(__dirname, 'sw.js'),
  },
  output: {
    path: path.resolve(__dirname, '../build/static-low-cache'),
    publicPath: '/',
    filename: 'sw.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: testMatch,
        exclude: excludeMatch,
        loader: 'eslint-loader',
      }
    ]
  },
  plugins: [
    // ensure we are production mode
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};

module.exports = settings;
