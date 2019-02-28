import SyntheticUIEvent from './SyntheticUIEvent'
import getEventModifierState from './getEventModifierState'

const SyntheticMouseEvent = SyntheticUIEvent.extend({
    button: null,
    getModifierState: getEventModifierState
})

export default SyntheticMouseEvent