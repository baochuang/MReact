export const UpdateState = 0

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