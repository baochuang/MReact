const STYLE = keyOf({style: null})

class ReactDOMComponent {
    constructor(element) {
        const tag = element.tag
        // for diff
        this._domID = null

        this._currentElement = element
        this._tag = tag.toLowerCase()
        this._namespaceURI = null
    }

    mountComponent(
        transaction = { useCreateElement: true},
        nativeParent,
        nativeContainerInfo,
        context
    ) {
        this._domID = nativeContainerInfo._idCounter++
        this._nativeParent = nativeParent
        this._nativeContainerInfo = nativeContainerInfo

        const props = this._currentElement.props

        // namespace 还没去研究干啥的
        let namespaceURI
        let parentTag

        if (nativeParent) {
            namespaceURI = nativeParent._namespaceURI
            parentTag = nativeParent._tag
        } else if (nativeContainerInfo._tag) {
            namespaceURI = nativeContainerInfo._namespaceURI
            parentTag = nativeContainerInfo._tag
        }

        if (namespaceURI == null ||
            namespaceURI === DOMNamespaces.svg && parentTag === 'foreignobject') {
                namespaceURI = DOMNamespaces.html
        }

        if (namespaceURI === DOMNamespaces.html) {
            if (this._tag === 'svg') {
              namespaceURI = DOMNamespaces.svg;
            } else if (this._tag === 'math') {
              namespaceURI = DOMNamespaces.mathml;
            }
        }

        this._namespaceURI = namespaceURI

        let mountImage

        if (transaction.useCreateElement || true) {
            const ownerDocument = nativeContainerInfo._ownerDocument
            let el 

            if (namespaceURI === DOMNamespaces.html) {
                if (this._tag === 'script') {
                
                } else {
                    el = ownerDocument.createElement(this._currentElement.type)
                } 
            } else {
                el = ownerDocument.createElementNS(
                    namespaceURI,
                    this._currentElement.type
                )
            }

            if (!this._nativeParent) {
                DOMPropertyOperations.setAttributeForRoot(el);
            }

            this._updateDOMProperties(null, props, transaction)

            const lazyTree = DOMLazyTree(el)

            this._createInitialChildren(transaction, props, context, lazyTree)

            mountImage = lazyTree
        } else {

        }

        return mountImage
    }

    _updateDOMProperties(lastProps, nextProps, transaction) {
        for (propKey in nextProps) {
            const nextProp = nextProps[propKey]
            // 治理得到的undefined
            const lastProp = propKey === STYLE ? this._previousStyleCopy :
                lastProps != null ? lastProps[propKey] : undefined
            
        }
    }
}

ReactDOMComponent.displayName = 'ReactDOMComponent'