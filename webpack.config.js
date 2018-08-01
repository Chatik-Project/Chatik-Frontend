const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const JavaScriptObfuscator = require('webpack-obfuscator');

const config = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        historyApiFallback:{
            index:'/index.html'
        },
    },
    plugins: [
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            title: 'Chatik',
            template: "./src/template.html"
        }),
        new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            disable: true,
                        },
                    },
                ],
            }
        ]
    },
};

module.exports = (env, argv) => {
    if(argv.mode === 'production') {
        config.mode = "production";
        config.plugins.push(
            new JavaScriptObfuscator ({
                compact: true,
                controlFlowFlattening: false,
                controlFlowFlatteningThreshold: 0.75,
                deadCodeInjection: false,
                deadCodeInjectionThreshold: 0.4,
                debugProtection: false,
                debugProtectionInterval: false,
                disableConsoleOutput: false,
                domainLock: [],
                identifierNamesGenerator: 'hexadecimal',
                identifiersPrefix: '',
                inputFileName: '',
                log: false,
                renameGlobals: false,
                reservedNames: [],
                reservedStrings: [],
                rotateStringArray: true,
                seed: 2048,
                selfDefending: false,
                sourceMap: false,
                sourceMapBaseUrl: '',
                sourceMapFileName: '',
                sourceMapMode: 'separate',
                stringArray: true,
                stringArrayEncoding: false,
                stringArrayThreshold: 0.75,
                target: 'browser',
                transformObjectKeys: false,
                unicodeEscapeSequence: false
            }, "vendors~main.js"),
            new UglifyJsPlugin(),
        );
        config.optimization = {
            splitChunks: {
                chunks: "initial"
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        compress: false,
                        ecma: 6,
                        mangle: true
                    },
                    sourceMap: false
                })
            ]
        }
    } else {
        config.mode = "development";
    }
    return config;
};
