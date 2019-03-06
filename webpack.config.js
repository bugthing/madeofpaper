 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const webpack = require('webpack');

 module.exports = {
   mode: 'development',
   entry: {
     app: './src/index.js'
   },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist')
   },
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
     hot: true
   },
   plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'MadeOfPaper'
     }),
     new webpack.HotModuleReplacementPlugin()
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     publicPath: '/'
   }
 };
