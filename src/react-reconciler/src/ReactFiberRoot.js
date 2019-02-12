import { createHostRootFiber } from './ReactFiber'

import { enableSchedulerTracing } from '../../shared/ReactFeatureFlags'

import {
    NoWork
} from './ReactFiberExpirationTime'

export function createFiberRoot(
    containerInfo,
    isConcurrent,
    hydrate
) {
    const uninitializedFiber = createHostRootFiber(isConcurrent)

    let root

    if (enableSchedulerTracing) {
        root = ({
            current: uninitializedFiber,
            containerInfo: containerInfo,
            earliestPendingTime: NoWork,
            earliestSuspendedTime: NoWork,
            latestSuspendedTime: NoWork,
            latestPendingTime: NoWork,

            hydrate
        })
    } else {
        root = ({
            current: uninitializedFiber,
            containerInfo: containerInfo,
            earliestSuspendedTime: NoWork,
            latestSuspendedTime: NoWork,
            earliestPendingTime: NoWork,
            latestPendingTime: NoWork,

            hydrate
        })
    }

    uninitializedFiber.stateNode = root

    return root
}