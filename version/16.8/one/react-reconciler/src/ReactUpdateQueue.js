let hasForceUpdate = false

export const UpdateState = 0

function appendUpdateToQueue(queue, update) {
  if (queue.lastUpdate === null) {
    queue.firstUpdate = queue.lastUpdate = update
  } else {
    queue.lastUpdate.next = update
    queue.lastUpdate = update
  }
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
  const alternate =  fiber.alternate

  let queue1
  let queue2

  if (alternate === null) {
    // 只有一个fiber
    queue1 = fiber.updateQueue
    queue2 = null

    if (queue1 === null) {
      queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)
    }
  } else {
    // update阶段使用
    // 有两个拥有者
  }

  if (queue2 === null || queue1 === queue2) {
    // 只有一个队列
    appendUpdateToQueue(queue1, queue2)
  } else {

  }
}