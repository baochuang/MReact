const { resolve } = require('path')

module.exports = {
    mode: 'development',
    entry: {
        'react': './src/react/index.js',
        'react-dom': './src/react-dom/index.js'
    },
    output: {
        path: resolve(__dirname, 'lib')
    },
    devtool: 'cheap-module-eval-source-map'
}