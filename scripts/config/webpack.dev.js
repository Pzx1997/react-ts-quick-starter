const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
// const { SERVER_HOST, SERVER_PORT } = require('../constants')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const webpack = require('webpack')
const proxySettings = require('../../src/setProxy')
const paths = require('../paths')

// module.exports = merge(common, {
//     mode: 'development',
// })

module.exports = merge(common, {
    mode: 'development',
    target: 'web', // webpack5 需要配置为web
    devtool: 'eval-source-map',
    output: {
        filename: 'js/[name].js',
        path: paths.appBuild,
    },
    devServer: {
        // host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
        // port: SERVER_PORT, // 指定端口，默认是8080
        stats: 'errors-only', // 终端仅打印 error
        clientLogLevel: 'silent', // 日志等级
        compress: true, // 是否启用 gzip 压缩
        open: true, // 打开默认浏览器
        hot: true, // 热更新
        noInfo: true,
        proxy: {
            ...proxySettings,
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new ErrorOverlayPlugin()],
    optimization: {
        minimize: false,
        minimizer: [],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
})
