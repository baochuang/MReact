const { resolve } = require('path')

module.exports = {
    mode: 'development',
    entry: {
        'react': './version-one/react/index.js',
        'react-dom': './version-one/react-dom/client/ReactDOM.js'
    },
    output: {
        path: resolve(__dirname, 'examples/lib')
    },
    devtool: 'source-map'
}