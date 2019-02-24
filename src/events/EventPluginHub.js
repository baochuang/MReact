import { 
    injectEventPluginOrder,
    injectEventPluginsByName,
    plugins
} from './EventPluginRegistry'

import accumulateInto from './accumulateInto'

import { 
  getFiberCurrentPropsFromNode,
  executeDispatchesInOrder
} from './EventPluginUtils'

import forEachAccumulated from './forEachAccumulated'

let eventQueue = null

function isInteractive(tag) {
  return (
    tag === 'button' ||
    tag === 'input' ||
    tag === 'select' ||
    tag === 'textarea'
  )
}

function shouldPreventMouseEvent(name, type, props) {
  switch (name) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
      return !!(props.disabled && isInteractive(type));
    default:
      return false
  }
}

export function getListener(inst, registrationName) {
  let listener

  // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
  // live here; needs to be moved to a better place soon
  const stateNode = inst.stateNode
  if (!stateNode) {
    // Work in progress (ex: onload events in incremental mode).
    return null
  }
  const props = getFiberCurrentPropsFromNode(stateNode)
  if (!props) {
    // Work in progress.
    return null
  }
  listener = props[registrationName]
  if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
    return null
  }
  return listener
}

const executeDispatchesAndRelease = function(event) {
    if (event) {
      executeDispatchesInOrder(event)
  
      if (!event.isPersistent()) {
        event.constructor.release(event)
      }
    }
}

const executeDispatchesAndReleaseTopLevel = function(e) {
    return executeDispatchesAndRelease(e)
}

export function runEventsInBatch(events) {
    if (events !== null) {
      eventQueue = accumulateInto(eventQueue, events)
    }
  
    // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.
    const processingEventQueue = eventQueue
    eventQueue = null
  
    if (!processingEventQueue) {
      return
    }
  
    forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel)
}

  
function extractEvents(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget
) {
    let events = null
    for (let i = 0; i < plugins.length; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      const possiblePlugin = plugins[i]
      if (possiblePlugin) {
        const extractedEvents = possiblePlugin.extractEvents(
          topLevelType,
          targetInst,
          nativeEvent,
          nativeEventTarget
        )
        if (extractedEvents) {
          events = accumulateInto(events, extractedEvents)
        }
      }
    }
    return events
}

export function runExtractedEventsInBatch(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget
) {
    const events = extractEvents(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget,
    )
    runEventsInBatch(events)
}

export const injection = {
    injectEventPluginOrder,
  
    injectEventPluginsByName
}