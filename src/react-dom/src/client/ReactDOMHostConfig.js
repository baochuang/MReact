import {
    isEnabled as ReactBrowserEventEmitterIsEnabled,
    setEnabled as ReactBrowserEventEmitterSetEnabled,
} from '../events/ReactBrowserEventEmitter'

import { getSelectionInformation, restoreSelection } from './ReactInputSelection'

import { COMMENT_NODE } from '../shared/HTMLNodeType'

let eventsEnabled = null
let selectionInformation = null

export const noTimeout = -1

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