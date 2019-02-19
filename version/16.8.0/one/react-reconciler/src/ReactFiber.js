import { NoContext } from './ReactTypeOfMode'
import { HostRoot } from '../../shared/ReactWorkTags'

function FiberNode(
    tag,
    mode
) {
    // instance
    this.tag = tag
    
    this.mode = mode
}

const createFiber = function(
    tag,
    mode
){
    return new FiberNode(tag,  mode)
}

export function createHostRootFiber() {
    let mode =  NoContext

    return createFiber(HostRoot, mode)
}

export function createFiberRoot(containerInfo) {
    const uninitializedFiber = createHostRootFiber()
    return {
        current: uninitializedFiber,
        containerInfo: containerInfo
    }
}