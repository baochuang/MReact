import SimpleEventPlugin from './SimpleEventPlugin'
import { addEventBubbleListener } from './EventListener'
import { getRawEventName } from './DOMTopLevelEventTypes'
import { interactiveUpdates } from '../../../events/ReactGenericBatching'
import getEventTarget from './getEventTarget'
import { getClosestInstanceFromNode } from '../client/ReactDOMComponentTree'
import { batchedUpdates } from '../../../events/ReactGenericBatching'
import { HostRoot } from '../../../shared/ReactWorkTags'
import { runExtractedEventsInBatch } from '../../../events/EventPluginHub'

const {isInteractiveTopLevelEventType} = SimpleEventPlugin

export let _enabled = true

const callbackBookkeepingPool = []

function findRootContainerNode(inst) {

  while (inst.return) {
    inst = inst.return
  }
  if (inst.tag !== HostRoot) {
    // This can happen if we're in a detached tree.
    return null
  }
  return inst.stateNode.containerInfo
}

function handleTopLevel(bookKeeping) {
  let targetInst = bookKeeping.targetInst

  let ancestor = targetInst
  do {
    if (!ancestor) {
      bookKeeping.ancestors.push(ancestor)
      break
    }
    const root = findRootContainerNode(ancestor)
    if (!root) {
      break
    }
    bookKeeping.ancestors.push(ancestor)
    ancestor = getClosestInstanceFromNode(root)
  } while (ancestor)

  for (let i = 0; i < bookKeeping.ancestors.length; i++) {
    targetInst = bookKeeping.ancestors[i]
    runExtractedEventsInBatch(
      bookKeeping.topLevelType,
      targetInst,
      bookKeeping.nativeEvent,
      getEventTarget(bookKeeping.nativeEvent),
    )
  }
}

function getTopLevelCallbackBookKeeping(
  topLevelType,
  nativeEvent,
  targetInst,
) {
  if (callbackBookkeepingPool.length) {
    const instance = callbackBookkeepingPool.pop()
    instance.topLevelType = topLevelType
    instance.nativeEvent = nativeEvent
    instance.targetInst = targetInst
    return instance
  }
  return {
    topLevelType,
    nativeEvent,
    targetInst,
    ancestors: []
  }
}

export function dispatchEvent(
  topLevelType,
  nativeEvent
) {
  if (!_enabled) {
    return
  }

  const nativeEventTarget = getEventTarget(nativeEvent)
  let targetInst = getClosestInstanceFromNode(nativeEventTarget)

  const bookKeeping = getTopLevelCallbackBookKeeping(
    topLevelType,
    nativeEvent,
    targetInst
  )

  try {
    // Event queue being processed in the same cycle allows
    // `preventDefault`.
    batchedUpdates(handleTopLevel, bookKeeping);
  } finally {
    // releaseTopLevelCallbackBookKeeping(bookKeeping)
  }

}

function dispatchInteractiveEvent(topLevelType, nativeEvent) {
  interactiveUpdates(dispatchEvent, topLevelType, nativeEvent)
}

export function trapBubbledEvent(
  topLevelType,
  element
) {
  if (!element) {
    return null
  }
  const dispatch = isInteractiveTopLevelEventType(topLevelType)
    ? dispatchInteractiveEvent
    : dispatchEvent

  addEventBubbleListener(
    element,
    getRawEventName(topLevelType),
    // Check if interactive and wrap in interactiveUpdates
    dispatch.bind(null, topLevelType)
  )
}

export function setEnabled(enabled) {
  _enabled = !!enabled
}

export function isEnabled() {
  return _enabled
}