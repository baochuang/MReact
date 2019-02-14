import { NoWork } from './ReactFiberExpirationTime'
import { IndeterminateComponent, HostRoot, HostComponent } from '../../shared/ReactWorkTags'
import { processUpdateQueue } from './ReactUpdateQueue'
import { 
    reconcileChildFibers,
    mountChildFibers
} from './ReactChildFiber'
import { renderWithHooks } from './ReactFiberHooks'

let didReceiveUpdate = false

function updateHostRoot(current, workInProgress, renderExpirationTime) {
    const updateQueue = workInProgress.updateQueue

    const nextProps = workInProgress.pendingProps
    const prevState = workInProgress.memoizedState
    const prevChildren = prevState !== null ? prevState.element : null

    processUpdateQueue(
        workInProgress,
        updateQueue,
        nextProps,
        null,
        renderExpirationTime,
    )

    const nextState = workInProgress.memoizedState
    const nextChildren = nextState.element
    if (nextChildren === prevChildren) {
        
    }

    const root = workInProgress.stateNode

    if (
        (current === null || current.child === null) &&
        root.hydrate
    ) {
    } else {
        reconcileChildren(
            current,
            workInProgress,
            nextChildren,
            renderExpirationTime,
        )
        // resetHydrationState()
    }
    return workInProgress.child
}

function updateHostComponent(current, workInProgress, renderExpirationTime) {

}

export function reconcileChildren(
    current,
    workInProgress,
    nextChildren,
    renderExpirationTime
) {
    if (current === null) {
        workInProgress.child = mountChildFibers(
            workInProgress,
            null,
            nextChildren,
            renderExpirationTime,
        )
    } else {
        workInProgress.child = reconcileChildFibers(
            workInProgress,
            current.child,
            nextChildren,
            renderExpirationTime,
        )
    }
}
function mountIndeterminateComponent(
    _current,
    workInProgress,
    Component,
    renderExpirationTime,
) {
    if (_current !== null) {
    
    }

    const props = workInProgress.pendingProps
    // const unmaskedContext = getUnmaskedContext(workInProgress, Component, false)
    // const context = getMaskedContext(workInProgress, unmaskedContext)
    const context = {}
    // prepareToReadContext(workInProgress, renderExpirationTime)

    let value

    value = renderWithHooks(
        null,
        workInProgress,
        Component,
        props,
        context,
        renderExpirationTime,
    )

    if (
        typeof value === 'object' &&
        value !== null &&
        typeof value.render === 'function' &&
        value.$$typeof === undefined
    ) {
        
    } else {
        workInProgress.tag = FunctionComponent

        reconcileChildren(null, workInProgress, value, renderExpirationTime)

        return workInProgress.child
    }

}
function beginWork(
    current,
    workInProgress,
    renderExpirationTime
) {
    const updateExpirationTime = workInProgress.expirationTime

    if (current !== null) {

    } else {
        didReceiveUpdate = false
    }

    workInProgress.expirationTime = NoWork
    debugger
    switch (workInProgress.tag) {
        case IndeterminateComponent: {
            const elementType = workInProgress.elementType
            return mountIndeterminateComponent(
              current,
              workInProgress,
              elementType,
              renderExpirationTime
            )
          }
        case HostRoot: 
            return updateHostRoot(current, workInProgress, renderExpirationTime)
        case HostComponent:
            return updateHostComponent(current, workInProgress, renderExpirationTime)
        case HostText:
            return updateHostText(current, workInProgress)
    }
}

export {
    beginWork
}