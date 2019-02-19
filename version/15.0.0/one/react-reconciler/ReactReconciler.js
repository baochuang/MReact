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
        return markup
    }
}

export default ReactReconciler