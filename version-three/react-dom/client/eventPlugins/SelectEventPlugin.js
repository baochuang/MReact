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
    eventTypes
}

export default SelectEventPlugin