var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    cache:true,
    entry: {
        app: ['./public/js/index.js'],
        vendors: ['./public/js/vendors.js']
    },
    output: {
        path: 'dist/',
        filename: 'js/[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader')},
            {test: /\.(jpg|png|svg|ico|gif).*$/, loader: "file-loader?name=img/[name].[ext]"},
            {test: /\.(woff|woff2|eot|ttf).*$/, loader: "file-loader?name=fonts/[name].[ext]"},
            {test: /sw-toolbox.*$/, loader: "file-loader?name=js/[name].[ext]"},
            {test: /sw.js$/, loader: "file-loader?name=[name].[ext]"},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: [ 'es2015', 'react' ] }},
            {test: /manifest.json$/, loader: "file-loader?name=[name].[ext]"},
            {test: /data.json$/, loader: "file-loader?name=json/[name].[ext]"}
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new ExtractTextPlugin('css/[name].css'),                       
        new HtmlWebpackPlugin({
            filename: '../dist/index.html',
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
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}