import DOMLazyTree from "./client/utils/DOMLazyTree";

export default class ReactDOMTextComponent  {
    constructor(text) {
        this._currentElement = text
        this._stringText = '' + text
    }

    mountComponent(
        nativeParent,
        nativeContainerInfo
    ) {
        const ownerDocument =nativeContainerInfo._ownerDocument
        const lazyTree = DOMLazyTree(ownerDocument.createDocumentFragment())

        if (this._stringText) {
            DOMLazyTree.queueChild(
                lazyTree,
                DOMLazyTree(ownerDocument.createTextNode(this._stringText))
            )
        }

        return lazyTree
    }
}