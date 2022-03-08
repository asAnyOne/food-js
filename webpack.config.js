"use strict";
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./js/script.js",
  },
  devtool: "source-map",
  watch: true,

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/js"),
    clean: true,
  },
};
