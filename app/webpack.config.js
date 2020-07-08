var path = require("path");
const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");

require('dotenv').config({path: __dirname + '/.env'});

const ENVIRONMENT = JSON.stringify(process.env.NODE_ENV || "development");
const SENTRY_DSN = JSON.stringify(process.env.SENTRY_DSN);
const SENTRY_RELEASE_NAME = JSON.stringify(process.env.SENTRY_RELEASE_NAME);

const config = {
  mode: "development",
  output: {
    filename: "assets/[name]-[hash].js",
    chunkFilename: 'assets/[name]-[hash].bundle.js',
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".mjs", ".js", ".json"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Source-maps example",
      template: "src/index.tmpl",
      sentryDSN: SENTRY_DSN,
      environment: ENVIRONMENT,
      sentryRelease: SENTRY_RELEASE_NAME,
    }),
    new webpack.DefinePlugin({
      ENVIRONMENT,
      SENTRY_DSN,
      SENTRY_RELEASE_NAME,
    }),
  ],
  devtool: false,
  // devtool: "source-map",

  optimization: {
    // minimize: false,  // uncomment this to see trace of unhandled promise rejection

    /* --------------------
    https://webpack.js.org/plugins/terser-webpack-plugin/
    https://github.com/terser/terser#minify-options
    /* -------------------- */

    // minimizer: [
    //   new TerserPlugin({
    //   }),
    // ],

    // splitChunks: {
    //   // include all types of chunks
    //   chunks: 'all',
    //   // chunks: 'async',
    // }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ]
      },
      {
        test: /\.(svg|png|jpg|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              hash: "sha512",
              digest: "hex",
              name: "assets/[hash].[ext]",  // TODO: can we use contenthash here?
            }
          },
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            }
          ],
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
            {
              loader: "sass-loader",
            },
          ],
        })
      }
    ]
  }
};

if (process.env.NODE_ENV === "production") {
  config.entry = "./src/index.js";
  config.mode = "production";
  // config.plugins = config.plugins.concat([
  //   new MinifyPlugin({}, {}),
  // ]);

  // https://stackoverflow.com/q/50217480/821594
  // config.output.filename = "assets/[name]-[contenthash].js",
  // config.plugins = config.plugins.concat([
  //   new ExtractTextPlugin("assets/[name]-[contenthash].css"),
  // ]);

} else {
  config.output.filename = "assets/[name]-[hash].js",
  config.plugins = config.plugins.concat([
    new ExtractTextPlugin("assets/[name]-[hash].css"),
  ]);

  config.entry = [
    "webpack-dev-server/client?http://localhost:8080",  // Note: in vagrant I used 8123 port
    "webpack/hot/only-dev-server",
    "react-hot-loader/patch",
    "./src/index.js"
  ];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NamedModulesPlugin());
}

module.exports = config;
