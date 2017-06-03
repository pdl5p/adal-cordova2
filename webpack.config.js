const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.resolve('src/index.js'),
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
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolveLoader: {
    modules: [
      'node_modules',
    ],
  },
}
