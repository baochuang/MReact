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