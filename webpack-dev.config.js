const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.js');

const devWebpackConfig = merge(baseWebpackConfig, {
        mode: 'development',
        devtool: '#cheap-module-eval-source-map',
        devServer: {
            contentBase: `./dist`,
            compress: true,
            port: 8082,
            hot: true,
        },
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
            }),
            new webpack.HotModuleReplacementPlugin(),
        ]
    }
)

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
});