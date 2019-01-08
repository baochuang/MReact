const ReactReconciler = {
    mountComponent: function (
        internalInstance,
        transaction,
        nativeParent,
        nativeContainerInfo
    ) {
        const markup = internalInstance.mountComponent(
            transaction,
            nativeParent,
            nativeContainerInfo
        ) 
        if ( internalInstance._currentElement &&
            internalInstance._currentElement.ref !== null) {

        }
        return markup
    }
}