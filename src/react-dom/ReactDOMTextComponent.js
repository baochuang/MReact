import lazyTree from '../react-dom/client/utils/DOMLazyTree'

class ReactDOMTextComponent {
    constructor(text) {
        this._currentElement = text

        this._stringText = '' + text

        this._nativeNode = null
        this._nativeParent = null

        this._domID = null
    }

    mountComponent(
        transaction,
        nativeParent,
        nativeContainerInfo,
        context
    ) {
        const domID = nativeContainerInfo._idCounter++

        if (transaction.useCreateElement) {
            const ownerDocument = nativeContainerInfo._ownerDocument
            const lazyTree = DOMLazyTree(ownerDocument.createDocumentFragment())
            DOMLazyTree.queueChild(lazyTree, DOMLazyTree(openingComment))
            if (this._stringText) {
                DOMLazyTree.queueChild(
                    lazyTree,
                    DOMLazyTree(ownerDocument.createTextNode(this._stringText))
                )
            }
            return lazyTree
        } else {
            
        }
    }

    receiveComponent(nextText, transaction) {
    
    }
}