import keyOf from '../../../utils/keyOf'

const DefaultEventPluginOrder = [
    keyOf({ResponderEventPlugin: null}),
    keyOf({SimpleEventPlugin: null}),
    keyOf({TapEventPlugin: null}),
    keyOf({EnterLeaveEventPlugin: null}),
    keyOf({ChangeEventPlugin: null}),
    keyOf({SelectEventPlugin: null}),
    keyOf({BeforeInputEventPlugin: null})
]

export default DefaultEventPluginOrder