import { NoWork } from './ReactFiberExpirationTime'
import { Callback } from '../../shared/ReactSideEffectTags'

export const UpdateState = 0

let hasForceUpdate = false

function getStateFromUpdate(
  workInProgress,
  queue,
  update,
  prevState,
  nextProps,
  instance
) {
  switch (update.tag) {
    case UpdateState: {
      const payload = update.payload
      let partialState
      if (typeof payload === 'function') {
        
      } else {
        partialState = payload
      }
      if (partialState === null || partialState === undefined) {
        return prevState
      }
      return Object.assign({}, prevState, partialState)
    }
  }
}

function cloneUpdateQueue(currentQueue) {
  const queue = {
    baseState: currentQueue.baseState,
    firstUpdate: currentQueue.firstUpdate,
    lastUpdate: currentQueue.lastUpdate,

    firstCapturedUpdate: null,
    lastCapturedUpdate: null,

    firstEffect: null,
    lastEffect: null,

    firstCapturedEffect: null,
    lastCapturedEffect: null
  }
  return queue
}

function ensureWorkInProgressQueueIsAClone(
  workInProgress,
  queue
) {
  const current = workInProgress.alternate
  if (current !== null) {
    if (queue === current.updateQueue) {
      queue = workInProgress.updateQueue = cloneUpdateQueue(queue)
    }
  }
  return queue
}

export function processUpdateQueue(
  workInProgress,
  queue,
  props,
  instance,
  renderExpirationTime
) {
  hasForceUpdate = false

  queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue)

  let newBaseState = queue.baseState
  let newFirstUpdate = null
  let newExpirationTime = NoWork

  let update = queue.firstUpdate
  let resultState = newBaseState
  while (update !== null) {
    const updateExpirationTime = update.expirationTime

    if (updateExpirationTime < renderExpirationTime) {
      if (newFirstUpdate === null) {
        
      }
      if (newExpirationTime < updateExpirationTime) {
        
      }
    } else {
      resultState = getStateFromUpdate(
        workInProgress,
        queue,
        update,
        resultState,
        props,
        instance,
      )

      const callback = update.callback

      if (callback !== null) {
        workInProgress.effectTag |= Callback
        update.nextEffect = null

        if (queue.lastEffect === null) {
          queue.firstEffect = queue.lastEffect = update;
        } else {
        }
      }
    }
    update = update.next
  }
  let newFirstCapturedUpdate = null
  update = queue.firstCapturedUpdate

  while (update !== null) {

  }

  if (newFirstUpdate === null) {
    queue.lastUpdate = null
  }

  if (newFirstCapturedUpdate === null) {
    queue.lastCapturedUpdate = null
  } else {
    workInProgress.effectTag |= Callback
  }

  if (newFirstUpdate === null && newFirstCapturedUpdate === null) {
    newBaseState = resultState
  }

  queue.baseState = newBaseState
  queue.firstUpdate = newFirstUpdate
  queue.firstCapturedUpdate = newFirstCapturedUpdate

  workInProgress.expirationTime = newExpirationTime
  workInProgress.memoizedState = resultState
}

export function createUpdate(expirationTime) {
    return {
      expirationTime: expirationTime,
  
      tag: UpdateState,
      payload: null,
      callback: null,
  
      next: null,
      nextEffect: null
    }
}

export function createUpdateQueue(baseState) {
  const queue = {
    baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  }
  return queue
}

export function enqueueUpdate(fiber, update) {
  const alternate = fiber.alternate

  let queue1
  let queue2

  if (alternate === null) {
    queue1 = fiber.updateQueue
    queue2 = null

    if (queue1 === null) {
      queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)
    }
  } else {

  }

  if (queue2 === null || queue1 === queue2) {
    appendUpdateToQueue(queue1, update)
  } else {

  }
}

function appendUpdateToQueue(queue, update) {
  if (queue.lastUpdate === null) {
    queue.firstUpdate = queue.lastUpdate = update
  } else {
    queue.lastUpdate.next = update
    queue.lastUpdate = update
  }
}