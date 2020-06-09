const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search/search.js"
 },
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist")
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