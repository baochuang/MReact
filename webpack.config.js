const { resolve } = require('path')

module.exports = {
    mode: 'development',
    entry: {
        'react': './version-two/react/index.js',
        'react-dom': './version-two/react-dom/client/ReactDOM.js',
        "share": './version-two/shared/index.js'
    },
    output: {
        path: resolve(__dirname, 'examples/lib')
    },
    devtool: 'source-map'
}

// module.exports = {
//     mode: 'development',
//     entry: {
//         'react': './version-three/react/index.js',
//         'react-dom': './version-three/react-dom/client/ReactDOM.js',
//         "share": './version-three/shared/index.js'
//     },
//     output: {
//         path: resolve(__dirname, 'examples/lib')
//     },
//     devtool: 'source-map'
// }