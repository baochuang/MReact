import keyOf from '../../../utils/keyOf'

const eventTypes = {
    select: {
        phasedRegistrationNames: {
          bubbled: keyOf({onSelect: null}),
          captured: keyOf({onSelectCapture: null}),
        },
        dependencies: []
    }
}

const SelectEventPlugin = {
    eventTypes,
    extractEvents: function(
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget
    ) {
      
    }
}

export default SelectEventPlugin