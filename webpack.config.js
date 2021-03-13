const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const path = require("path")
const webpack = require("webpack")
const exclude = [/node_modules/, /dist/]

module.exports = [
  {
    target: "electron-renderer",
    entry: "./renderer",
    mode: "production",
    node: {__dirname: false},
    output: {filename: "renderer.js", path: path.resolve(__dirname, "./dist"), publicPath: "./"},
    resolve: {extensions: [".js", ".jsx", ".ts", ".tsx"], mainFields: ["main", "module", "browser"], alias: {"react-dom$": "react-dom/profiling", "scheduler/tracing": "scheduler/tracing-profiling"}},
    optimization: {minimize: true, minimizer: [new TerserJSPlugin({extractComments: false})], moduleIds: "named"},
    module: {
      rules: [
        {test: /\.(jpe?g|png|gif|svg|mp3|wav|mp4|yml|txt)$/, exclude, use: [{loader: "file-loader", options: {name: "[path][name].[ext]"}}]},
        {test: /\.html$/, exclude, use: [{loader: "html-loader", options: {minimize: false}}]},
        {test: /\.css$/, use: [{loader: MiniCssExtractPlugin.loader}, "css-loader"]},
        {test: /\.(tsx?|jsx?)$/, exclude, use: [{loader: "ts-loader", options: {transpileOnly: true}}]}
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({template: path.resolve(__dirname, "./index.html"), minify: true}),
      new MiniCssExtractPlugin({filename: "styles.css", chunkFilename: "styles.css"})
    ]
  },
  {
    target: "electron-main",
    entry: "./main",
    mode: "production",
    node: {__dirname: false},
    output: {filename: "main.js", path: path.resolve(__dirname, "./dist")},
    resolve: {extensions: [".js", ".jsx", ".ts", ".tsx"], alias: {"react-dom$": "react-dom/profiling", "scheduler/tracing": "scheduler/tracing-profiling"}},
    optimization: {minimize: true, minimizer: [new TerserJSPlugin({extractComments: false})], moduleIds: "named"},
    module: {
      rules: [
          {test: /\.(tsx?|jsx?)$/, exclude, use: [{loader: "ts-loader", options: {transpileOnly: true}}]}
      ]
    }
  }
]