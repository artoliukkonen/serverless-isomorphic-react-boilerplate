/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

const testMatch = /\.jsx?$/;
const excludeMatch = /node_modules/;

const settings = {
  entry: {
    app: [
      path.resolve(__dirname, '../src/client/index.jsx'),
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'public/[name].[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: testMatch,
        exclude: excludeMatch,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
        },
      },
    ],
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'assets-manifest.json',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
};

module.exports = settings;
