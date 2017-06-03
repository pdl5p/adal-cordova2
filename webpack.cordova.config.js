const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    path.resolve('src/indexcordova.js'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader?babelrc=false&extends=' + path.resolve(__dirname, '.babelrc'),
        exclude: path.resolve(__dirname, 'node_modules/')
      },
      { test: /\.tsx?$/, include: /src/, use: 'babel-loader' },
      { test: /\.tsx?$/, include: /src/, use: 'awesome-typescript-loader?silent=true' },
      { test: /\.less/, include: /src/, use: ['style-loader', 'css-loader', 'less-loader'] }
    ],
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
  },
  plugins: [
  ],
  resolveLoader: {
    modules: [
      'node_modules',
    ],
  },
}
