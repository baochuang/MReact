import { pushHostContainer } from './ReactFiberHostContext'
import { processUpdateQueue } from './ReactUpdateQueue'

import { 
    reconcileChildFibers,
    mountChildFibers
} from './ReactChildFiber'

import {
    HostRoot,
    IndeterminateComponent,
    HostText,
    HostComponent
} from '../../shared/ReactWorkTags'

export function reconcileChildren(
    current,
    workInProgress,
    nextChildren
) {
    if (current === null) {
        workInProgress.child = mountChildFibers(
            workInProgress,
            null,
            nextChildren
        )
    } else {
        workInProgress.child = reconcileChildFibers(
            workInProgress,
            current.child,
            nextChildren
        )
    }
}

function pushHostRootContext(workInProgress) {
    const root = workInProgress.stateNode

    pushHostContainer(workInProgress, root.containerInfo)
}

function updateHostRoot(current, workInProgress) {
    pushHostRootContext(workInProgress)

    const updateQueue = workInProgress.updateQueue

    processUpdateQueue(
        workInProgress,
        updateQueue
    )

    const nextState = workInProgress.memoizedState

    const nextChildren = nextState.element

    const root = workInProgress.stateNode

    reconcileChildren(
        current,
        workInProgress,
        nextChildren
    )

    return workInProgress.child
}

function beginWork(
    current,
    workInProgress
) {
    switch (workInProgress.tag) {
        case IndeterminateComponent: {
            // const elementType = workInProgress.elementType
            // return mountIndeterminateComponent(
            //   current,
            //   workInProgress,
            //   elementType,
            //   renderExpirationTime
            // )
        }
        case HostRoot: 
            return updateHostRoot(current, workInProgress, renderExpirationTime)
        case HostComponent:
        //     return updateHostComponent(current, workInProgress, renderExpirationTime)
        case HostText:
            return null
    }
}

export {
    beginWork
}