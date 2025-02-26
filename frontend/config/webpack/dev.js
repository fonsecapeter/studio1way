// development config
const { merge } = require('webpack-merge');
// const webpack = require('webpack');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: '/app/src/main/resources/static',
    },
    compress: true,
    port: 3000,
  },
});
