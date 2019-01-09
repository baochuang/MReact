const CONTENT_TYPES = {'string': true, 'number': true}

function ReactDOMComponent(element) {
    const tag = element.type

    this._tag = tag.toLowerCase()
    this._currentElement = element
}

ReactDOMComponent.displayName = 'ReactDOMComponent'

ReactDOMComponent.Mixin = {
    mountComponent: function(
        nativeParent,
        nativeContainerInfo,
        context
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
        const contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
        const childrenToUse = contentToUse != null ? null : props.children;
        if (contentToUse) {
          // TODO: Validate that text is allowed as a child of this node
          DOMLazyTree.queueText(lazyTree, contentToUse);
        } else if (childrenToUse) {
            // const mountImages = this.mountChildren(childrenToUse, context);
            // for (var i = 0; i < mountImages.length; i++) {
            //     DOMLazyTree.queueChild(lazyTree, mountImages[i]);
            // }
        }
    },
    getPublicInstance: function() {
        return null;
    }
}

Object.assign(
    ReactDOMComponent.prototype,
    ReactDOMComponent.Mixin
)