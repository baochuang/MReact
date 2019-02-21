export const UpdateState = 0

function appendUpdateToQueue(queue, update) {
    if (queue.lastUpdate === null) {
      queue.firstUpdate = queue.lastUpdate = update
    } else {
      queue.lastUpdate.next = update
      queue.lastUpdate = update
    }
}

export function createUpdateQueue(baseState) {
    const queue = {
        firstUpdate: null,
        lastUpdate: null
    }
    return queue
}

export function createUpdate() {
    return {
      tag: UpdateState,
      payload: null,

      next: null,
      nextEffect: null
    }
}

export function enqueueUpdate(fiber, update) {

    const queue = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)

    appendUpdateToQueue(queue, update)
}