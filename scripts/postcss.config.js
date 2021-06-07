import isDev from './constants'

module.exports = {
    ident: 'postcss',
    sourceMap: isDev,
    plugins: [
        ['postcss-preset-env', {}],
        // 修复一些和 flex 布局相关的 bug
        'postcss-flexbugs-fixes',
        [
            'postcss-preset-env',
            {
                autoprefixer: {
                    grid: true,
                    flexbox: 'no-2009',
                },
                stage: 3,
            },
        ],
        'postcss-normalize',
    ],
}
