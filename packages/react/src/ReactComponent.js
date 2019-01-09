import { emptyObject } from '../../constants'

function ReactComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
}

ReactComponent.prototype.isReactComponent = {}

ReactComponent.prototype.setState = function(partialState, callback) {

}

export default ReactComponent