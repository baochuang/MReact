import ReactUpdates from '../react-reconciler/ReactUpdates'
import DOMProperty from './DOMProperty'
import EventPluginHub from '../shared/event/EventPluginHub'

const ReactInjection = {
    EventPluginHub: EventPluginHub.injection,
    DOMProperty: DOMProperty.injection,
    Updates: ReactUpdates.injection
}

export default ReactInjection