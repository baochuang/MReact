const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
    const version = env && env.version || process.env.version || 'three'
    let config = {
        mode: 'development',
        entry: {
            'react': `./version-${version}/react/index.js`,
            'react-dom': `./version-${version}/react-dom/client/ReactDOM.js`
        },
        output: {
            path: resolve(__dirname, 'examples/lib')
        },
        devtool: 'source-map',
        plugins: [
            new HtmlWebpackPlugin({
                title: `React Version ${version} Demo`,
                template: 'examples/public/template.html',
                filename: '../demo.html',
                inject: 'head',
                version: version
            })
        ]
    }
    if (version === 'five') {
        config.entry['share'] = `./version-${version}/shared/index.js`
    } 
    return config
}