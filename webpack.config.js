const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

const path = require("path");

const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");

const isProd = process.env.NODE_ENV === "production";

const getSettingsForStyles = (withModules) => {
  return [
    !isProd && MiniCssExtractPlugin.loader,
    !withModules
      ? "css-loader"
      : {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: !isProd
                ? "[path][name]__[local]"
                : "[hash:base64]",
            },
          },
        },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

module.exports = {
  target: !isProd ? "web" : "browserslist",
  devtool: isProd ? "hidden-source-map" : "eval-source-map",
  entry: path.join(srcPath, "index.tsx"),
  output: {
    path: buildPath,
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html"),
    }),
    !isProd &&
      (new ReactRefreshWebpackPlugin(),
      new ForkTsCheckerPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name]-[hash].css",
      })),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 7 * 1024, // 7kB
          },
        },
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: "babel-loader",
      },
      {
        test: /\.(woff)$/,
        type: 'asset',
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx",".woff"],
    alias: {
      components: path.join(srcPath, "components"),
      images: path.join(srcPath, "images"),
      config: path.join(srcPath, "config"),
      styles: path.join(srcPath, "styles"),
      utils: path.join(srcPath, "utils"),
      pages: path.join(srcPath, "pages"),
      type: path.join(srcPath, "type"),
      hooks: path.join(srcPath, "hooks"),
      store: path.join(srcPath, "store"),
      fonts: path.join(srcPath, "store"),
    },
  },
  devServer: {
    host: "127.0.0.1",
    port: "9000",
    historyApiFallback:  true,
  },
};