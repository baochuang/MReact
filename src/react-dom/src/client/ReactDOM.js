// injection
import './ReactDOMClientInjection'

import {
    createContainer,
    unbatchedUpdates,
    updateContainer
} from '../../../react-reconciler/inline.dom'

import {
    ELEMENT_NODE,
    DOCUMENT_NODE
} from '../shared/HTMLNodeType'

import { ROOT_ATTRIBUTE_NAME } from '../shared/DOMProperty'

function getReactRootElementInContainer(container) {
    if (!container) {
      return null
    }
  
    if (container.nodeType === DOCUMENT_NODE) {
      return container.documentElement
    } else {
      return container.firstChild
    }
}

function shouldHydrateDueToLegacyHeuristic(container) {
    const rootElement = getReactRootElementInContainer(container)
    return !!(
      rootElement &&
      rootElement.nodeType === ELEMENT_NODE &&
      rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME)
    )
}

function ReactRoot(
    container,
    isConcurrent,
    hydrate,
) {
    const root = createContainer(container, isConcurrent, hydrate)
    this._internalRoot = root
}

ReactRoot.prototype.render = function(children, callback) {
    const root = this._internalRoot
    const work = new ReactWork()
    callback = callback === undefined ? null : callback
    if (callback !== null) {
        work.then(callback)
    }
    updateContainer(children, root, null, work._onCommit)
    return work
}

ReactRoot.prototype.legacy_renderSubtreeIntoContainer = function( 
    parentComponent,
    children,
    callback
) {
    const root = this._internalRoot
    const work = new ReactWork()
    callback = callback === undefined ? null : callback
    if (callback !== null) {
        work.then(callback);
    }
    updateContainer(children, root, parentComponent, work._onCommit)
    return work
}

function ReactWork() {
    this._callbacks = null
    this._didCommit = false
    this._onCommit = this._onCommit.bind(this)
}

ReactWork.prototype.then = function(onCommit) {
    if (this._didCommit) {
        onCommit()
        return
      }
      let callbacks = this._callbacks
      if (callbacks === null) {
        callbacks = this._callbacks = []
      }
      callbacks.push(onCommit)
}

ReactWork.prototype._onCommit = function() {
    if (this._didCommit) {
        return
    }
    this._didCommit = true
    const callbacks = this._callbacks
    if (callbacks === null) {
        return
    }
    for (let i = 0; i < callbacks.length; i++) {
        const callback = callbacks[i]
        callback()
    }
}

function legacyCreateRootFromDOMContainer(
    container,
    forceHydrate
) {
    const shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container)

    if (!shouldHydrate) {
        let rootSibling
        while ((rootSibling = container.lastChild)) {
            container.removeChild(rootSibling)
        }
    }

    const isConcurrent = false

    return new ReactRoot(container, isConcurrent, shouldHydrate)
}

function legacyRenderSubtreeIntoContainer(
    parentComponent,
    children,
    container,
    forceHydrate,
    callback
) {
    let root = container._reactRootContainer

    if (!root) {
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
            container,
            forceHydrate
        )
        if (typeof callback === 'function') {
            
        }
        unbatchedUpdates(() => {
            if (parentComponent != null) {
                root.legacy_renderSubtreeIntoContainer(
                    parentComponent,
                    children,
                    callback
                )
            } else {
                root.render(children, callback)
            }
        })
    } else {
        if (typeof callback === 'function') {
            
        }
        if (parentComponent != null) {
            root.legacy_renderSubtreeIntoContainer(
                parentComponent,
                children,
                callback
            )
        } else {
            root.render(children, callback)
        }

        return getPublicRootInstance(root._internalRoot)
    }
}

const ReactDOM = {
    render: function(element, container, callback) {
        return legacyRenderSubtreeIntoContainer(
            null,
            element,
            container,
            false,
            callback
        )
    }
}

export default ReactDOM