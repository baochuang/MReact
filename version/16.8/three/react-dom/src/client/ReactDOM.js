import {
    createContainer,
    updateContainer
} from '../../../react-reconciler/inline.dom'

function ReactRoot(container) {
    const root = createContainer(container)
    this._internalRoot = root
}

ReactRoot.prototype.render = function(children) {
    const root = this._internalRoot
    updateContainer(children, root)
}

const ReactDOM = {
    render: function(element, container) {
        const root = new ReactRoot(container)
        root.render(element)
    }
}

export default ReactDOM