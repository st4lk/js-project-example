const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    library: "",
  },
  // devtool: false,
  devtool: "source-map",

  optimization: {
    minimize: false,

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

  // optimization: {
  //   splitChunks: {
  //     chunks: 'async',
  //     minSize: 30000,
  //     minRemainingSize: 0,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 6,
  //     maxInitialRequests: 4,
  //     automaticNameDelimiter: '~',
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
};
