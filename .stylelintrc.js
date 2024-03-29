module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
        // 禁用掉prettier冲突的规则
        'stylelint-config-prettier',
    ],
    plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
    rules: {
        'plugin/declaration-block-no-ignored-properties': true,
        'comment-empty-line-before': null,
        'declaration-empty-line-before': null,
        'function-name-case': 'lower',
        'no-descending-specificity': null,
        'no-invalid-double-slash-comments': null,
        // 'rule-empty-line-before': 'always',
    },
    ignoreFiles: ['node_modules/**/*', 'build/**/*', '**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
}
