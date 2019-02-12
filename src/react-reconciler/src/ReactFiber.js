import {
    NoContext,
    ConcurrentMode,
    ProfileMode,
    StrictMode,
} from './ReactTypeOfMode'

import { enableProfilerTimer } from '../../shared/ReactFeatureFlags'

import { HostRoot } from '../../shared/ReactWorkTags'

const isDevToolsPresent = false

export function createHostRootFiber(isConcurrent) {
    let mode = isConcurrent ? ConcurrentMode | StrictMode : NoContext

    if (enableProfilerTimer && isDevToolsPresent) {
        mode |= ProfileMode
    }

    return createFiber(HostRoot, null, null, mode)
}

const createFiber = function(
    tag,
    pendingProps,
    key,
    mode
){
    return new FiberNode(tag, pendingProps, key, mode)
}

function FiberNode(
    tag,
    pendingProps,
    key,
    mode
) {
    // instance
    this.tag = tag
    this.key = key
    this.stateNode = null

    // fiber
    this.return = null
    
    this.updateQueue = null
    this.memoizedState = null
    
    this.mode = mode

    this.alternate = null

    if (enableProfilerTimer) {
        
    }
}