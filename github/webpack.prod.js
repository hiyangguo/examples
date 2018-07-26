const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js?[chunkhash]'
  },
  plugins: [

    // 忽略 moment 语言文件
    // @see https://github.com/jmblog/how-to-optimize-momentjs-with-webpack#using-ignoreplugin
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // 移除 dist 目录
    new CleanWebpackPlugin(['dist']),

    // 确保 vendors 的 chunkhash 只随内容变化
    // @see https://webpack.js.org/guides/caching/#module-identifiers
    new webpack.HashedModuleIdsPlugin(),

    // 拷贝 public 到 dist
    new CopyWebpackPlugin(['public']),

    // analyzer
    // new BundleAnalyzerPlugin()
  ]
});
