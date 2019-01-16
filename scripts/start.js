const open = require('opn')

const { resolve } = require('path')

process.env.version = process.env.version || 'three'

open(resolve(__dirname, '../examples/demo.html'))