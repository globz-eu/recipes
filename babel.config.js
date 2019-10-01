module.exports = {
  presets: [
    ["@babel/preset-env", {
      targets: { chrome: "76" },
      useBuiltIns: "usage",
      corejs: 3,
      modules: false
    }],
    "@babel/preset-react"
  ]
}
