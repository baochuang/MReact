import ReactErrorUtils from '../../utils/ReactErrorUtils'

let ComponentTree

const injection =  {
    injectComponentTree: function(Injected) {
        ComponentTree = Injected
    }
}

function executeDispatchesInOrder(event, simulated) {
    const dispatchListeners = event._dispatchListeners
    const dispatchInstances = event._dispatchInstances

    if (Array.isArray(dispatchListeners)) {
        
    } else if (dispatchListeners) {
        executeDispatch(event, simulated, dispatchListeners, dispatchInstances)
    }
    event._dispatchListeners = null
    event._dispatchInstances = null
}

function executeDispatch(event, simulated, listener, inst) {
    const type = event.type || 'unknown-event'

    event.currentTarget = EventPluginUtils.getNodeFromInstance(inst)

    if (simulated) {
    
    } else {
        ReactErrorUtils.invokeGuardedCallback(type, listener, event)
    }
    event.currentTarget = null
}

const EventPluginUtils = {
    executeDispatchesInOrder,
    getNodeFromInstance: function(node) {
        return ComponentTree.getNodeFromInstance(node);
    },
    injection
}

export default EventPluginUtils