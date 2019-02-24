import { injection as EventPluginHubInjection } from '../../../events/EventPluginHub'
import DOMEventPluginOrder from '../events/DOMEventPluginOrder'
import SimpleEventPlugin from '../events/SimpleEventPlugin'

EventPluginHubInjection.injectEventPluginOrder(DOMEventPluginOrder)

EventPluginHubInjection.injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin
    // EnterLeaveEventPlugin: EnterLeaveEventPlugin,
    // ChangeEventPlugin: ChangeEventPlugin,
    // SelectEventPlugin: SelectEventPlugin,
    // BeforeInputEventPlugin: BeforeInputEventPlugin,
})

import { setComponentTree } from '../../../events/EventPluginUtils'

import {
    getNodeFromInstance,
    getFiberCurrentPropsFromNode
} from './ReactDOMComponentTree'

setComponentTree(
    getFiberCurrentPropsFromNode,
    null,
    getNodeFromInstance,
)