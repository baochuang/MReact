import ReactElement from '../../../react/src/ReactElement'
import { emptyObject } from '../../../constants'
import instantiateReactComponent from '../../../react-reconciler/src/instantiateReactComponent'
import ReactDOMContainerInfo from '../ReactDOMContainerInfo'
import setInnerHTML from '../../../utils/setInnerHTML'
import DOMLazyTree from '../../../utils/DOMLazyTree'
import ReactReconciler from '../../../react-reconciler/src/ReactReconciler'

let topLevelRootCounter = 1

function mountComponentIntoNode(
    wrapperInstance,
    container,
    context
) {
    const markup = ReactReconciler.mountComponent(
        wrapperInstance,
        null,
        ReactDOMContainerInfo(wrapperInstance, container),
        context
    )

    wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance

    ReactMount._mountImageIntoNode(
        markup,
        container,
        wrapperInstance
    )
}

function batchedMountComponentIntoNode (
    componentInstance,
    container,
    context
) {
    mountComponentIntoNode(
        componentInstance,
        container,
        context
    )
}

const TopLevelWrapper = function() {
    this.rootID = topLevelRootCounter++
};

TopLevelWrapper.prototype.isReactComponent = {};

TopLevelWrapper.prototype.render = function() {
  // this.props is actually a ReactElement
  return this.props;
}

const ReactMount = {
    _renderNewRootComponent: function(nextElement, container, context) {
        const componentInstance = instantiateReactComponent(nextElement)

        batchedMountComponentIntoNode(componentInstance, container, context)

        return componentInstance
    },
    _mountImageIntoNode: function(
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
    },
    _renderSubtreeIntoContainer: function(parentComponent, nextElement, container, callback) {

        const nextWrappedElement = ReactElement(
            TopLevelWrapper,
            null,
            null,
            nextElement
        )

        const component = ReactMount._renderNewRootComponent(
            nextWrappedElement,
            container,
            parentComponent ? parentComponent._reactInternalInstance._processChildContext(
                parentComponent._reactInternalInstance._context
            ) : emptyObject // {}
        )._renderedComponent.getPublicInstance()

        if (callback) {

        }

        return component
    },
    render: function(nextElement, container, callback) {
        return ReactMount._renderSubtreeIntoContainer(
            null,
            nextElement,
            container,
            callback,
        )
    }
}

export default ReactMount