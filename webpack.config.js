const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
      index: "./src/index.js",
      search: "./src/search/search.js"
    },
    mode: "development",
    output: {
      path: path.join(__dirname, "dist"),
      // publicPath: "./" 会给引入的文件前面加个前缀，主要是用于生产环境
      filename: "[name].js"
    },
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
            test: /.(png|jpg|gif|jpeg)$/,
            use: [
              {
                loader: "file-loader"
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
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `./src/index.html`),
        filename: "index.html",
        chunks: ["index","commons"],
        inject: true
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `./src/index.html`),
        filename: "search.html",
        chunks: ["search","commons"],
        inject: true
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css"
      }),
      new CleanWebpackPlugin()
    ],
    devServer: {
      hot: true
    },
    optimization: {
      splitChunks: {
        minSize: 0,
        cacheGroups: {
          common: {
            name: "commons",
            chunks: "all",
            minChunks: 2, // 引用大于两次就独立打包出来
            priority: 10
          }
        }
      }
    }
}