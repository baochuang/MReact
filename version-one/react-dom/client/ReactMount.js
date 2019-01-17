import instantiateReactComponent from '../../react-reconciler/instantiateReactComponent'
import ReactReconciler from '../../react-reconciler/ReactReconciler'
import ReactDOMContainerInfo from '../ReactDOMContainerInfo'

export const render = function(element, container) {
    const componentInstance = instantiateReactComponent(element)

    mountComponentIntoNode(componentInstance, container)

    return componentInstance
}

const mountComponentIntoNode = function(
    instance,
    container
) {
    const markup = ReactReconciler.mountComponent(
        instance,
        null,
        ReactDOMContainerInfo(container)
    )

    mountImageIntoNode(
        markup,
        container,
        instance
    )
}