const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    plugins: [
        // 每次打包清楚上次打包的遗留
        new CleanWebpackPlugin(),
    ],
})
