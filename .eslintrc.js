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
            typescript: {},
        },
    },
    plugins: ['react', 'unicorn', 'promise', 'prettier', '@typescript-eslint'],
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
        indent: ['error', 4],
        'prettier/prettier': 'error',
        // 取消判断导入格式必须为es5
        '@typescript-eslint/no-var-requires': 'off',
        // 'unicorn/import-style': 'off',
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        ],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'unicorn/filename-case': 'off',
        'react/prefer-stateless-function': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
}
