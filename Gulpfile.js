const { src, parallel, dest } = require('gulp')
const concat = require('gulp-concat')

function concatReactDom() {
    return src('./src/react-dom/*.js')
        .pipe(concat('react-dom.js'))
        .pipe(dest('./examples/lib/'))
}

function concatReconciler() {
    return src([
        './src/reconciler/ReactInstanceMap.js', 
        './src/reconciler/ReactReconciler.js', 
        './src/reconciler/ReactCompositeComponent.js',
        './src/reconciler/instantiateReactComponent.js',
        './src/reconciler/index.js'
    ]).pipe(concat('reconciler.js'))
      .pipe(dest('./examples/lib/'))
}

function concatReact() {
    return src('./src/react/*.js')
        .pipe(concat('react.js'))
        .pipe(dest('./examples/lib/'))
}

function concatConstants() {
    return src('./src/constants/*.js')
        .pipe(concat('constants.js'))
        .pipe(dest('./examples/lib/'))
}

exports.default = parallel(concatReactDom, concatReconciler, concatReact, concatConstants)