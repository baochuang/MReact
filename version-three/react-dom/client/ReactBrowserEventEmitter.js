import EventPluginRegistry from '../../shared/event/EventPluginRegistry'
import ReactEventEmitterMixin from '../../react-reconciler/ReactEventEmitterMixin'

const topEventMapping = {
    topClick: 'click'
}

const ReactBrowserEventEmitter = {
    ReactEventListener: null,
    injection: {
        injectReactEventListener: function(ReactEventListener) {
            ReactEventListener.setHandleTopLevel(
                ReactBrowserEventEmitter.handleTopLevel
            )
            ReactBrowserEventEmitter.ReactEventListener = ReactEventListener
        }
    },
    listenTo: function(registrationName, contentDocumentHandle) {
        const mountAt = contentDocumentHandle
        
        const dependencies = EventPluginRegistry.registrationNameDependencies[registrationName]

        for (let i = 0; i < dependencies.length; i++) {
            const dependency = dependencies[i]

            if (topEventMapping.hasOwnProperty(dependency)) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
            }
        }
    },
    handleTopLevel: null
}

Object.assign(ReactBrowserEventEmitter, ReactEventEmitterMixin)

export default ReactBrowserEventEmitter