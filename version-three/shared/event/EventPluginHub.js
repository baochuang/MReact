import EventPluginRegistry from './EventPluginRegistry'
import accumulateInto from '../../utils/accumulateInto'
import EventPluginUtils from './EventPluginUtils'

let eventQueue = null

const executeDispatchesAndReleaseTopLevel = function(e) {
    return executeDispatchesAndRelease(e, false)
}

const executeDispatchesAndRelease = function(event, simulated) {
    if (event) {
      EventPluginUtils.executeDispatchesInOrder(event, simulated)
  
      if (!event.isPersistent()) {
        event.constructor.release(event)
      }
    }
}

const EventPluginHub = {
    injection: {
        injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,
        injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName
    },
    extractEvents: function(
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget
    ) {
        let events
        const plugins = EventPluginRegistry.plugins
        for (let i = 0; i < plugins.length; i++) {
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
    },

    enqueueEvents(events) {
        if (events) {
            eventQueue = accumulateInto(eventQueue, events)
        }
    },

    processEventQueue: function(simulated) {
        const processingEventQueue = eventQueue

        eventQueue = null

        if (simulated) {
        
        } else {
            forEachAccumulated(
                processingEventQueue,
                executeDispatchesAndReleaseTopLevel
            )
        }
    },

    putListener: function(inst, registrationName, listener) {
        
    }
}

export default EventPluginHub