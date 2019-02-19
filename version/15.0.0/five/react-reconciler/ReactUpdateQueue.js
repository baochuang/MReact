import ReactInstanceMap from './ReactInstanceMap'
import ReactUpdates from './ReactUpdates'

function enqueueUpdate(internalInstance) {
    ReactUpdates.enqueueUpdate(internalInstance)
}

function getInternalInstanceReadyForUpdate(publicInstance) {
    const internalInstance = ReactInstanceMap.get(publicInstance)
  
    return internalInstance
}

const ReactUpdateQueue = {
    enqueueSetState: function(publicInstance, partialState) {
        const internalInstance = getInternalInstanceReadyForUpdate(publicInstance)
    
        if (!internalInstance) {
          return
        }
    
        const queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = [])

        queue.push(partialState)
    
        enqueueUpdate(internalInstance)
    }
}

export default ReactUpdateQueue