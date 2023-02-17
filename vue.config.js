const path = require('path')
const { resolve } = require('path')
module.exports = {
    publicPath: './',
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        
    },

    configureWebpack: {
        
        resolve: {
            alias: {
                '@': resolve('src'),
            }
        }
    }
    
}