const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcFolder = path.resolve(__dirname, 'src');
const buildFolder = path.resolve(__dirname, 'build');

module.exports = (env, argv) => {
  let mode = 'development';
  if (argv.mode === 'production') {
    mode = 'production';
  }
  return {
    mode,
    entry: path.join(srcFolder, 'app.js'),
    output: {
      path: buildFolder,
      filename: 'script/[name].[contenthash].js',
      assetModuleFilename: 'images/[name].[contenthash][ext]',
      clean: true
    },
    devtool: 'source-map',
    devServer: {
      port: process.env.PORT || 9000,
      watchFiles: srcFolder
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i
        }),
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(srcFolder, 'pages/index.pug'),
        filename: 'index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(srcFolder, 'fonts'),
            to: 'fonts/'
          },
        ]
      }),
      new MiniCssExtractPlugin({
        filename: './styles/[name].[contenthash].css'
      }),
    ],
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'html-loader'
            },
            {
              loader: 'pug-html-loader'
            },
          ]
        },
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          use: ['babel-loader',]
        },
        {
          test: /\.(pcss|css)$/i,
          use: [
            mode === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, 'postcss.config.js')
                }
              }
            },
          ]
        },
      ]
    }
  };
};
