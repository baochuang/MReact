const ReactDOM = { }

ReactDOM.render = function(element, container, callback) {
    this._renderSubtreeIntoContainer(
        element,
        container,
        callback,
    )
}

ReactDOM._renderSubtreeIntoContainer = function (element, container) {

    const component = this._renderNewRootComponent(
        element,
        container
    )._renderedComponent.getPublicInstance()

    return component
}

ReactDOM._renderNewRootComponent = function(element, container) {
    const componentInstance = instantiateReactComponent(element)

    batchedMountComponentIntoNode(componentInstance, container)

    return componentInstance
}
