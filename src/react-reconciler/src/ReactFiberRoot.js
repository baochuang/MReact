import { createHostRootFiber } from './ReactFiber'

import { enableSchedulerTracing } from '../../shared/ReactFeatureFlags'

import {
    NoWork
} from './ReactFiberExpirationTime'

import { noTimeout } from './ReactFiberHostConfig'

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
            latestPingedTime: NoWork,

            pendingCommitExpirationTime: NoWork,
            finishedWork: null,
            timeoutHandle: noTimeout,
            hydrate,
            nextExpirationTimeToWorkOn: NoWork,
            firstBatch: null,
            nextScheduledRoot: null,

            memoizedInteractions: new Set(),
            pendingInteractionMap: new Map()
        })
    } else {
        root = ({
            current: uninitializedFiber,
            containerInfo: containerInfo,

            earliestSuspendedTime: NoWork,
            latestSuspendedTime: NoWork,
            earliestPendingTime: NoWork,
            latestPendingTime: NoWork,
            latestPingedTime: NoWork,

            pendingCommitExpirationTime: NoWork,
            finishedWork: null,
            timeoutHandle: noTimeout,
            hydrate,
            nextExpirationTimeToWorkOn: NoWork,
            firstBatch: null,
            nextScheduledRoot: null
        })
    }

    uninitializedFiber.stateNode = root

    return root
}