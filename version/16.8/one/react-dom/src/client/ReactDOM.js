import {
  ELEMENT_NODE,
  DOCUMENT_NODE
} from '../shared/HTMLNodeType'

import { unbatchedUpdates } from 'react-reconciler/src/ReactFiberScheduler'

import { updateContainer, createContainer } from 'react-reconciler/inline.dom'

// helper
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

// flow

function ReactWork() {
  this._callbacks = null
  this._didCommit = false
  // TODO: Avoid need to bind by replacing callbacks in the update queue with
  // list of Work objects.
  this._onCommit = this._onCommit.bind(this)
}

// TODO 目前还没运行到
ReactWork.prototype._onCommit = function() {

}

function ReactRoot(
  container,
  isConcurrent,
  hydrate
) {
  const root = createContainer(container, isConcurrent, hydrate);
  this._internalRoot = root;
}

ReactRoot.prototype.render = function(
  children,
  callback
) {
  const root = this._internalRoot
  const work = new ReactWork()
  callback = callback || null
  // 本示例为null
  if (callback !== null) {
    // work.then(callback) 
  }
  updateContainer(children, root, null, work._onCommit)
  return work
}

function legacyCreateRootFromDOMContainer(
  container,
  forceHydrate,
) {
  // about server side rendering 
  const shouldHydrate =
    forceHydrate || shouldHydrateDueToLegacyHeuristic(container) 
  // 清除根节点下所有节点
  if (!shouldHydrate) {
    let rootSibling;
    while ((rootSibling = container.lastChild)) {
      container.removeChild(rootSibling)
    }
  }
  // Legacy roots are not async by default.
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
    // 初始化绑定
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate
    )

    if (typeof callback === 'function') {
    
    }

    // 初始绑定阶段不进行批处理
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

    // Update
    if (parentComponent != null) {
      root.legacy_renderSubtreeIntoContainer(
        parentComponent,
        children,
        callback
      )
    } else {
      root.render(children, callback)
    }
  }
}

const ReactDOM = {
  render(element, container, callback) {
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