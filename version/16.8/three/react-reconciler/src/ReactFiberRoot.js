export function createFiberRoot(containerInfo) {
    const uninitializedFiber = createHostRootFiber()
    const root = {
        current: uninitializedFiber,
        containerInfo: containerInfo,

        nextScheduledRoot: null
    }
    uninitializedFiber.stateNode = root
    return root
}