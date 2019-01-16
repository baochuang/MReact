const open = require('opn')

const { resolve } = require('path')

process.env.version = process.env.version || 'three'

require('./babel')

open(resolve(__dirname, '../examples/demo.html'))