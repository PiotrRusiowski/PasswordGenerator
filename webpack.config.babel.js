import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import LiveReloadPlugin from "webpack-livereload-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ProvidePlugin } from "webpack";

export default {
  entry: {
    app1: path.join(__dirname, "./src/app1.js"),
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  // sekcja plugins
  plugins: [
    new ProvidePlugin({
      process: "process/browser",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "INDEX",
      template: path.join(__dirname, "src/index.html"),
      chunks: ["app1"],
    }),
    new MiniCssExtractPlugin({
      filename: "./css/index.css",
    }),
    new LiveReloadPlugin(),
  ],
  stats: {
    colors: true,
  },
  devtool: "eval-source-map",
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    port: 3000,
    open: true,
  },
};
