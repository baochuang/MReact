
class ReactDOMEmptyComponent {
    constructor(instantiate) {
        // ReactCompositeComponent uses this:
        this._currentElement = null
        // ReactDOMComponentTree uses these:
        this._nativeNode = null
        this._nativeParent = null
        this._nativeContainerInfo = null
        this._domID = null
    }

    mountComponent(
        transaction,
        nativeParent,
        nativeContainerInfo,
        context
    ) {

    }

    receiveComponent() {
        
    }
}