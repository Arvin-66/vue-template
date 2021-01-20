const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
{{#router}}
const VueLoaderPlugin = require('vue-loader/lib/plugin');
{{/router}}

module.exports = {
    mode: 'development', // development || production
    entry: {
        core: ['./src/main.ts']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:7].js'
    },
    // optimization: {
    //     minimize: false
    // },
    // devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    externals: {
        vue: 'Vue'{{#vuex}},
        vuex: 'Vuex'{{/vuex}}{{#router}},
        'vue-router': 'VueRouter'{{/router}}
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        {{#router}}
        new VueLoaderPlugin()
        {{/router}}
    ],
    module: {
        rules: [
            {
                test: /\.(vue|ts)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, './src')],
                options: {
                    formatter: eslintFriendlyFormatter,
                    fix: false,
                    extensions: ['.ts', '.vue'],
                    cache: false,
                    emitWarning: true,
                    emitError: false
                }
            }, {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 3000,
                        name: './images/[name].[ext]?v=[hash:5]',
                        esModule: false
                    }
                }]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }
        ]
    }
};
