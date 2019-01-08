const ReactDOM = { }

let topLevelRootCounter = 1;

const TopLevelWrapper = function() {
    this.rootID = topLevelRootCounter++
}

ReactDOM.render = function(element, container, callback) {
    this.renderSubtreeIntoContainer(
        null,
        nextElement,
        container,
        callback,
    )
}

ReactDOM.renderSubtreeIntoContainer = function (parentComponent, element, container, callback) {
    const wrappedElement = React.createElement(TopLevelWrapper, {
        child: element
    })

    const component = this.renderNewRootComponent(
        wrappedElement,
        container
    )._renderedComponent.getPublicInstance()

    return component
}

ReactDOM.renderNewRootComponent = function(element, container) {
    const componentInstance = instantiateReactComponent(element)

    batchedMountComponentIntoNode(componentInstance, container)

    return componentInstance
}
