const path = require('path')
const { resolve } = require('path')
module.exports = {
    publicPath: './',
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        proxy: {
            '/monitoring': {
                target: 'http://localhost:8008/',
                changeOrigin: true,
                pathRewrite: {
                    "^/monitoring": ""
                }
            },
        }
    },

    configureWebpack: {
        
        resolve: {
            alias: {
                '@': resolve('src'),
            }
        }
    }
    
}