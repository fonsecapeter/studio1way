// shared config (dev and prod)
const webpack = require("webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".x"],
  },
  context: "/app/frontend",
  entry: [
    "./src/index.tsx",
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader", "source-map-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i, // images
        use: ['file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]'],
      },
      {
        test: /\.(ttf)$/i, // fonts
        use: ["file-loader?hash=sha512&digest=hex&name=fonts/[hash].[ext]"],
      },
    ],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.EnvironmentPlugin(["API_URL"]),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/assets/img/favicon.ico",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/assets/img", to: "img"},
      ]
    })
  ],

  output: {
    filename: "js/[name].[contenthash].bundle.min.js",
    chunkFilename: "js/[name].[contenthash].bundle.min.js",
    path: "/app/src/main/resources/static",
    publicPath: "/",
  },
  optimization: {
    chunkIds: "named",
    moduleIds: "named",
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: "source-map",
};
