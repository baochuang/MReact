import keyOf from '../../../utils/keyOf'

const eventTypes = {
    change: {
        phasedRegistrationNames: {
          bubbled: keyOf({onChange: null}),
          captured: keyOf({onChangeCapture: null}),
        },
        dependencies: []
    }
}

const ChangeEventPlugin = {
    eventTypes,
    extractEvents: function(
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget
    ) {
      
    }
}

export default ChangeEventPlugin