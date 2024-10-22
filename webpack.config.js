const webpack = require('webpack');
const path = require('path');

const WSPORT = 8008;
const PORT = 4001;

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE = 'development';

module.exports = {
  entry: {
    app: ['./js/main.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    publicPath: './js/',
    filename: 'bundle.js',
  },
  devServer: {
    port: PORT,
    hot: true,
    liveReload: true,
    watchFiles: ['cli/**/*'],
    server: {
      type: 'https',
      options: {
        key: './key.pem',
        cert: './cert.pem',
        ca: './cert.pem',
      },
    },
    static: {
      directory: path.resolve(__dirname),
      watch: true,
    },
    proxy: [
      {
        context: ['/wss'],
        target: `wss://localhost:${WSPORT}`,
        ws: true,
        secure: false,
        logLevel: 'debug',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.scss'],
  },
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'style-loader',
          //   // loader: MiniCssExtractPlugin.loader,
          //   // MODE == 'development'
          //   //   ? 'style-loader'
          //   //   : MiniCssExtractPlugin.loader,
          // },
          // { loader: MiniCssExtractPlugin.loader },
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              api: 'modern-compiler',
            },
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [],
};
