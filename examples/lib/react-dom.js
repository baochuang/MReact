function ReactDOMComponent(element) {
    const tag = element.type

    this._tag = tag.toLowerCase()
    this._currentElement = element
}

ReactDOMComponent.displayName = 'ReactDOMComponent'

ReactDOMComponent.Mixin = {
    mountComponent: function(
        nativeParent,
        nativeContainerInfo
    ) {
        this._nativeParent = nativeParent
        this._nativeContainerInfo = nativeContainerInfo

        const props = this._currentElement.props

        let mountImage

        if (true) {
            const ownerDocument = nativeContainerInfo._ownerDocument

            const el = ownerDocument.createElement(this._currentElement.type)

            const lazyTree = DOMLazyTree(el);
            
            this._createInitialChildren(props, lazyTree);
      
            mountImage = lazyTree
        }

        return mountImage
    },
    _createInitialChildren: function(
        props,
        lazyTree
    ) {
        
    },
    getPublicInstance: function() {
        return null;
    }
}

Object.assign(
    ReactDOMComponent.prototype,
    ReactDOMComponent.Mixin
)
const ReactInjection = {
    NativeComponent: ReactNativeComponent.injection
}

ReactInjection.NativeComponent.injectGenericComponentClass(
    ReactDOMComponent
)
function ReactDOMContainerInfo(topLevelWrapper, node) {
    const info = {
        _topLevelWrapper: topLevelWrapper,
        _ownerDocument: node ?
            node.nodeType === DOC_NODE_TYPE ?   
                node : node.ownerDocument :
                    null
    }
    return info
}
function mountComponentIntoNode(
    wrapperInstance,
    container
) {
    const markup = ReactReconciler.mountComponent(
        wrapperInstance,
        null,
        ReactDOMContainerInfo(wrapperInstance, container)
    )

    ReactDOM._mountImageIntoNode(
        markup,
        container,
        wrapperInstance
    )
}

function batchedMountComponentIntoNode (
    componentInstance,
    container
) {
    mountComponentIntoNode(componentInstance, container)
}

const ReactDOM = { }

ReactDOM.render = function(element, container, callback) {
    ReactDOM._renderSubtreeIntoContainer(
        element,
        container,
        callback,
    )
}

ReactDOM._renderSubtreeIntoContainer = function (element, container) {

    const component = ReactDOM._renderNewRootComponent(
        element,
        container
    )._renderedComponent.getPublicInstance()

    return component
}

ReactDOM._renderNewRootComponent = function(element, container) {
    const componentInstance = Reconciler.instantiateReactComponent(element)

    batchedMountComponentIntoNode(componentInstance, container)

    return componentInstance
}

ReactDOM._mountImageIntoNode = function(
    markup,
    container,
    wrapperInstance,
    transaction = { useCreateElement: true}
){
    if (transaction.useCreateElement) {
        while (container.lastChild) {
            container.removeChild(container.lastChild)
        }
        DOMLazyTree.insertTreeBefore(container, markup, null)
    } else {
        setInnerHTML(container, markup)
    }
}