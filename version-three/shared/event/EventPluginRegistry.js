let EventPluginOrder = null
const namesToPlugins = {}

const EventPluginRegistry = {
    registrationNameModules: {},
    registrationNameDependencies: {},
    injectEventPluginOrder: function(InjectedEventPluginOrder) {
        EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder)
        recomputePluginOrdering()
    },
    injectEventPluginsByName: function(injectedNamesToPlugins) {
        let isOrderingDirty = false
        for (var pluginName in injectedNamesToPlugins) {
            if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
              continue
            }
            const PluginModule = injectedNamesToPlugins[pluginName]
            if (!namesToPlugins.hasOwnProperty(pluginName) ||
                namesToPlugins[pluginName] !== PluginModule) {
                    namesToPlugins[pluginName] = PluginModule
                    isOrderingDirty = true
            }
        }
        if (isOrderingDirty) {
            recomputePluginOrdering()
        }
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
            publishEventForPlugin(
                publishedEvents[eventName],
                PluginModule,
                eventName
            )
        }
    }
}

function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {

    const phasedRegistrationNames = dispatchConfig.phasedRegistrationNames

    if (phasedRegistrationNames) {
        for (let phaseName in phasedRegistrationNames) {
            if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
                const phasedRegistrationName = phasedRegistrationNames[phaseName]
                publishRegistrationName(
                    phasedRegistrationName,
                    PluginModule,
                    eventName
                )
            }
        }
        return true
    } else if (dispatchConfig.registrationName) {
        publishRegistrationName(
            dispatchConfig.registrationName,
            PluginModule,
            eventName
        )
        return true
    }
    return false
}

function publishRegistrationName(registrationName, PluginModule, eventName) {
    EventPluginRegistry.registrationNameModules[registrationName] = PluginModule
    EventPluginRegistry.registrationNameDependencies[registrationName] =
        PluginModule.eventTypes[eventName].dependencies
}

export default EventPluginRegistry