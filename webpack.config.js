const webpack = require('webpack');
const path = require('path');

const WSPORT = 8008;
const PORT = 4001;

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
    extensions: ['.js', '.jsx', '.tsx'],
  },
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [],
};
