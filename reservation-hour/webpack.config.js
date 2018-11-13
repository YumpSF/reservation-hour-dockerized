const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: ['@babel/polyfill', path.join(__dirname, '/client/index.jsx')],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public/dist'),
  },
  plugins: [
    new CompressionPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  devtool: 'cheat-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
