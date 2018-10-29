const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const { NODE_ENV } = process.env;

const isDev = NODE_ENV === 'dev';

const THEME_PATH = './src/less/themes';

const extractLess = new ExtractTextPlugin('style.[hash].css');

const styleLoaders = [
  { loader: 'css-loader' },
  {
    loader: 'less-loader?javascriptEnabled=true'
  }
];

const resolveToThemeStaticPath = fileName => path.resolve(THEME_PATH, fileName);
const themeFileNameSet = fs
  .readdirSync(path.resolve(THEME_PATH))
  .filter(fileName => /\.less/.test(fileName));
const themePaths = themeFileNameSet.map(resolveToThemeStaticPath);
const getThemeName = fileName => `theme-${path.basename(fileName, path.extname(fileName))}`;

// Set of all ExtractLessPlugins.
const themesExtractLessSet = themeFileNameSet.map(
  fileName => new ExtractTextPlugin(`${getThemeName(fileName)}.css`)
);
// Set of theme loaders.
const themeLoaderSet = themeFileNameSet.map((fileName, index) => {
  return {
    test: /\.(less|css)$/,
    include: resolveToThemeStaticPath(fileName),
    loader: themesExtractLessSet[index].extract({
      use: styleLoaders
    })
  };
});

const commonConfig = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    host: '0.0.0.0',
    port: 3000
  },
  entry: {
    app: './src/index.js',
    themes: './src/themes.js'
  },
  output: {
    filename: '[name].bundle.js?[hash]',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isDev ? '/' : './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'transform-loader?brfs', // Use browserify transforms as webpack-loader.
          'babel-loader?babelrc'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(less|css)$/,
        exclude: themePaths,
        loader: extractLess.extract({
          use: styleLoaders,
          // use style-loader in development.
          fallback: 'style-loader?{attrs:{prop: "value"}}'
        })
      }
    ]
  },
  plugins: [
    extractLess,
    new HtmlwebpackPlugin({
      title: 'RSUITE multiple themes examples',
      template: 'src/index.html',
      inject: true,
      excludeChunks: ['themes']
    }),
    new webpack.DefinePlugin({
      'process.env.themes': JSON.stringify(
        themeFileNameSet.map(fileName => fileName.replace('.less', ''))
      )
    })
  ]
};

const themesConfig = {
  module: {
    rules: themeLoaderSet
  },
  plugins: themesExtractLessSet
};

module.exports = merge(commonConfig, themesConfig);
