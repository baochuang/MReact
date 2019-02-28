import { createFiberRoot } from './ReactFiberRoot'

import { 
  requestCurrentTime,
  computeExpirationForFiber,
  flushPassiveEffects,
  scheduleWork
} from './ReactFiberScheduler'

import {
  emptyContextObject
} from './ReactFiberContext'

import {createUpdate, enqueueUpdate} from './ReactUpdateQueue'

// helper
function getContextForSubtree(parentComponent) {
  if (!parentComponent) {
    return emptyContextObject
  }
  // 这里目前没有添加context，所以todo
}

// used by render 
function scheduleRootUpdate(
  current,
  element,
  expirationTime,
  callback
) {
  const update = createUpdate(expirationTime)
  update.payload = { element }
  
  callback = callback || null
  if (callback !== null) {
    update.callback = callback
  }

  flushPassiveEffects() // 目前啥也没干
  enqueueUpdate(current, update) // todo
  // 进入调度
  scheduleWork(current, expirationTime)

  return expirationTime
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

export function updateContainer(
  element,
  container,
  parentComponent,
  callback
) {
  const current = container.current // 这里是FiberNode对象
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

export function createContainer(
  containerInfo,
  isConcurrent,
  hydrate
) {
  return createFiberRoot(containerInfo, isConcurrent, hydrate)
}