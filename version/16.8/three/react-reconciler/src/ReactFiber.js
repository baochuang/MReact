import { NoContext } from './ReactTypeOfMode'
import { HostRoot } from '../../shared/ReactWorkTags'

function FiberNode(
    tag,
    pendingProps,
    key,
    mode
) {
    // instance
    this.tag = tag
    this.key = key
    this.memoizedState = null
    this.stateNode = null

    // fiber
    this.pendingProps = pendingProps
    
    this.mode = mode
}

const createFiber = function(
    tag,
    pendingProps,
    key,
    mode
){
    return new FiberNode(tag,pendingProps, key, mode)
}

export function createFiberFromTypeAndProps(
    type,
    pendingProps,
    key,
    mode
) {
    let fiber
    let fiberTag = IndeterminateComponent
    let resolvedType = type
    if (typeof type === 'string') {
        fiberTag = HostComponent
    } 

    fiber = createFiber(fiberTag, pendingProps, key, mode)
    fiber.elementType = type
    fiber.type = resolvedType

    return fiber
}

export function createFiberFromElement(
    element,
    mode
) {
    const type = element.type
    const key = element.key
    const pendingProps = element.props
    const fiber = createFiberFromTypeAndProps(
        type,
        pendingProps, 
        key,
        mode
    )
    return fiber
}

export function createWorkInProgress(current, pendingProps) {
    let workInProgress = current.alternate

    if (workInProgress === null) {
        workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode)

        workInProgress.stateNode = current.stateNode

        workInProgress.alternate = current
        current.alternate = workInProgress
    }

    workInProgress.updateQueue = current.updateQueue

    return workInProgress
}

export function createHostRootFiber() {
    let mode =  NoContext

    return createFiber(HostRoot, null, null, mode)
}