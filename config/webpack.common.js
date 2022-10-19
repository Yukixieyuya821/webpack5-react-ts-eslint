const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const AutoImport = require('unplugin-auto-import/webpack');
const isDev = process.env.NODE_ENV === 'development';
const srcPath = path.resolve(__dirname, '../src');
module.exports = {
    entry: './src/main.tsx',
    output: {
        filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
        path: path.resolve(__dirname, '../dist'), // 打包的出口文件夹路径
        clean: true, // webpack4需要配置clean-webpack-plugin删除dist文件，webpack5内置了。
        publicPath: '/', // 打包后文件的公共前缀路径
    },
    resolve: {
        extensions: ['.js', 'jsx', '.tsx', '.ts'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        modules: [path.resolve(__dirname, '../node_modules')],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                enforce: 'pre',
                include: srcPath,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            },
            // {
            //     test: /\.s[ac]ss$/i,
            //     enforce: 'pre',
            //     include: srcPath,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'postcss-loader',
            //         //将scss编译成css
            //         'sass-loader',
            //     ],
            // },
            {
                test: /.(scss|sass)$/,
                enforce: 'pre',
                include: srcPath,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    {
                        loader: 'css-loader',
                        options: {
                            // Enable CSS Modules features
                            modules: true,
                            importLoaders: 2,
                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                        },
                    },
                    // 将 PostCSS 编译成 CSS
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        // postcss-preset-env 包含 autoprefixer
                                        'postcss-preset-env',
                                    ],
                                ],
                            },
                        },
                    },
                    // 将 Sass 编译成 CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require.resolve('sass'),
                        },
                    }
                ],
            },
            {
                test: /\.(js|ts|jsx|tsx)$/,
                include: srcPath,
                use: [
                    {
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'tsx',
                            target: 'es2015',
                        },
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset',
                parser: {
                    //转base64的条件
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb
                    }
                },
                generator: {
                    filename: 'static/images/[name].[contenthash:6][ext]'
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: 'asset', // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:6][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: 'asset', // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/media/[name].[contenthash:6][ext]', // 文件输出目录和命名
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
        }),
        new ProgressBarPlugin({
            format: '  :msg [:bar] :percent (:elapsed s)'
        }),
        AutoImport({
            imports: ['react', 'react-router-dom'],
            dts: './src/auto-imports.d.ts',
            eslintrc: {
                enabled: true,
                // 配置文件的位置
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            }
        })
    ],
    // 开启webpack持久化存储缓存
    cache: {
        type: 'filesystem', // 使用文件缓存
    }
};
