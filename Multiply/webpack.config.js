const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval', // when production, it is 'hidden-source-map'
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    entry: {
        app: './client'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in CA'],
                        },
                        debug: true
                    }],
                '@babel/preset-react'
            ],
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ],
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
    }
}