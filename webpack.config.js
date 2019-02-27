const { resolve } = require('path')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        'react': './version/16.8/one/react/index.js',
        'react-dom': './version/16.8/one/react-dom/index.js'
    },
    output: {
        path: resolve(__dirname, 'lib')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            'shared': resolve(__dirname, 'version/16.8/one/shared'),
            'react': resolve(__dirname, 'version/16.8/one/react'),
            'react-dom': resolve(__dirname, 'version/16.8/one/react-dom'),
            'react-reconciler': resolve(__dirname, 'version/16.8/one/react-reconciler'),
            'scheduler': resolve(__dirname, 'version/16.8/one/scheduler'),
        }
    }
}