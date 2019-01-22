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
    }
}

export default ReactReconciler