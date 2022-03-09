"use strict";
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./js/script.js",
  },
  devtool: "source-map",
  watch: true,

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  debug: true,
                  corejs: "3.21.1",
                  useBuiltIns: "usage",
                },
              ],
            ],
          },
        },
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/js"),
    clean: true,
  },
};
