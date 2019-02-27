import {
  ELEMENT_NODE,
  DOCUMENT_NODE
} from '../shared/HTMLNodeType'

import { createContainer } from 'react-reconciler/ReactFiberRoot'

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

function ReactRoot(
  container,
  isConcurrent,
  hydrate
) {
  const root = createContainer(container, isConcurrent, hydrate);
  this._internalRoot = root;
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
  parentComponen,
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