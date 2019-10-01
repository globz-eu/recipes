/* eslint-disable import/no-commonjs */
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (env = {}) => ({
  mode: env.production ? "production" : "development",
  devtool: env.production ? "source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", {
                targets: { chrome: "76" },
                useBuiltIns: "usage",
                corejs: 3,
                modules: false
              }],
              "@babel/preset-react"
            ],
            plugins: ["@babel/plugin-proposal-object-rest-spread"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "src/index.html" })
  ]
})
