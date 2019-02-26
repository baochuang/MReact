import {
    isEnabled as ReactBrowserEventEmitterIsEnabled,
    setEnabled as ReactBrowserEventEmitterSetEnabled,
} from '../events/ReactBrowserEventEmitter'

import { getSelectionInformation, restoreSelection } from './ReactInputSelection'

import { 
    COMMENT_NODE,
    DOCUMENT_NODE,
    DOCUMENT_FRAGMENT_NODE
} from '../shared/HTMLNodeType'

import { precacheFiberNode, updateFiberProps } from './ReactDOMComponentTree'

import {
    createElement,
    createTextNode,
    setInitialProperties,
    updateProperties
} from './ReactDOMComponent'

import {
    getChildNamespace
} from '../shared/DOMNamespaces'

export const supportsHydration = true

let eventsEnabled = null
let selectionInformation = null

export const noTimeout = -1
export const supportsMutation = true

export function commitUpdate(
    domElement,
    updatePayload,
    type,
    oldProps,
    newProps,
    internalInstanceHandle
) {
    // Update the props handle so that we know which props are the ones with
    // with current event handlers.
    updateFiberProps(domElement, newProps)
    // Apply the diff to the DOM node.
    updateProperties(domElement, updatePayload, type, oldProps, newProps)
}

export function commitTextUpdate(
    textInstance,
    oldText,
    newText
) {
    textInstance.nodeValue = newText
}

export function appendInitialChild(
    parentInstance,
    child
) {
    parentInstance.appendChild(child)
}

export function getRootHostContext(
    rootContainerInstance,
) {
    let type;
    let namespace;
    const nodeType = rootContainerInstance.nodeType;
    switch (nodeType) {
      case DOCUMENT_NODE:
      case DOCUMENT_FRAGMENT_NODE: {
        type = nodeType === DOCUMENT_NODE ? '#document' : '#fragment'
        let root = rootContainerInstance.documentElement
        namespace = root ? root.namespaceURI : getChildNamespace(null, '')
        break;
      }
      default: {
        const container =
          nodeType === COMMENT_NODE
            ? rootContainerInstance.parentNode
            : rootContainerInstance
        const ownNamespace = container.namespaceURI || null
        type = container.tagName
        namespace = getChildNamespace(ownNamespace, type)
        break
      }
    }

    return namespace
}

export function getChildHostContext(
    parentHostContext,
    type,
    rootContainerInstance
) {
    const parentNamespace = parentHostContext
    return getChildNamespace(parentNamespace, type)
}

export function finalizeInitialChildren(
    domElement,
    type,
    props,
    rootContainerInstance,
    hostContext
) {
    setInitialProperties(domElement, type, props, rootContainerInstance)
    // return shouldAutoFocusHostComponent(type, props)
    return false
}

export function createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
) {
    let parentNamespace

    parentNamespace = hostContext
    const domElement = createElement(
      type,
      props,
      rootContainerInstance,
      parentNamespace,
    )
    precacheFiberNode(internalInstanceHandle, domElement)
    updateFiberProps(domElement, props)
    return domElement
}

export function createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
)   {
    const textNode = createTextNode(text, rootContainerInstance)
    precacheFiberNode(internalInstanceHandle, textNode)
    return textNode
}

export function appendChildToContainer(
    container,
    child
) {
    let parentNode
    if (container.nodeType === COMMENT_NODE) {
      parentNode = container.parentNode
      parentNode.insertBefore(child, container)
    } else {
      parentNode = container
      parentNode.appendChild(child)
    }

    const reactRootContainer = container._reactRootContainer

    if (
        (reactRootContainer === null || reactRootContainer === undefined) &&
        parentNode.onclick === null
    ) {
        
    }
}
export function shouldSetTextContent(type, props) {
    return (
      type === 'textarea' ||
      type === 'option' ||
      type === 'noscript' ||
      typeof props.children === 'string' ||
      typeof props.children === 'number' ||
      (typeof props.dangerouslySetInnerHTML === 'object' &&
        props.dangerouslySetInnerHTML !== null &&
        props.dangerouslySetInnerHTML.__html != null)
    )
}

export function resetAfterCommit(containerInfo) {
    restoreSelection(selectionInformation)
    selectionInformation = null
    ReactBrowserEventEmitterSetEnabled(eventsEnabled)
    eventsEnabled = null
}

export function prepareForCommit(containerInfo) {
    eventsEnabled = ReactBrowserEventEmitterIsEnabled()
    selectionInformation = getSelectionInformation()
    ReactBrowserEventEmitterSetEnabled(false)
}

export {
    unstable_now as now
} from '../../../scheduler/src/Scheduler'