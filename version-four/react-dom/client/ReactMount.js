import ReactElement from '../../react/ReactElement'
import TopLevelWrapper from '../TopLevelWrapper'
import { emptyObject } from '../../constants'
import instantiateReactComponent from '../../react-reconciler/instantiateReactComponent'
import ReactReconciler from '../../react-reconciler/ReactReconciler'
import ReactDOMContainerInfo from '../ReactDOMContainerInfo'
import DOMLazyTree from './utils/DOMLazyTree'
import ReactUpdates from '../../react-reconciler/ReactUpdates'
import ReactDOMFeatureFlags from '../ReactDOMFeatureFlags'
import { precacheNode } from './ReactDOMComponentTree'

export const render = function(nextElement, container, callback) {
    return renderSubtreeIntoContainer(
        null,
        nextElement,
        container,
        callback,
    )
}

const renderSubtreeIntoContainer = function(parentComponent, nextElement, container, callback) {

    const nextWrappedElement = ReactElement(
        TopLevelWrapper,
        null,
        null,
        null,
        null,
        nextElement
    )

    const component = renderNewRootComponent(
        nextWrappedElement,
        container,
        parentComponent ? parentComponent._reactInternalInstance._processChildContext(
            parentComponent._reactInternalInstance._context
        ) : emptyObject 
    )._renderedComponent.getPublicInstance()

    if (callback) {

    }

    return component
}

const renderNewRootComponent = function(nextElement, container, context) {
    const componentInstance = instantiateReactComponent(nextElement)

    // mountComponentIntoNode(componentInstance, container, context)

    ReactUpdates.batchedUpdates(
        batchedMountComponentIntoNode,
        componentInstance,
        container,
        context
    )

    return componentInstance
}

const batchedMountComponentIntoNode = function(  
    componentInstance,
    container,
    context
) {
    const transaction = ReactUpdates.ReactReconcilerTransaction.getPooled(
        ReactDOMFeatureFlags.useCreateElement
    )
    // 执行绑定并将生命周期钩子放入队列
    transaction.perform(
        mountComponentIntoNode,
        componentInstance,
        container,
        transaction,
        context
    )
    // 执行事务队列
    ReactUpdates.ReactReconcilerTransaction.release(transaction)
}

const mountComponentIntoNode = function(
    wrapperInstance,
    container,
    transaction = { useCreateElement: true},
    context
) {
    const markup = ReactReconciler.mountComponent(
        wrapperInstance,
        transaction,
        null,
        ReactDOMContainerInfo(wrapperInstance, container),
        context
    )

    wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance

    mountImageIntoNode(
        markup,
        container,
        wrapperInstance,
        transaction
    )
}

const mountImageIntoNode = function(
    markup,
    container,
    instance,
    transaction
){
    if (transaction.useCreateElement) {
        while (container.lastChild) {
            container.removeChild(container.lastChild)
        }
        DOMLazyTree.insertTreeBefore(container, markup, null)
    } else {
        setInnerHTML(container, markup)
        precacheNode(instance, container)
    }
}