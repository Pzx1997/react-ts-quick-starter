const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('path')
const webpack = require('webpack')
// 查找文件路径
const glob = require('glob')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const { PROJECT_PATH } = require('../constants')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
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
    ],
})
