export const UpdateState = 0

function getStateFromUpdate(
  update
) {
  switch (update.tag) {
    case UpdateState: {
      const payload = update.payload
      let partialState = payload
      return Object.assign({}, partialState)
    }
  }
}

export function processUpdateQueue(
  workInProgress,
  queue
) {
  const update = queue.firstUpdate
  let resultState
  while (update !== null) {
    resultState = getStateFromUpdate(
      update
    )

    const callback = update.callback

    if (callback !== null) {
      workInProgress.effectTag |= Callback
      update.nextEffect = null
  
      queue.firstEffect = queue.lastEffect = update
    }

    update = update.next
  }
  
  workInProgress.memoizedState = resultState
}

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