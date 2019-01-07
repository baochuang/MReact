import {
    render
} from './ReactMount'

import ReactDefaultInjection from '../ReactDefaultInjection'

ReactDefaultInjection.inject()

const ReactDOM = {
    render
}

export default ReactDOM