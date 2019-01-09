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