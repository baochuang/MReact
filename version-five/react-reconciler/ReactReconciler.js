import ReactRef from './ReactRef'

function attachRefs() {
    ReactRef.attachRefs(this, this._currentElement)
}

const ReactReconciler = {
    mountComponent: function (
        transaction,
        internalInstance,
        nativeParent,
        nativeContainerInfo
    ) {
        const markup = internalInstance.mountComponent(
            transaction,
            nativeParent,
            nativeContainerInfo
        ) 
        if (internalInstance._currentElement && 
            internalInstance._currentElement.ref !== null) {
            transaction.getReactMountReady().enqueue(attachRefs, internalInstance)
        }
        return markup
    },

    performUpdateIfNecessary(
        internalInstance,
        transaction
    ) {
        internalInstance.performUpdateIfNecessary(transaction)
    },

    receiveComponent: function(
        internalInstance, 
        nextElement, 
        transaction
    ) {
        const prevElement = internalInstance._currentElement

        if (nextElement === prevElement) {
            return
        }

        internalInstance.receiveComponent(nextElement, transaction)
    },

    getNativeNode: function(internalInstance) {
        return internalInstance.getNativeNode()
    }
}

export default ReactReconciler