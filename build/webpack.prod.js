const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

function resolvePath(dir) {
  return path.join(__dirname, '..', dir)
}

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})]
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin()
  ]
}

module.exports = merge(commonConfig, prodConfig)
