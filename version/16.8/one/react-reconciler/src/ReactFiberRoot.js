import {enableSchedulerTracing} from 'shared/ReactFeatureFlags'
import {NoWork} from './ReactFiberExpirationTime'
import {noTimeout} from './ReactFiberHostConfig'
import { createHostRootFiber } from './ReactFiber'

export function createFiberRoot(
  containerInfo,
  isConcurrent,
  hydrate
) {
  const uninitializedFiber = createHostRootFiber(isConcurrent)

  let root
  if (enableSchedulerTracing) {
  
  } else {
    root = {
      current: uninitializedFiber,
      containerInfo: containerInfo,
      pendingChildren: null,

      pingCache: null,

      earliestPendingTime: NoWork,
      latestPendingTime: NoWork,
      earliestSuspendedTime: NoWork,
      latestSuspendedTime: NoWork,
      latestPingedTime: NoWork,

      didError: false,

      pendingCommitExpirationTime: NoWork,
      finishedWork: null,
      timeoutHandle: noTimeout,
      context: null,
      pendingContext: null,
      hydrate,
      nextExpirationTimeToWorkOn: NoWork,
      expirationTime: NoWork,
      firstBatch: null,
      nextScheduledRoot: null
    }
  }

  uninitializedFiber.stateNode = root

  return root
}