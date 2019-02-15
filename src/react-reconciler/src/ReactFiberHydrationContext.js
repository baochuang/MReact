let isHydrating = false
let nextHydratableInstance = null

function tryToClaimNextHydratableInstance(fiber) {
    if (!isHydrating) {
        return
    }
    let nextInstance = nextHydratableInstance
    
    if(!nextInstance) {

    }
}

export {
    tryToClaimNextHydratableInstance
}