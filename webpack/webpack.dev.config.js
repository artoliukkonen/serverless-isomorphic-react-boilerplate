/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable comma-dangle */

const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.base.config.js');
const path = require('path');

// dev filenames
config.output.filename = 'public/[name].js';

// allow dev server
config.devServer = {
  contentBase: path.resolve(__dirname, '.'),
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  historyApiFallback: {
    index: '/',
  },
};

// load images
config.module.rules.push({
  test: /\.(png|svg|ico)$/,
  loader: 'file-loader?name=public/[name].[ext]',
});

// add source maps
config.devtool = 'source-map';

config.plugins.push(
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'index.html'),
    filename: 'index.html',
  })
);

// debug mode
config.plugins.push(
  new Webpack.LoaderOptionsPlugin({
    debug: true,
  })
);

module.exports = config;
