import { createElement } from '../../../react/src/React'
import { DOC_NODE_TYPE } from '../../../constants/NodeType'
import instantiateReactComponent from '../../../react-reconciler/src/instantiateReactComponent'
import ReactUpdates from '../../../react-reconciler/src/ReactUpdates'

const TopLevelWrapper = function() {
    this.rootID = topLevelRootCounter++
};

function getReactRootElementInContainer(container) {
    if (!container) {
      return null;
    }
  
    if (container.nodeType === DOC_NODE_TYPE) {
      return container.documentElement;
    } else {
      return container.firstChild;
    }
}

function getHostRootInstanceInContainer(container) {
    const rootEl = getReactRootElementInContainer(container)
    const prevHostInstance = rootEl && ReactDOMComponentTree.getInstanceFromNode(rootEl)
    return prevHostInstance && !prevHostInstance._hostParent
      ? prevHostInstance
      : null;
}

function getTopLevelWrapperInContainer(container) {
    let root = getHostRootInstanceInContainer(container)
    return root ? root._hostContainerInfo._topLevelWrapper : null
}

const ReactMount = {
    _renderNewRootComponent: function(element, container) {
        const componentInstance = instantiateReactComponent(nextElement)

        ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container)

        return componentInstance
    },
    _renderSubtreeIntoContainer: function (parentComponent, element, container, callback) {
        // ReactUpdateQueue.validateCallback(callback, 'ReactDOM.render')
        const wrappedElement = createElement(TopLevelWrapper, {
            child: element,
        })

        const prevComponent = getTopLevelWrapperInContainer(container)

        if (prevComponent) {

        }

        const reactRootElement = getReactRootElementInContainer(container)

        const component = ReactMount._renderNewRootComponent(
            wrappedElement,
            container
        )._renderedComponent.getPublicInstance()

        if (callback) {

        }

        return component
    },
    render: function(element, container, callback) {
        return ReactMount._renderSubtreeIntoContainer(
            null,
            nextElement,
            container,
            callback,
        )
    }
}