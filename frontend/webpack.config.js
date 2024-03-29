const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // Change to 'production' for production build
  entry: "./src/index.js", // Your entry file
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Add .ts and .tsx as supported extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Modify the test pattern to include .ts and .tsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ], // Add @babel/preset-typescript preset for TypeScript
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // Add loaders for other file types like images, fonts, etc.
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Your HTML template
      filename: "index.html",
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"), // Serve content from the 'dist' directory
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
};
