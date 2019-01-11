import ReactRef from './ReactRef'

const ReactReconciler = {
    mountComponent: function (
        internalInstance,
        transaction = { useCreateElement: true },
        nativeParent,
        nativeContainerInfo,
        context
    ) {
        const markup = internalInstance.mountComponent(
            transaction,
            nativeParent,
            nativeContainerInfo,
            context
        ) 
        if ( internalInstance._currentElement &&
            internalInstance._currentElement.ref !== null) {
                transaction.getReactMountReady().enqueue(attachRefs, internalInstance)
        }
        return markup
    }
}

function attachRefs() {
    ReactRef.attachRefs(this, this._currentElement);
}

export default ReactReconciler