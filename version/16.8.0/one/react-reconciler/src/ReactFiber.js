import { NoContext } from './ReactTypeOfMode'
import { HostRoot } from '../../shared/ReactWorkTags'

function FiberNode(
    tag,
    mode
) {
    // instance
    this.tag = tag
    this.memoizedState = null
    this.stateNode = null

    this.mode = mode
}

const createFiber = function(
    tag,
    mode
){
    return new FiberNode(tag,  mode)
}

export function createWorkInProgress(current) {
    let workInProgress = current.alternate

    if (workInProgress === null) {
        workInProgress = createFiber(current.tag, current.mode)

        workInProgress.stateNode = current.stateNode

        workInProgress.alternate = current
        current.alternate = workInProgress
    }

    workInProgress.updateQueue = current.updateQueue

    return workInProgress
}

export function createHostRootFiber() {
    let mode =  NoContext

    return createFiber(HostRoot, mode)
}