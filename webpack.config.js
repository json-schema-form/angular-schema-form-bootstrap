/* global __dirname */
var webpack = require('webpack');
var path = require('path');
var pjson = require('./package.json');
console.log('Angular Schema Form Bootstrap v' + pjson.version);

module.exports = {
  entry: './src/module.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'angular-schema-form-bootstrap.js',
    libraryTarget: 'umd'
  },
  resolve: { extensions: [ '', '.js', '.html' ] },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [ path.join(__dirname, 'src') ],
        loader: 'babel',
      },
      { test: /\.html$/, loader: "ng-cache?prefix=decorators/bootstrap" }
    ]
  },
  externals: {
    'angular': 'var angular',
    'tv4': 'var tv4',
  },
  plugins: [
    new webpack.BannerPlugin(
      'angular-schema-form-bootstrap\n' +
      '@version ' +
      pjson.version + '\n' +
      '@link https://github.com/json-schema-form/angular-schema-form-bootstrap\n' +
      '@license MIT\n' +
      'Copyright (c) 2016 JSON Schema Form')
  ]
};
