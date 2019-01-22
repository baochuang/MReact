
class ReactDOMTextComponent {
    constructor(text) {
        this._currentElement = text

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

    }

    receiveComponent(nextText, transaction) {
    
    }
}