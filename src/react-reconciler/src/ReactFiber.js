import {
    NoContext,
    ConcurrentMode,
    ProfileMode,
    StrictMode,
} from './ReactTypeOfMode'

import { enableProfilerTimer } from '../../shared/ReactFeatureFlags'

import { 
    HostRoot, 
    IndeterminateComponent,
    HostComponent 
} from '../../shared/ReactWorkTags'

import { NoWork } from './ReactFiberExpirationTime'

import { NoEffect } from '../../shared/ReactSideEffectTags'

const isDevToolsPresent = false

export function createFiberFromTypeAndProps(
    type,
    key,
    pendingProps,
    owner,
    mode,
    expirationTime
) {
    let fiber
    let fiberTag = IndeterminateComponent
    let resolvedType = type
    if (typeof type === 'function') {
        
    } else if (typeof type === 'string') {
        fiberTag = HostComponent
    } else {

    }

    fiber = createFiber(fiberTag, pendingProps, key, mode)
    fiber.elementType = type
    fiber.type = resolvedType
    fiber.expirationTime = expirationTime

    return fiber
}

export function createFiberFromElement(
    element,
    mode,
    expirationTime
) {
    let owner = null
    const type = element.type
    const key = element.key
    const pendingProps = element.props
    const fiber = createFiberFromTypeAndProps(
        type,
        key,
        pendingProps,
        owner,
        mode,
        expirationTime
    )
    return fiber
}

export function createWorkInProgress(current, pendingProps, expirationTime) {
    let workInProgress = current.alternate
    if (workInProgress === null) {
        workInProgress = createFiber(
            current.tag,
            pendingProps,
            current.key,
            current.mode
        )
        workInProgress.elementType = current.elementType
        workInProgress.type = current.type
        workInProgress.stateNode = current.stateNode

        workInProgress.alternate = current
        current.alternate = workInProgress
    } else {
        workInProgress.nextEffect = null
        workInProgress.firstEffect = null
    }

    workInProgress.expirationTime = current.expirationTime
    workInProgress.childExpirationTime = current.childExpirationTime
    
    workInProgress.updateQueue = current.updateQueue
    
    return workInProgress
}

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
    this.elementType = null
    this.stateNode = null

    // fiber
    this.return = null
    this.sibling = null
    
    this.pendingProps = pendingProps
    this.memoizedProps = null
    this.updateQueue = null
    this.memoizedState = null
    
    this.mode = mode

    // Effects
    this.effectTag = NoEffect
    this.nextEffect = null

    this.firstEffect = null
    this.lastEffect = null

    this.expirationTime = NoWork
    this.childExpirationTime = NoWork

    this.alternate = null

    if (enableProfilerTimer) {
        
    }
}