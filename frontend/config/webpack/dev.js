// development config
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: resolve(__dirname, "../../../src/main/resources/static"),
    },
    compress: true,
    port: 8080,
    proxy: [
      {
        context: '**',
        target: process.env.DEV_PROXY_TARGET || 'http://web:8081',
        secure: false,
        prependPath: false,
        headers: {
          'X-Devserver': '1',
        }
      }
    ]
  },
});
