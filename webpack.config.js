const path                  = require('path'),
      HtmlWebpackPlugin     = require('html-webpack-plugin'),
      MiniCssExtractPlugin  = require('mini-css-extract-plugin'),
      autoprefixer          = require('autoprefixer'),
      Dotenv                = require('dotenv-webpack'),
      CopyPlugin            = require('copy-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill','./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: { browser: ['last 2 versions'] },
              sourceMap: true,
              plugins: () => [ autoprefixer ]
            }
          },
          'resolve-url-loader',
          'sass-loader?outputStyle=compressed&sourceMap',
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'file-loader?name=assets/images/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(mp4)$/i,
        use: 'file-loader?name=assets/videos/[name].[ext]'
      },
      {
        test: /\.(mp3)$/i,
        use: 'file-loader?name=assets/media/[name].[ext]'
      },
      {
        test: /\.(ttf|eot|woff2?)$/i,
        use: 'file-loader?name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.(txt|xml|pdf)$/i,
        use: 'file-loader?name=assets/docs/[name].[ext]'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pug/pages/index.pug',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/about.pug',
      filename: 'about.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/exclusive-listings.pug',
      filename: 'exclusive-listings.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/condos.pug',
      filename: 'condos.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/homes.pug',
      filename: 'homes.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/land.pug',
      filename: 'land.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/luxury-rentals.pug',
      filename: 'luxury-rentals.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/town-house.pug',
      filename: 'town-house.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/waterfront-homes.pug',
      filename: 'waterfront-homes.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/property.pug',
      filename: 'property.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/services.pug',
      filename: 'services.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/contact.pug',
      filename: 'contact.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/search-results.pug',
      filename: 'search-results.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/miami-beach.pug',
      filename: 'miami-beach.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/fisher-island.pug',
      filename: 'fisher-island.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/weston.pug',
      filename: 'weston.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/brickell.pug',
      filename: 'brickell.html',
      minify: { removeScriptTypeAttributes: true }
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/pages/new-projects.pug',
      filename: 'new-projects.html',
      minify: { removeScriptTypeAttributes: true }
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
