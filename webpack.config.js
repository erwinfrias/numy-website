const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.pug$/i,
        loader: 'pug-loader',
        options: { pretty: true }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader', options: { sourceMap: true} }
        ]
      },
      {
        test: /\.(ttf|eot|otf|woff2?)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/fonts/[name][ext]' }
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp|ico)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/images/[name][ext]' }
      },
      {
        test: /\.(mp4)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/videos/[name][ext]' }
      },
      {
        test: /\.(mp3)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/media/[name][ext]' }
      },
      {
        test: /\.(docx?|xlsx?|pptx?|pdf)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/docs/[name][ext]' }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pug/pages/index.pug',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/about.pug',
      filename: 'about.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/exclusive-listings.pug',
      filename: 'exclusive-listings.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/condos.pug',
      filename: 'condos.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/homes.pug',
      filename: 'homes.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/land.pug',
      filename: 'land.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/luxury-rentals.pug',
      filename: 'luxury-rentals.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/town-house.pug',
      filename: 'town-house.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/waterfront-homes.pug',
      filename: 'waterfront-homes.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/property.pug',
      filename: 'property.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/services.pug',
      filename: 'services.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/contact.pug',
      filename: 'contact.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/search-results.pug',
      filename: 'search-results.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/miami-beach.pug',
      filename: 'miami-beach.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/fisher-island.pug',
      filename: 'fisher-island.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/weston.pug',
      filename: 'weston.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/brickell.pug',
      filename: 'brickell.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/new-projects.pug',
      filename: 'new-projects.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: './assets/css/main.css'
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/.htaccess', to: './' },
        { from: './src/email.php', to: './' },
      ],
    }),
    new Dotenv()
  ]
};
