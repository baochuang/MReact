import keyOf from '../../../utils/keyOf'
// import EventConstants from '../../../shared/event/EventConstants'

// const topLevelTypes = EventConstants.topLevelTypes
const eventTypes = {
    click: {
        phasedRegistrationNames: {
          bubbled: keyOf({onClick: true}),
          captured: keyOf({onClickCapture: true}),
        }
    }
}

const topLevelEventsToDispatchConfig = {
    topClick: eventTypes.click
}

for (let type in topLevelEventsToDispatchConfig) {
    topLevelEventsToDispatchConfig[type].dependencies = [type];
}

const SimpleEventPlugin = {
    eventTypes,

    extractEvents: function(
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget
    ) {
        // const dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
        // if (!dispatchConfig) {
        //   return null
        // }

        // let EventConstructor

        // switch (topLevelType) {
        //     case topLevelTypes.topClick:
        //         if (nativeEvent.button === 2) {
        //             return null
        //         }
        //         EventConstructor = SyntheticMouseEvent
        //         break
        // }

        // const event = EventConstructor.getPooled(
        //     dispatchConfig,
        //     targetInst,
        //     nativeEvent,
        //     nativeEventTarget
        // )

        // EventPropagators.accumulateTwoPhaseDispatches(event)

        // return event
    }
}

export default SimpleEventPlugin