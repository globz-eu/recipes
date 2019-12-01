// eslint-disable-next-line import/no-commonjs
module.exports = {
  presets: [
    ["@babel/preset-env", {
      targets: { chrome: "76" },
      useBuiltIns: "usage",
      corejs: 3,
      modules: false
    }],
    "@babel/preset-react"
  ],
  env: {
    test: {
      plugins: ["transform-es2015-modules-commonjs"]
    }
  }
}
