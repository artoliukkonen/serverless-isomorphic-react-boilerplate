/* eslint-disable */

const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = require('./webpack.base.config.js');
const path = require('path');

// add hashes into filenames
config.output.filename = 'public/[chunkhash].[name].js';

// ensure we are production mode (for react etc)
config.plugins.push(
  new Webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    }
  })
);

// images now get hashed
config.module.rules.push({
  test: /\.(png|svg|ico)$/,
  loader: 'file-loader?name=public/[hash].[name].[ext]',
});

config.plugins.push(
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/client/templates/manifest.json'),
    filename: 'public/static-low-cache/manifest.json',
    inject: false,
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/client/templates/browserconfig.xml'),
    filename: 'public/static-low-cache/browserconfig.xml',
    inject: false,
  })
);

// minify the code
config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
  compress: {
    drop_console: true,
  },
}));
config.plugins.push(new CleanWebpackPlugin(['build'], {
  root: process.cwd(),
}));
config.plugins.push(new Webpack.optimize.AggressiveMergingPlugin()); // Merge chunks

config.devtool = 'source-map';

config.plugins.push(
  new Webpack.LoaderOptionsPlugin({
    debug: true,
  })
);

config.plugins.push(
  new Webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function(module) {
      return module.context && module.context.includes('node_modules');
    }
  })
);

config.plugins.push(
  new Webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  })
);

// config.plugins.push(
//   new BundleAnalyzerPlugin({
//     analyzerMode: 'static'
//   })
// );

module.exports = config;
