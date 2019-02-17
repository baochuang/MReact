let isHydrating = false
let nextHydratableInstance = null
let hydrationParentFiber = null

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
    popHydrationState
}