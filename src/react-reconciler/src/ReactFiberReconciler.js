import { createFiberRoot } from './ReactFiberRoot'

import {
    unbatchedUpdates,
    requestCurrentTime,
    computeExpirationForFiber,
    flushPassiveEffects,
    scheduleWork
} from './ReactFiberScheduler'

import {
    emptyContextObject
} from './ReactFiberContext'

import {
    enqueueUpdate
} from './ReactUpdateQueue'

export function createContainer(
    containerInfo,
    isConcurrent,
    hydrate
) {
    return createFiberRoot(containerInfo, isConcurrent, hydrate)
}

export function updateContainer(
    element,
    container,
    parentComponent,
    callback
) {
    const current = container.current
    const currentTime = requestCurrentTime()
    const expirationTime = computeExpirationForFiber(currentTime, current)
    return updateContainerAtExpirationTime(
      element,
      container,
      parentComponent,
      expirationTime,
      callback
    )
}

export function updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    expirationTime,
    callback
) {
    const current = container.current

    const context = getContextForSubtree(parentComponent)

    if (container.context === null) {
        container.context = context
    } else {
        container.pendingContext = context
    }

    return scheduleRootUpdate(current, element, expirationTime, callback)
}
import { createUpdate } from './ReactUpdateQueue'

function getContextForSubtree(parentComponent) {
    if (!parentComponent) {
        return emptyContextObject
    }
}

function scheduleRootUpdate(
    current,
    element,
    expirationTime,
    callback
) {
    const update = createUpdate(expirationTime)

    update.payload = {element}

    callback = callback === undefined ? null : callback
    if (callback !== null) {
        update.callback = callback
    }

    flushPassiveEffects()
    enqueueUpdate(current, update)
    scheduleWork(current, expirationTime)
  
    return expirationTime
}

export {
    unbatchedUpdates
}