import { createFiberRoot } from './ReactFiber'

function scheduleRootUpdate(
    current,
    element,
    expirationTime
) {
    const update = createUpdate(expirationTime)

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