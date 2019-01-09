const ReactReconciler = {
    mountComponent: function (
        internalInstance,
        nativeParent,
        nativeContainerInfo
    ) {
        const markup = internalInstance.mountComponent(
            nativeParent,
            nativeContainerInfo
        ) 
        if ( internalInstance._currentElement &&
            internalInstance._currentElement.ref !== null) {
        }
        return markup
    }
}