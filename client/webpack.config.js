const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  const isWatchMode = process.argv.includes('--watch');

  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      !isWatchMode && new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
        // Ensure that modifications are made before assets are sealed
        compileSrc: true,
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "A simple text editor",
        background_color: "#01579b",
        theme_color: "#01579b",
        start_url: "/",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
          {
            src: path.resolve("./favicon.ico"),
            size: [48],
            destination: path.join("assets", "icons"),
            type: "image/ico",
          },
        ],
      }),
    ].filter(Boolean), // Filter out false values if in watch mode

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-proposal-object-rest-spread",
              ],
            },
          },
        },
      ],
    },

    // Optional: Add a watchOptions object to customize how Webpack behaves in watch mode.
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300, // Delay the rebuild after the first change
      poll: 1000, // Check for changes every second
    },
  };
};
