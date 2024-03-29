const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // Change to 'production' for production build
    entry: './src/index.js', // Your entry file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // Add loaders for other file types like images, fonts, etc.
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Your HTML template
            filename: 'index.html',
        }),
    ],
    devServer: {
      static: path.join(__dirname, 'dist'), // Serve content from the 'dist' directory
      compress: true,
      port: 3000,
      historyApiFallback: true,
  },
  
};
