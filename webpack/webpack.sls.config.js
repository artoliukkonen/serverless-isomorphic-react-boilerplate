/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const slsw = require('serverless-webpack');
const webpack = require('webpack');

const ASSETS_MANIFEST = require('../build/assets-manifest.json');

const testMatch = /\.jsx?$/;
const excludeMatch = /node_modules/;


module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    libraryTarget: 'commonjs-module',
    path: path.resolve(__dirname, 'build-sls/'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/public/[name].[ext]',
              emitFile: false,
            },
          },
        ],
      },
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        ASSETS: JSON.stringify(ASSETS_MANIFEST),
        SERVERLESS: JSON.stringify('true'),
      },
    }),
  ],
};
