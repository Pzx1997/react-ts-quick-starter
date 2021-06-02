// https://eslint.bootcss.com/docs/user-guide/configuring

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb',
        // 开启 react hooks 的检查
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:unicorn/recommended',
        'plugin:promise/recommended',
        // 开启针对 ts 语法推荐的规则定义
        'plugin:@typescript-eslint/recommended',
        // 禁用掉prettier冲突的规则
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
        'prettier/unicorn',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.tsx', '.ts', '.js', '.json'],
                indent: ['error', 8],
            },
        },
    },
    plugins: [
        'react',
        'unicorn',
        'promise',
        '@typescript-eslint',
    ],
    rules: {
        // 防止引入ts，tsx文件报错
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                json: 'never',
                js: 'never',
            },
        ],
        'unicorn/prefer-module': 'off',
        indent: [
            'error',
            4,
        ],
    },
};
