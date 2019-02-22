import { createFiberRoot } from './ReactFiberRoot'
import { enqueueUpdate, createUpdate } from './ReactUpdateQueue'
import { scheduleWork } from './ReactFiberScheduler'

function completeUnitOfWork(workInProgress) {
    while (true) {
        const current = workInProgress.alternate
    }
}

function scheduleRootUpdate(
    current,
    element
) {
    const update = createUpdate()

    update.payload = {element}

    enqueueUpdate(current, update)
    scheduleWork(current, expirationTime)
}

export function updateContainer(
    element,
    container
) {
    const current = container.current

    scheduleRootUpdate(current, element)
}

export function createContainer(
    containerInfo
) {
    return createFiberRoot(containerInfo)
}