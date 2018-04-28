const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    bundle: "./src/index.js"
  },

  // Disable the verbose output on build
  stats: {
    children: false
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[id].js"
  },

  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss"]
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader?cacheDirectory"]
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },

  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        extractVueStyles: {
          test: m => {
            return /\.vue\?vue&type=style/.test(m.identifier());
          },
          name: "vue-styles",
          chunks: "all",

          // enforce: false
          // results in no vue-styles chunk
          // Only a bundle.css file
          enforce: false
        },

        extractOtherStyles: {
          test: m => {
            return m.constructor.name == "CssModule";
          },

          // enforce: false
          // results in no other-styles chunk
          // Only a bundle.css file
          name: "other-styles",
          chunks: "all",
          enforce: false
        }
      }
    }
  }
};
