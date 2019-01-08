import ReactInstanceMap from './ReactInstanceMap'
function StatelessComponent(Component) {}

StatelessComponent.prototype.render = function() {
    const Component = ReactInstanceMap.get(this)._currentElement.type
    const element = Component(this.props)
    return element
}

const ReactCompositeComponentMixin = {
    construct: function(element) {
        this._currentElement = element
    },
    mountComponent: function(
        transaction,
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
            markup = this.performInitialMount(renderedElement,nativeParent, nativeContainerInfo, transaction)
        }

        if (inst.componentDidMount) {

        }

        return markup
    },
    _processProps: function(newProps) {
        return newProps
    }
}

const ReactCompositeComponent = {
    Mixin: ReactCompositeComponentMixin
}

export default ReactCompositeComponent