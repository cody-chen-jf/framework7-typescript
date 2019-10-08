const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const path = require('path')

function resolvePath(dir) {
  return path.join(__dirname, '..', dir)
}

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [resolvePath('src/css/function.scss')]
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  }
}

module.exports = merge(commonConfig, devConfig)
