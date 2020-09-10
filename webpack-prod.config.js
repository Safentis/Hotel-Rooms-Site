const path = require('path');

const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const productionWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
});

module.exports = new Promise((resolve, reject) => {
   resolve(productionWebpackConfig); 
});