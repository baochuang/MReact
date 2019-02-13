import { NoWork } from './ReactFiberExpirationTime'
import { IndeterminateComponent, HostRoot } from '../../shared/ReactWorkTags'

let didReceiveUpdate = false

function updateHostRoot(current, workInProgress, renderExpirationTime) {

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
    }
}