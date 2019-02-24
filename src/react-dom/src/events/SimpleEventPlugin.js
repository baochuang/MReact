import * as DOMTopLevelEventTypes from './DOMTopLevelEventTypes'
import SyntheticMouseEvent from './SyntheticMouseEvent'
import { accumulateTwoPhaseDispatches } from '../../../events/EventPropagators'

const interactiveEventTypeNames = [
    [DOMTopLevelEventTypes.TOP_CLICK, 'click']
]

const eventTypes = {}
const topLevelEventsToDispatchConfig = {}

function addEventTypeNameToConfig(
    [topEvent, event],
    isInteractive,
) {
    const capitalizedEvent = event[0].toUpperCase() + event.slice(1)
    const onEvent = 'on' + capitalizedEvent
  
    const type = {
      phasedRegistrationNames: {
        bubbled: onEvent,
        captured: onEvent + 'Capture'
      },
      dependencies: [topEvent],
      isInteractive
    }
    eventTypes[event] = type
    topLevelEventsToDispatchConfig[topEvent] = type
}

interactiveEventTypeNames.forEach(eventTuple => {
    addEventTypeNameToConfig(eventTuple, true)
})

const SimpleEventPlugin = {
    eventTypes: eventTypes,
    isInteractiveTopLevelEventType(topLevelType) {
        const config = topLevelEventsToDispatchConfig[topLevelType]
        return config !== undefined && config.isInteractive === true
    },
    extractEvents: function(
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget
    ) {
        const dispatchConfig = topLevelEventsToDispatchConfig[topLevelType]

        if (!dispatchConfig) {
          return null
        }

        let EventConstructor
        switch (topLevelType) {
            case DOMTopLevelEventTypes.TOP_CLICK:
            // Firefox creates a click event on right mouse clicks. This removes the
            // unwanted click events.
            if (nativeEvent.button === 2) {
              return null
            }
            EventConstructor = SyntheticMouseEvent
            break
            default:
            // HTML Events
            // @see http://www.w3.org/TR/html5/index.html#events-0
            // EventConstructor = SyntheticEvent
            break
        }

        const event = EventConstructor.getPooled(
            dispatchConfig,
            targetInst,
            nativeEvent,
            nativeEventTarget
        )
          
        accumulateTwoPhaseDispatches(event)
        return event
    }
}

export default SimpleEventPlugin