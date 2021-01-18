module.exports = {
    env: {
        browser: true,
        es6: true
        // node: true
    },
    extends: [
        'airbnb-base', // ts语法检查
        'plugin:vue/base' // vue语法检查
    ],
    // parser: '@typescript-eslint/parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 6, // ES6
        env: { es6: true }, // 新ES6 全局变量
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        indent: 0,
        camelcase: 0,
        'comma-dangle': 0, // json格式每一行后面都需要补上符号,
        'import/no-unresolved': [2, { ignore: ['^@/'] }],
        'no-undef': 0,
        'class-methods-use-this': 0
    }
};
