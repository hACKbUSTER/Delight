var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: [path.resolve(__dirname, '../src/index.js')],
        react: ['react']
    },
    output: {
        path: path.resolve(__dirname, '../static/build'),
        publicPath: 'build',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['react'],
            minChunks: Infinity
        })
    ],
    module: {
        loaders: [
            {
                test: /\.(jsx?|es6)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['babel-plugin-transform-decorators-legacy', 'transform-class-properties']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, 'src/scripts'),
            path.resolve(__dirname, 'src')
        ]
    },
};