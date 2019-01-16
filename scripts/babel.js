const { exec } = require('child_process')

const version = process.env.version 

exec(`babel examples/src/demo-${version}.js -d examples/lib/demo.js`, (err, stdout, stderr) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
})