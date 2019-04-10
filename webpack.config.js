const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

require("babel-core/register");
require("babel-polyfill");

const PAGES_PATH = './src/pages';

function generateHtmlPlugins(items) {
  return items.map( (name) => new HtmlPlugin(
    {
      title: 'Easy Clipboard',
      filename: `./${name}.html`,
      chunks: [ name ],
    }
  ))
}

module.exports = {
  entry: {
    background: [
      'babel-polyfill',
      `${PAGES_PATH}/background/background.ts`,
    ],
    popup: [
      'babel-polyfill',
      `${PAGES_PATH}/popup/index.tsx`,
    ],
    options: [
      'babel-polyfill',
      `${PAGES_PATH}/options/index.tsx`,
    ]
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve('dist/pages'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css' ]
  },
  plugins: [
    new ExtractTextPlugin(
      {
        filename: '[name].[contenthash].css',
      }
    ),
    new CopyPlugin(
      [
        {
          from: 'src',
          to: path.resolve('dist'),
          ignore: [ 'pages/**/*', 'pages/redux' ]
        }
      ]
    ),
    ...generateHtmlPlugins(
      [
        'background',
        'popup',
        'options'
      ]
    )
  ]
}
