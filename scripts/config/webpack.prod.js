const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('path')
const webpack = require('webpack')
// 查找文件路径
const glob = require('glob')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const { PROJECT_PATH } = require('../constants')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const paths = require('../paths')
const { shouldOpenAnalyzer, ANALYZER_HOST, ANALYZER_PORT } = require('../constants')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        filename: 'js/[name].[contenthash:8].js',
        path: paths.appBuild,
        assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
    },
    plugins: [
        // 每次打包清楚上次打包的遗留
        new CleanWebpackPlugin(),
        // 删除无用的样式代码
        // 引入样式的tsx文件必须要给到 不然无法解析你没有哪个样式类型！！！
        new PurgeCSSPlugin({
            paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
        }),
        new webpack.BannerPlugin({
            raw: true,
            banner: '/** @preserve Powered by react-ts-quick-starter (https://github.com/Pzx1997/react-ts-quick-starter) */',
        }),
        shouldOpenAnalyzer &&
            new BundleAnalyzerPlugin({
                analyzerMode: 'server', // 开一个本地服务查看报告
                analyzerHost: ANALYZER_HOST, // host 设置
                analyzerPort: ANALYZER_PORT, // 端口号设置
            }),
    ].filter(Boolean),

    // 分离代码
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
        // 指定压缩器
        minimize: true,
        minimizer: [
            // js 代码压缩
            new TerserPlugin({
                // false 意味着去除所有注释 除了有特殊标记(@perserve...)的注释
                extractComments: false,
                terserOptions: {
                    compress: {
                        // 设置想要去除的函数
                        pure_funcs: ['console.log'],
                    },
                },
            }),
            // css 代码压缩
            new CssMinimizerPlugin(),
        ],
    },
})
