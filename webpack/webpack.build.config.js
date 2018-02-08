const path = require('path');
const Webpack = require('webpack');

const testMatch = /\.jsx?$/;
const excludeMatch = /node_modules/;

const settings = {
  entry: {
    app: path.resolve(__dirname, '../src/server.jsx')
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'commonjs-module'
  },
  resolve: {
    alias: {
      'scss': path.resolve(__dirname, '../src/scss'),
      'react': path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: testMatch,
        exclude: excludeMatch,
        loader: 'eslint-loader'
      },
      {
        test: testMatch,
        exclude: excludeMatch,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  plugins: [
    // ensure we are production mode (for react etc)
    new Webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ]
};

module.exports = settings;
