import EventPluginRegistry from './EventPluginRegistry'

const EventPluginHub = {
    injection: {
        injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,
    
        injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName
    },
    putListener: function(inst, registrationName, listener) {
        
    }
}

export default EventPluginHub