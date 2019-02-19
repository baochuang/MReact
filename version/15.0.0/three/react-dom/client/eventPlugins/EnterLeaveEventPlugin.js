import keyOf from '../../../utils/keyOf'

const eventTypes = {
    mouseEnter: {
        registrationName: keyOf({onMouseEnter: null}),
        dependencies: []
    },
    mouseLeave: {
        registrationName: keyOf({onMouseLeave: null}),
        dependencies: []
    }
}

const EnterLeaveEventPlugin = {
    eventTypes,
    extractEvents: function(
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget
    ) {
      
    }
}

export default EnterLeaveEventPlugin