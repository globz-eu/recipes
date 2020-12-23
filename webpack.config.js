/* eslint-disable import/no-commonjs */
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = env => ({
  entry: "./src/index.js",
  mode: env.development ? "development" : "production",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: "./dist",
  },
  devtool: env.development ? "eval-source-map" : false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: path.resolve(__dirname, "src"),
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Recipes",
      template: "src/index.html"
    }),
    env.development ? new CopyPlugin({ patterns: [{ from: "public", to: "" }] }) : () => {}
  ],
})
