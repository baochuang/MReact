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
    eventTypes
}

export default ChangeEventPlugin