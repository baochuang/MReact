function mountComponentIntoNode(
    wrapperInstance,
    container
) {
    const markup = ReactReconciler.mountComponent(
        wrapperInstance,
        null,
        ReactDOMContainerInfo(wrapperInstance, container)
    )

    ReactDOM._mountImageIntoNode(
        markup,
        container,
        wrapperInstance
    )
}

function batchedMountComponentIntoNode (
    componentInstance,
    container
) {
    mountComponentIntoNode(componentInstance, container)
}

const ReactDOM = { }

ReactDOM.render = function(element, container, callback) {
    ReactDOM._renderSubtreeIntoContainer(
        element,
        container,
        callback,
    )
}

ReactDOM._renderSubtreeIntoContainer = function (element, container) {

    const component = ReactDOM._renderNewRootComponent(
        element,
        container
    )._renderedComponent.getPublicInstance()

    return component
}

ReactDOM._renderNewRootComponent = function(element, container) {
    const componentInstance = Reconciler.instantiateReactComponent(element)

    batchedMountComponentIntoNode(componentInstance, container)

    return componentInstance
}

ReactDOM._mountImageIntoNode = function(
    markup,
    container,
    wrapperInstance,
    transaction = { useCreateElement: true}
){
    if (transaction.useCreateElement) {
        while (container.lastChild) {
            container.removeChild(container.lastChild)
        }
        DOMLazyTree.insertTreeBefore(container, markup, null)
    } else {
        setInnerHTML(container, markup)
    }
}