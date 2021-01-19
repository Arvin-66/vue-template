module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'airbnb-base',
        'plugin:vue/base'
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 6,
        env: { es6: true },
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        indent: 0,
        camelcase: 0,
        'comma-dangle': 0,
        'import/no-unresolved': [2, { ignore: ['^@/'] }],
        'no-undef': 0,
        'class-methods-use-this': 0
    }
};
