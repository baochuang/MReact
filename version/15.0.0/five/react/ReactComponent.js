import { emptyObject } from '../constants'
export default class ReactComponent {
    constructor(props, updater) {
        this.props = props
        this.updater = updater
        this.refs = emptyObject
    }

    setState(partialState, callback) {
        this.updater.enqueueSetState(this, partialState)
        if (callback) {
          this.updater.enqueueCallback(this, callback, 'setState')
        }
    }
}

ReactComponent.prototype.isReactComponent = {}