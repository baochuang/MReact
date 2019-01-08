import ReactCompositeComponent from './ReactCompositeComponent'

const ReactCompositeComponentWrapper = function(element) {
    this.construct(element);
}

Object.assign(
    ReactCompositeComponentWrapper.prototype,
    ReactCompositeComponent.Mixin,
    {
      _instantiateReactComponent: instantiateReactComponent,
    }
)

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
    
    if (typeof node === 'object') {
        const type = node.type

        if (typeof type === 'string') {
            
        } else if (isInternalComponentType(type)) {
            
        } else {
            instance = new ReactCompositeComponentWrapper(element)
        }
    } else if (typeof node === 'string' || typeof node === 'number') {
        
    }

    return instance
}

export default instantiateReactComponent