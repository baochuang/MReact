import { NoWork, Never } from './ReactFiberExpirationTime'
import { IndeterminateComponent, HostRoot, HostComponent, HostText } from '../../shared/ReactWorkTags'
import { processUpdateQueue } from './ReactUpdateQueue'
import { 
    reconcileChildFibers,
    mountChildFibers
} from './ReactChildFiber'
import { renderWithHooks } from './ReactFiberHooks'
import { FunctionComponent } from '../../shared/ReactWorkTags'
import { ContentReset } from '../../shared/ReactSideEffectTags'
import { shouldSetTextContent } from './ReactFiberHostConfig'

import { tryToClaimNextHydratableInstance } from './ReactFiberHydrationContext'

import { pushHostContext, pushHostContainer  } from './ReactFiberHostContext'
 
let didReceiveUpdate = false

function updateHostText(current, workInProgress) {
    if (current === null) {
      tryToClaimNextHydratableInstance(workInProgress)
    }

    return null
}

function pushHostRootContext(workInProgress) {
    const root = workInProgress.stateNode
    // if (root.pendingContext) {
    //   pushTopLevelContextObject(
    //     workInProgress,
    //     root.pendingContext,
    //     root.pendingContext !== root.context,
    //   )
    // } else if (root.context) {
    //   // Should always be set
    //   pushTopLevelContextObject(workInProgress, root.context, false)
    // }
    pushHostContainer(workInProgress, root.containerInfo)
}

function updateHostRoot(current, workInProgress, renderExpirationTime) {
    pushHostRootContext(workInProgress)
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
    pushHostContext(workInProgress)

    if (current === null) {
    
    } 

    const type = workInProgress.type
    const nextProps = workInProgress.pendingProps
    const prevProps = current !== null ? current.memoizedProps : null

    let nextChildren = nextProps.children
    const isDirectTextChild = shouldSetTextContent(type, nextProps)

    if (isDirectTextChild) {
        nextChildren = null
    } else if(prevProps !== null && shouldSetTextContent(type, prevProps)) {
        workInProgress.effectTag |= ContentReset
    } 

    // markRef

    reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime)

    return workInProgress.child
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