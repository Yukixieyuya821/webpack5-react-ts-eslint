const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
    // 模式
    mode: 'development',
    // 开发工具，开启 source map，编译调试
    devtool: 'eval-cheap-module-source-map',
    // 开发模式，自动更新改动
    devServer: {
        port: 9580, // 服务端口号
        compress: false, // gzip压缩，开发环境不开启，提升速度
        // 解决路由跳转404问题
        historyApiFallback: true,
        hot: true,
        static: { //托管静态资源文件
            directory: path.join(__dirname, '../public'),
        }
    },
    plugins: [
        // 开启react模块热替换插件
        new ReactRefreshWebpackPlugin(),
    ]
});
