import ReactEmptyComponent from './ReactEmptyComponent'
import ReactHostComponent from './ReactHostComponent'

const ReactCompositeComponentWrapper = function(element) {
    this.construct(element);
}

function isInternalComponentType(type) {
    return (
        typeof type === 'function' &&
        typeof type.prototype !== 'undefined' &&
        typeof type.prototype.mountComponent === 'function' &&
        typeof type.prototype.receiveComponent === 'function'
      )
}

function instantiateReactComponent(node) {
    let instance 

    if (node === null || node === false) {
        instance = ReactEmptyComponent.create(instantiateReactComponent)
    } else if (typeof node === 'object') {
        const type = node.type

        if (typeof type === 'string') {
            instance = ReactHostComponent.createInternalComponent(element)
        } else if (isInternalComponentType(type)) {
            instance = new type(element)
        } else {
            instance = new ReactCompositeComponentWrapper(element)
        }
    } else if (typeof node === 'string' || typeof node === 'number') {
        instance = ReactHostComponent.createInstanceForText(node)
    }

    return instance
}