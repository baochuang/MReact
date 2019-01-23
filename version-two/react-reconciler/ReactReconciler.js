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