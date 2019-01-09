const ReactInstanceMap = {
    get: function(key) {
        return key._reactInternalInstance
    },
    set: function(key, value) {
        key._reactInternalInstance = value;
    }
}
const ReactNativeComponent = {
    injection: ReactNativeComponentInjection = {
        injectGenericComponentClass: function(componentClass) {
            ReactNativeComponent.genericComponentClass = componentClass
        }
    },
    createInternalComponent: function(element) {
        return new ReactNativeComponent.genericComponentClass(element)
    },

    genericComponentClass: null
}
const ReactReconciler = {
    mountComponent: function (
        internalInstance,
        nativeParent,
        nativeContainerInfo
    ) {
        const markup = internalInstance.mountComponent(
            nativeParent,
            nativeContainerInfo
        ) 
        if ( internalInstance._currentElement &&
            internalInstance._currentElement.ref !== null) {
        }
        return markup
    }
}
function StatelessComponent(Component) {}

StatelessComponent.prototype.render = function() {
    const Component = ReactInstanceMap.get(this)._currentElement.type
    const element = Component(this.props)
    return element
}

const ReactCompositeComponentMixin = { }

ReactCompositeComponentMixin.construct = function(element) {
        this._currentElement = element
        this._renderedComponent = null
}

ReactCompositeComponentMixin.mountComponent = function(
    nativeParent,
    nativeContainerInfo
) {
        this._nativeParent = nativeParent
        this._nativeContainerInfo = nativeContainerInfo
        
        const publicProps = this._processProps(this._currentElement.props)

        const Component = this._currentElement.type

        let inst
        let renderedElement

        if (Component.prototype && Component.prototype.isReactComponent) {
            inst = new Component(publicProps)
        } else {
            inst = Component(publicProps)
        }

        if (inst == null || inst.render == null) {
            renderedElement = inst
            inst = new StatelessComponent(Component)
        }

        inst.props = publicProps

        this._instance = inst

        ReactInstanceMap.set(inst, this)

        let markup

        if (inst.unstable_handleError) {

        } else {
            markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo)
        }

        if (inst.componentDidMount) {

        }

        return markup
}

ReactCompositeComponentMixin._processProps = function(newProps) {
    return newProps
}

ReactCompositeComponentMixin.performInitialMount = function(
    renderedElement,
    nativeParent, 
    nativeContainerInfo
) {
    const inst = this._instance

    if (inst.componentWillMount) {
        inst.componentWillMount()
    }
    // If not a stateless component, we now render
    if (renderedElement === undefined) {
        renderedElement = this._renderValidatedComponent()
    }

    this._renderedComponent = this._instantiateReactComponent(renderedElement)

    const markup = ReactReconciler.mountComponent(
        this._renderedComponent,
        nativeParent,
        nativeContainerInfo
    )
  
    return markup
}

ReactCompositeComponentMixin._renderValidatedComponent = function() {
    let renderedComponent

    try {
        renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext()
    } finally {
        return renderedComponent
    }
}

ReactCompositeComponentMixin._renderValidatedComponentWithoutOwnerOrContext = function() {
    const inst = this._instance;
    const renderedComponent = inst.render()

    return renderedComponent
}

ReactCompositeComponentMixin._instantiateReactComponent = null

ReactCompositeComponentMixin.getPublicInstance = function() {
    var inst = this._instance
    if (inst instanceof StatelessComponent) {
      return null
    }
    return inst
}

const ReactCompositeComponent = {
    Mixin: ReactCompositeComponentMixin
}
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
        const element = node
        if (typeof type === 'string') {
            instance = ReactNativeComponent.createInternalComponent(element)
        } else if (isInternalComponentType(type)) {
            
        } else {
            instance = new ReactCompositeComponentWrapper(element)
        }
    } else if (typeof node === 'string' || typeof node === 'number') {
        
    }

    return instance
}
const Reconciler = {
    instantiateReactComponent,
    ReactCompositeComponent,
    ReactReconciler
}