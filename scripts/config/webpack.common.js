// const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const { resolve } = require('path')
const { PROJECT_PATH, isDev } = require('../constants')

module.exports = {
    // 配置入口文件路径 app表示引入文件的名字
    entry: {
        app: resolve(PROJECT_PATH, './src/index.tsx'),
    },
    // 配置编译打包之后的文件名以及所在路径
    output: {
        // 表示命名与入口文件命名一致，并带有8位hash值的打包之后的js文件
        // filename: 'js/[name].[hash:8].js',
        // 如果不是生产环境则去掉hash
        filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
        path: resolve(PROJECT_PATH, './dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@': resolve(PROJECT_PATH, './src'),
            Comps: resolve(PROJECT_PATH, './src/components'),
            Utils: resolve(PROJECT_PATH, './src/utils'),
        },
    },
    // webpack5自带缓存
    // https://webpack.js.org/configuration/other-options/#cache
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(PROJECT_PATH, './public/index.html'),
            filename: 'index.html',
            // 防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题
            cache: false,
            // 压缩 配置项
            minify: isDev
                ? false
                : {
                      removeAttributeQuotes: true,
                      collapseWhitespace: true,
                      removeComments: true,
                      collapseBooleanAttributes: true,
                      collapseInlineTagWhitespace: true,
                      removeRedundantAttributes: true,
                      removeScriptTypeAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      minifyCSS: true,
                      minifyJS: true,
                      minifyURLs: true,
                      useShortDoctype: true,
                  },
        }),
        // copy公共静态资源到打包目录
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(PROJECT_PATH, './public'),
                    to: resolve(PROJECT_PATH, './dist'),
                    toType: 'dir',
                    globOptions: {
                        ignore: [
                            // 忽略所有HTML文件
                            '**/*index.html',
                        ],
                    },
                },
            ],
        }),
        // 展示打包进度
        new WebpackBar({
            name: isDev ? '正在启动' : '正在打包',
            color: 'green',
        }),
        // 编译时的 Typescript 类型检查
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: resolve(PROJECT_PATH, './tsconfig.json'),
            },
        }),
        // 加快二次编译速度
        // new HardSourceWebpackPlugin(),
        // 解决 webpack 报错问题
        // new HardSourceWebpackPlugin.ExcludeModulePlugin([]),
    ],
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: {
                    // 缓存公共文件
                    cacheDirectory: true,
                },
                exclude: /node_modules/,
            },
            {
                // 匹配规则
                test: /\.css$/,
                // 可以是一个字符串，假如我们只使用 style- loader ，只需要 use: 'style-loader' 。
                // 可以是一个数组，假如我们不对 css - loader 做额外配置，只需要 use: ['style-loader', 'css-loader']。
                // 数组的每一项既可以是字符串也可以是一个对象，当我们需要在webpack 的配置文件中对 loader 进行配置，就需要将其编写为一个对象，
                // 并且在此对象的 options 字段中进行配置。比如我们上面要对 css - loader 做配置的写法。
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false, // 默认就是 false, 若要开启，可在官网具体查看可配置项
                            sourceMap: isDev, // 开启后与 devtool 设置一致, 开发环境开启，生产环境关闭
                            importLoaders: 0, // 指定在 CSS loader 处理前使用的 laoder 数量
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            sourceMap: isDev,
                            importLoaders: 1, // 需要先被 sass-loader 处理，所以这里设置为 1
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[contenthash:8].[ext]',
                            outputPath: 'assets/images',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[contenthash:8].[ext]',
                            outputPath: 'assets/fonts',
                        },
                    },
                ],
            },
        ],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    // 分离代码
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
}
