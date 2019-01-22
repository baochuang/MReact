import instantiateReactComponent from '../../react-reconciler/instantiateReactComponent'
import ReactReconciler from '../../react-reconciler/ReactReconciler'
import ReactDOMContainerInfo from '../ReactDOMContainerInfo'
import DOMLazyTree from './utils/DOMLazyTree'
import ReactUpdates from '../../react-reconciler/ReactUpdates'

export const render = function(element, container) {
    const componentInstance = instantiateReactComponent(element)

    ReactUpdates.batchedUpdates(
        batchedMountComponentIntoNode,
        componentInstance,
        container
    )

    return componentInstance
}

const batchedMountComponentIntoNode = function(
    componentInstance,
    container
) {
    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled()

    transaction.perform(
        mountComponentIntoNode,
        componentInstance,
        container,
        transaction
    )
}

const mountComponentIntoNode = function(
    instance,
    container,
    transaction
) {
    const markup = ReactReconciler.mountComponent(
        transaction,
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