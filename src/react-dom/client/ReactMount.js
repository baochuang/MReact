import instantiateReactComponent from '../../react-reconciler/instantiateReactComponent'
import ReactReconciler from '../../react-reconciler/ReactReconciler'
import ReactDOMContainerInfo from '../ReactDOMContainerInfo'
import DOMLazyTree from './utils/DOMLazyTree'

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
        container
    )
}

const mountImageIntoNode = function(
    markup,
    container
){
    while (container.lastChild) {
        container.removeChild(container.lastChild)
    }
    // 将DOMLazyTree绑入container
    DOMLazyTree.insertTreeBefore(container, markup, null)
}