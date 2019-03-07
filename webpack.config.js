 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const webpack = require('webpack');

 module.exports = {
   mode: 'development',
   entry: {
     index: './src/js/index.js',
     app: './src/js/app.js'
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
       title: 'MadeOfPaper',
       template: './src/html/index.html',
       inject: true,
       chunks: ['index'],
       filename: 'index.html'
     }),
     new HtmlWebpackPlugin({
       inject: true,
       chunks: ['app'],
       filename: 'app.html'
     }),
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
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       }
     ]
   }
 };
