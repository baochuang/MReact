import EventPluginHub from '../shared/event/EventPluginHub'

function runEventQueueInBatch(events) {
    EventPluginHub.enqueueEvents(events);
    EventPluginHub.processEventQueue(false);
}

const ReactEventEmitterMixin = {
    handleTopLevel: function(
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget
    ) {
      const events = EventPluginHub.extractEvents(
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget
      )
      runEventQueueInBatch(events)
    }
}

export default ReactEventEmitterMixin