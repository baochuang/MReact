import { emptyObject } from '../constants'

export default class ReactComponent {
    constructor(props, context, updater) {
        this.props = props
        this.context = context
        this.refs = emptyObject
        this.updater = updater
    }

    setState(partialState, callback) {

    }
}

ReactComponent.prototype.isReactComponent = {}