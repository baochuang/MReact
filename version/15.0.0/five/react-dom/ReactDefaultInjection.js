import ReactDefaultBatchingStrategy from '../react-reconciler/ReactDefaultBatchingStrategy'
import ReactInjection from './ReactInjection'
import HTMLDOMPropertyConfig from './HTMLDOMPropertyConfig'

import DefaultEventPluginOrder from './client/eventPlugins/DefaultEventPluginOrder'

let alreadyInjected = false

function inject() {
    if (alreadyInjected) {
        return;
    }

    alreadyInjected = true

    // ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder)

    // ReactInjection.EventPluginHub.injectEventPluginsByName({
    //     SimpleEventPlugin: SimpleEventPlugin,
    //     EnterLeaveEventPlugin: EnterLeaveEventPlugin,
    //     ChangeEventPlugin: ChangeEventPlugin,
    //     SelectEventPlugin: SelectEventPlugin,
    //     BeforeInputEventPlugin: BeforeInputEventPlugin
    // })

    ReactInjection.Updates.injectBatchingStrategy(
        ReactDefaultBatchingStrategy
    )
    ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig)
}

const ReactDefaultInjection = {
    inject
}

export default ReactDefaultInjection