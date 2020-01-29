const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcss_prefix_selector = require("postcss-prefix-selector");

module.exports = {
  entry: {
    main: './src/index.tsx'
  },
  output: {
    path: path.join(__dirname, 'dist/h/'),
    filename: '[name].bundle.js',
  },
  watch: true,
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist/'),
    port: 2222
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /.tsx?$/, use: ['awesome-typescript-loader'] },
      { test: /.html$/, use: 'raw-loader' },
      { test:/\.(s*)css$/, use:['style-loader','css-loader', 'sass-loader'   , {
        loader: "postcss-loader",
        options: {
          plugins: () => [
            postcss_prefix_selector({
              prefix: "#questionnaireRoot",
              exclude: [
                "&:after",
                "&:before",
                "&::after",
                "&::before",
                "&:nth-of-type",
                "&:first-of-type",
                "&:disabled",
                "&:empty",
                "&::placeholder",
                "&:focus",
                "&::-ms-input-placeholder",
                "&:hover"
              ]
            })
          ]
        }
      }] },
      { test: /\.woff(\?.+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?.+)?$/, use: 'file-loader' },
      { test: /\.eot(\?.+)?$/, use: 'file-loader' },
      { test: /\.svg(\?.+)?$/, use: 'svg-inline-loader' },
      { test: /\.png$/, use: 'url-loader?mimetype=image/png' },
      { test: /\.gif$/, use: 'url-loader?mimetype=image/gif' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,
      query: {
          presets: ["@babel/env", "@babel/react"]
      } }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      showErrors: true,
      title: 'React-TS-Webpack App',
      path: path.join(__dirname, '../dist/'),
      hash: true
    })
  ]

}