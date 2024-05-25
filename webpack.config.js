// Example webpack.config.js snippet showing a simple setup
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      // Add other rules for different file types if necessary
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // Ensure this path is correct
    }),
  ],
  // Include other configurations like devServer if using webpack-dev-server
};
