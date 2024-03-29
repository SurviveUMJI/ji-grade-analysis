var webpack = require('webpack');
var path = require('path');

// variables
var isProduction =
    process.argv.indexOf('production') >= 0 || process.env.NODE_ENV ===
    'production';
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './build');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

var cssModuleRegex = new RegExp(/\.module\.(less|css)$/);
var loaderUtils = require('loader-utils');

function getLocalIdent(loaderContext, localIdentName, localName, options) {

  // return local name if it's a global css file
  if (!cssModuleRegex.test(loaderContext.resourcePath)) {
    return localName;
  }

  if (loaderContext.resourcePath.includes('node_modules')) {
    return localName;
  }

  if (!options.context) {
    // eslint-disable-next-line no-param-reassign
    options.context = loaderContext.rootContext;
  }

  const request = path.relative(options.context, loaderContext.resourcePath).
      replace(/\\/g, '/');

  // eslint-disable-next-line no-param-reassign
  options.content = `${options.hashPrefix + request}+${localName}`;

  // eslint-disable-next-line no-param-reassign
  localIdentName = localIdentName.replace(/\[local\]/gi, localName);

  const hash = loaderUtils.interpolateName(
      loaderContext,
      localIdentName,
      options,
  );

  return hash.replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-').
      replace(/^((-?[0-9])|--)/, '_$1');
}

module.exports = {
  context: sourcePath,
  entry: {
    app: './main.tsx',
  },
  output: {
    path: outPath,
    filename: isProduction ? '[contenthash].js' : '[chunkhash].js',
    chunkFilename: isProduction ?
        '[name].[contenthash].js' :
        '[name].[chunkhash].js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, 'src/app/'),
    },
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: [
          !isProduction && {
            loader: 'babel-loader',
            options: {plugins: ['react-hot-loader/babel']},
          },
          {
            loader: 'ts-loader',
            options: {
              'allowTsInNodeModules': true,
            },
          },
          // 'ts-loader'
        ].filter(Boolean),
      },
      // css
      {
        test: /\.(css|less)$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isProduction
                    ? '[chunkhash:base64:5]'
                    : '[local]__[chunkhash:base64:5]',
                getLocalIdent,
              },
              sourceMap: !isProduction,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [
                  require('postcss-import')({addDependencyTo: webpack}),
                  require('postcss-url')(),
                  require('postcss-preset-env')({
                    /* use stage 2 features (defaults) */
                    stage: 2,
                  }),
                  require('postcss-reporter')(),
                  require('postcss-browser-reporter')({
                    disabled: isProduction,
                  }),
                ],
              },
            },
          },
        ],
      },
      // static assets
      {test: /\.html$/, use: 'html-loader'},
      {test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000'},
      {
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: false,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10,
          filename: isProduction ?
              'vendor.[contenthash].js' :
              'vendor.[chunkhash].js',
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: isProduction ? 'production' : 'development',
      // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    // new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[contenthash].css' : '[chunkhash].css',
      // disable: !isProduction
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
      favicon: 'assets/favicon.ico',
    }),
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
    clientLogLevel: 'warning',
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-source-map',
  // node: {
  // workaround for webpack-dev-server issue
  // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
  // fs: 'empty',
  // net: 'empty'
  // }
};
