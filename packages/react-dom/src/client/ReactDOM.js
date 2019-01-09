import ReactMount from './ReactMount'
const { render } = ReactMount

import ReactDefaultInjection from '../ReactDefaultInjection'

ReactDefaultInjection.inject()

const ReactDOM = {
    render
}

window.ReactDOM = ReactDOM