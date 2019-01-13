let EventPluginOrder = null
const namesToPlugins = {}

const EventPluginRegistry = {
    registrationNameModules: {},
    injectEventPluginOrder: function(InjectedEventPluginOrder) {
        EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
        recomputePluginOrdering();
    }
}

function recomputePluginOrdering() {
    if (!EventPluginOrder) {
        return
    }
    for (var pluginName in namesToPlugins) {
        const PluginModule = namesToPlugins[pluginName]

        const publishedEvents = PluginModule.eventTypes

        for (var eventName in publishedEvents) {

        }
    }
}