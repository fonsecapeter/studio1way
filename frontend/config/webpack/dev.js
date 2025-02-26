// development config
const { merge } = require("webpack-merge");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: "/app/src/main/resources/static",
    },
    compress: true,
    port: 8080,
    proxy: [
      {
        context: '**',
        target: 'http://web:8081',
        secure: false,
        prependPath: false,
        headers: {
          'X-Devserver': '1',
        }
      }
    ]
  },
});
