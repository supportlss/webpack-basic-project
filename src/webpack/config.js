const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: {
        index: "./src/index.js"
    },
    mode: "",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },

    module: {
        rules: [{
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                use: "babel-loader"
            },
            {
                test: /.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: "file-loader"
                }]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: "file-loader"
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, `./src/index.html`),
            filename: "index.html",
            chunks: ["index"],
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        hot: true
    }
}