const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search/search.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    // publicPath: "./webpack/", //会给引入的文件前面加个前缀，主要是用于生产环境
    filename: "[name][hash:8].js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: "babel-loader"
      },
      {
        test: /.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, `./src/index.html`),
    //   filename: "index.html",
    //   chunks: ["index", "commons"],
    //   inject: true
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, `./src/index.html`),
    //   filename: "search.html",
    //   chunks: ["search", "commons"],
    //   inject: true
    // }),
    new MiniCssExtractPlugin({
      filename: "[name][hash:8].css"
    }),
    new CopyWebpackPlugin(
        [
          {
            // copy images files
            from: `./src/images/`,
            to: './img/[name]_[hash:8].[ext]'
          }
        ],
        {
          context: process.cwd()
        }
    ),
    new CleanWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        common: {
          name: "commons",
          chunks: "all",
          // minChunks: 2, // 引用大于两次就独立打包出来
          priority: 10
        }
      }
    }
  },
  devServer: {
    hot: true
  }
};
