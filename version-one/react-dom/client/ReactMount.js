import ReactElement from '../../react/ReactElement'
import TopLevelWrapper from '../TopLevelWrapper'
import { emptyObject } from '../../constants'
import instantiateReactComponent from '../../react-reconciler/instantiateReactComponent'
import ReactReconciler from '../../react-reconciler/ReactReconciler'
import ReactDOMContainerInfo from '../ReactDOMContainerInfo'
import DOMLazyTree from './utils/DOMLazyTree'

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

    mountComponentIntoNode(componentInstance, container, context)

    return componentInstance
}

const mountComponentIntoNode = function(
    wrapperInstance,
    container,
    context
) {
    const markup = ReactReconciler.mountComponent(
        wrapperInstance,
        { useCreateElement: true},
        null,
        ReactDOMContainerInfo(wrapperInstance, container),
        context
    )

    wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance

    mountImageIntoNode(
        markup,
        container,
        wrapperInstance
    )
}

const mountImageIntoNode = function(
    markup,
    container,
    wrapperInstance,
    transaction = { useCreateElement : true}
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