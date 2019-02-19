import ReactDefaultInjection from '../ReactDefaultInjection'

ReactDefaultInjection.inject()

import { render } from './ReactMount'

const ReactDOM = {
    render
}

window.ReactDOM = ReactDOM