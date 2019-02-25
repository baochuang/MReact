import {
    supportsHydration
} from './ReactFiberHostConfig'

let isHydrating = false
let nextHydratableInstance = null
let hydrationParentFiber = null

function resetHydrationState() {
    if (!supportsHydration) {
      return
    }
  
    hydrationParentFiber = null
    nextHydratableInstance = null
    isHydrating = false
}

function popHydrationState(fiber) {
    if (fiber !== hydrationParentFiber) {
        return false
    }
}

function tryToClaimNextHydratableInstance(fiber) {
    if (!isHydrating) {
        return
    }
    let nextInstance = nextHydratableInstance
    
    if(!nextInstance) {

    }
}

export {
    tryToClaimNextHydratableInstance,
    popHydrationState,
    resetHydrationState
}