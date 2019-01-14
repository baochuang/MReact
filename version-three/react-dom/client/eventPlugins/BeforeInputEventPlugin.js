import keyOf from '../../../utils/keyOf'

// 阶段：冒泡和捕获
const eventTypes = {
    beforeInput: {
        phasedRegistrationNames: {
          bubbled: keyOf({onBeforeInput: null}),
          captured: keyOf({onBeforeInputCapture: null})
        },
        dependencies: []
    },
    compositionEnd: {
        phasedRegistrationNames: {
          bubbled: keyOf({onCompositionEnd: null}),
          captured: keyOf({onCompositionEndCapture: null})
        },
        dependencies: []
    },
    compositionStart: {
        phasedRegistrationNames: {
          bubbled: keyOf({onCompositionStart: null}),
          captured: keyOf({onCompositionStartCapture: null})
        },
        dependencies: []
    },
    compositionUpdate: {
        phasedRegistrationNames: {
          bubbled: keyOf({onCompositionUpdate: null}),
          captured: keyOf({onCompositionUpdateCapture: null})
        },
        dependencies: []
    }
}

const BeforeInputEventPlugin = {
    eventTypes,
    extractEvents: function(
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget
    ) {
      
    }
}

export default BeforeInputEventPlugin