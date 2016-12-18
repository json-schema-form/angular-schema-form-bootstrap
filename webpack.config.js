/* global __dirname */
//const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const getPath = (pathToFile) => path.resolve(__dirname, pathToFile);
const pjson = require('./package.json');
console.log('Angular Schema Form Bootstrap v' + pjson.version);

module.exports = {
  entry: {
    'angular-schema-form-bootstrap': [ 'angular-schema-form', getPath('./src/module.js') ],
    'angular-schema-form-bootstrap-bundled': [ 'angular-schema-form', getPath('./src/module-bundled.js') ],
  },
  output: {
    path: getPath('./dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  resolve: {
    modulesDirectories: [
      path.join(__dirname, "..", "angular-schema-form", "dist"),
      path.join(__dirname, "src"),
      path.join(__dirname, "src", "bootstrap"),
      'node_modules',
    ],
    extensions: [ '', '.js', '.html' ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [ path.join(__dirname, 'src') ],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + path.join(__dirname, 'src') + '/!html',
        exclude: /(index)/
      }
    ]
  },
  externals: {
    'angular': 'var angular',
    'tv4': 'var tv4',
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin({}),
    new webpack.optimize.OccurenceOrderPlugin(true),
    // new HtmlWebpackPlugin({
    //   template: 'html!./src/index.html'
    // }),
    new webpack.BannerPlugin(
      'angular-schema-form-bootstrap\n' +
      '@version ' + pjson.version + '\n' +
      '@date ' + buildDate.toUTCString() + '\n' +
      '@link https://github.com/json-schema-form/angular-schema-form-bootstrap\n' +
      '@license MIT\n' +
      'Copyright (c) 2014-' + buildDate.getFullYear() + ' JSON Schema Form')
  ]
};
