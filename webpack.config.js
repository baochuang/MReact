const { resolve } = require('path')

module.exports = {
    mode: 'development',
    entry: {
        'react': './packages/react/src/React.js',
        'react-dom': './packages/react-dom/src/client/ReactDOM.js'
    },
    output: {
        path: resolve(__dirname, 'examples/lib')
    },
    devtool: 'source-map'
}