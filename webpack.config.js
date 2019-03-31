const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/index.js',
    chart: './src/js/chart.js',
    reviewapps: './src/js/reviewapps.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8081,
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      title: 'MadeOfPaper',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/html/chart.html',
      title: 'MOP - Chart Builder',
      inject: true,
      chunks: ['chart'],
      filename: 'chart.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/html/reviewapps.html',
      title: 'Review Apps',
      inject: true,
      chunks: ['reviewapps'],
      filename: 'reviewapps.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};
