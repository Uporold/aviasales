const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");

const config = {
  mode: "development",
  devtool: "inline-source-map",

  devServer: {
    static: path.join(__dirname, "../build"),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
};

module.exports = merge(baseConfig, config);
