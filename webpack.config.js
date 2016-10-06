var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    cache:true,
    devtool:'eval',
    entry: {
        app: ['webpack-dev-server/client?http://localhost:8080','webpack/hot/dev-server','./public/js/index.js'],
        vendors: ['./public/js/vendors.js']
    },
    output: {
        path: 'public/',
        filename: 'js/[name].js',
        publicPath: 'http://localhost:8080/'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader')},
            {test: /\.(jpg|png|svg|ico|gif).*$/, loader: "file-loader?name=img/[name].[ext]"},
            {test: /\.(woff|woff2|eot|ttf).*$/, loader: "file-loader?name=fonts/[name].[ext]"},
            {test: /sw-toolbox.*$/, loader: "file-loader?name=js/[name].[ext]"}
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),                       
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'src/template/index.html',
            chunks: ['app', 'vendors']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "app",
            chunks: [],
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            chunks: ['app'],
            minChunks: Infinity
        }),
    ]
}