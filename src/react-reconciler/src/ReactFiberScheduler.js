import {
    NoWork,
    Never,
    Sync,
    msToExpirationTime
} from './ReactFiberExpirationTime'

import {
    now,
    noTimeout,
    prepareForCommit,
    resetAfterCommit
} from './ReactFiberHostConfig'

import {
    ConcurrentMode,
    NoContext
} from './ReactTypeOfMode'

import {
    HostRoot
} from '../../shared/ReactWorkTags'

import {
    enableSchedulerTracing,
    enableProfilerTimer
} from '../../shared/ReactFeatureFlags'

import {
    __interactionsRef
} from '../../scheduler/src/Tracking'

import {
    unstable_getCurrentPriorityLevel as getCurrentPriorityLevel,
    unstable_ImmediatePriority as ImmediatePriority,
    unstable_UserBlockingPriority as UserBlockingPriority,
    unstable_runWithPriority as runWithPriority
} from '../../scheduler/src/Scheduler'

import { 
    markPendingPriorityLevel,
    markCommittedPriorityLevels
} from './ReactFiberPendingPriority'

import { recordScheduleUpdate } from './ReactDebugFiberPerf'

import ReactSharedInternals from '../../shared/ReactSharedInternals'

const { ReactCurrentDispatcher } = ReactSharedInternals

import { ContextOnlyDispatcher, resetHooks } from './ReactFiberHooks'

import { createWorkInProgress } from './ReactFiber'

import { 
    commitBeforeMutationLifeCycles,
    commitPlacement,
    commitWork
} from './ReactFiberCommitWork'

import { 
    PerformedWork, 
    Snapshot,
    NoEffect,
    Incomplete,
    ContentReset,
    Ref,
    Placement,
    Update,
    Deletion
} from '../../shared/ReactSideEffectTags'

import ReactCurrentOwner from '../../react/src/ReactCurrentOwner'

import { beginWork } from './ReactFiberBeginWork'

import { completeWork } from './ReactFiberCompleteWork'

let passiveEffectCallbackHandle = null
let passiveEffectCallback = null

let isBatchingUpdates = false
let isUnbatchingUpdates = false
let isRendering = false

let nextFlushedRoot = null
let nextFlushedExpirationTime = NoWork

let lastScheduledRoot = null

let originalStartTimeMs = now()
let currentRendererTime = msToExpirationTime(
    originalStartTimeMs
)
let currentSchedulerTime = currentRendererTime

let isWorking = false
let isCommitting = false

let nextRenderExpirationTime = NoWork
let nextLatestAbsoluteTimeoutMs = -1
let nextRenderDidError = false

let nextEffect = null

let nextRoot = null
let nextUnitOfWork = null

let firstScheduledRoot = null

const NESTED_UPDATE_LIMIT = 50
let nestedUpdateCount = 0
let lastCommittedRootDuringThisBatch = null

let legacyErrorBoundariesThatAlreadyFailed = null

let lowestPriorityPendingInteractiveExpirationTime = NoWork

function interactiveUpdates(fn, a, b) {
    if (
      !isBatchingUpdates &&
      !isRendering &&
      lowestPriorityPendingInteractiveExpirationTime !== NoWork
    ) {
      // Synchronously flush pending interactive updates.
      performWork(lowestPriorityPendingInteractiveExpirationTime, false)
      lowestPriorityPendingInteractiveExpirationTime = NoWork
    }
    const previousIsBatchingUpdates = isBatchingUpdates
    isBatchingUpdates = true
    try {
      return runWithPriority(UserBlockingPriority, () => {
        return fn(a, b)
      })
    } finally {
      isBatchingUpdates = previousIsBatchingUpdates
      if (!isBatchingUpdates && !isRendering) {
        performSyncWork()
      }
    }
}

function batchedUpdates(fn, a) {
    const previousIsBatchingUpdates = isBatchingUpdates
    isBatchingUpdates = true
    try {
      return fn(a)
    } finally {
      isBatchingUpdates = previousIsBatchingUpdates
      if (!isBatchingUpdates && !isRendering) {
        performSyncWork()
      }
    }
}

function resetChildExpirationTime(
    workInProgress,
    renderTime
) {
    if (renderTime !== Never && workInProgress.childExpirationTime === Never) {
        return
    }

    let newChildExpirationTime = NoWork

    if (enableProfilerTimer) {
        
    } else {
        let child = workInProgress.child
        while (child !== null) {
          const childUpdateExpirationTime = child.expirationTime
          const childChildExpirationTime = child.childExpirationTime
          if (childUpdateExpirationTime > newChildExpirationTime) {
            newChildExpirationTime = childUpdateExpirationTime
          }
          if (childChildExpirationTime > newChildExpirationTime) {
            newChildExpirationTime = childChildExpirationTime
          }
          child = child.sibling
        }
    }

    workInProgress.childExpirationTime = newChildExpirationTime
}

function completeUnitOfWork(workInProgress) {
    while (true) {
        const current = workInProgress.alternate

        const returnFiber = workInProgress.return
        const siblingFiber = workInProgress.sibling

        if ((workInProgress.effectTag & Incomplete) === NoEffect) {
            nextUnitOfWork = workInProgress

            if (enableProfilerTimer) {
                
            } else {
                nextUnitOfWork = completeWork(
                    current,
                    workInProgress,
                    nextRenderExpirationTime,
                )
            }

            resetChildExpirationTime(workInProgress, nextRenderExpirationTime)
            if (nextUnitOfWork !== null) {
                return nextUnitOfWork
            }

            if (
                returnFiber !== null &&
                (returnFiber.effectTag & Incomplete) === NoEffect
            ) {
                if (returnFiber.firstEffect === null) {
                    returnFiber.firstEffect = workInProgress.firstEffect
                }
                if (workInProgress.lastEffect !== null) {
                    if (returnFiber.lastEffect !== null) {
                      returnFiber.lastEffect.nextEffect = workInProgress.firstEffect
                    }
                    returnFiber.lastEffect = workInProgress.lastEffect
                }

                const effectTag = workInProgress.effectTag

                if (effectTag > PerformedWork) {
                    if (returnFiber.lastEffect !== null) {
                      returnFiber.lastEffect.nextEffect = workInProgress
                    } else {
                      returnFiber.firstEffect = workInProgress
                    }
                    returnFiber.lastEffect = workInProgress
                }
            }

            if (siblingFiber !== null) {
                return siblingFiber
            } else if (returnFiber !== null) {
                workInProgress = returnFiber
                continue
            } else {
                // reach the root
                return null
            }
        } else {

        }
    }
    return null
}

function onCommit(root, expirationTime) {
    root.expirationTime = expirationTime
    root.finishedWork = null
}

function commitAllHostEffects() {
    while (nextEffect !== null) {

        const effectTag = nextEffect.effectTag

        if (effectTag & ContentReset) {
            
        }

        if (effectTag & Ref) {
            
        }

        let primaryEffectTag = effectTag & (Placement | Update | Deletion)

        switch (primaryEffectTag) {
            case Placement: {
                commitPlacement(nextEffect)
                nextEffect.effectTag &= ~Placement
                break
            }
            case Update: {
                const current = nextEffect.alternate
                commitWork(current, nextEffect)
                break
            }
        }
        nextEffect = nextEffect.nextEffect
    }
}

function commitBeforeMutationLifecycles() {
    while (nextEffect !== null) {
      const effectTag = nextEffect.effectTag
      if (effectTag & Snapshot) {
        const current = nextEffect.alternate;
        commitBeforeMutationLifeCycles(current, nextEffect)
      }
  
      nextEffect = nextEffect.nextEffect
    }
}

function commitRoot(root, finishedWork) {

    isWorking = true
    isCommitting = true

    root.pendingCommitExpirationTime = NoWork

    const updateExpirationTimeBeforeCommit = finishedWork.expirationTime
    const childExpirationTimeBeforeCommit = finishedWork.childExpirationTime
    const earliestRemainingTimeBeforeCommit =
        childExpirationTimeBeforeCommit > updateExpirationTimeBeforeCommit
            ? childExpirationTimeBeforeCommit
            : updateExpirationTimeBeforeCommit

    markCommittedPriorityLevels(root, earliestRemainingTimeBeforeCommit)

    let prevInteractions

    if (enableSchedulerTracing) {
        prevInteractions = __interactionsRef.current
        __interactionsRef.current = root.memoizedInteractions
    }

    ReactCurrentOwner.current = null

    let firstEffect

    if (finishedWork.effectTag > PerformedWork) {
        if (finishedWork.lastEffect !== null) {
            finishedWork.lastEffect.nextEffect = finishedWork
            firstEffect = finishedWork.firstEffect
        } else {
            firstEffect = finishedWork
        }
    } else {
        firstEffect = finishedWork.firstEffect
    }

    prepareForCommit(root.containerInfo)

    nextEffect = firstEffect

    while (nextEffect !== null) {
        let didError = false
        let error
        try {
            commitBeforeMutationLifecycles()
        } catch (e) {
            didError = true
            error = e
        }
        if (didError) {
            if (nextEffect !== null) {
                nextEffect = nextEffect.nextEffect
            }
        }
    }

    nextEffect = firstEffect

    while (nextEffect !== null) {
        let didError = false
        let error

        try {
            commitAllHostEffects()
        } catch (e) {
            didError = true
            error = e
        }

        if (didError) {
            if (nextEffect !== null) {
                nextEffect = nextEffect.nextEffect
            }
        }
    }

    resetAfterCommit(root.containerInfo)

    root.current = finishedWork

    nextEffect = firstEffect

    while (nextEffect !== null) {
        let didError = false
        let error

        try {
            commitAllLifeCycles(root, committedExpirationTime)
        } catch (e) {
            didError = true
            error = e
        }

        if (didError) {
            if (nextEffect !== null) {
                nextEffect = nextEffect.nextEffect
            }
        }
    }

    isCommitting = false
    isWorking = false
    // onCommitRoot(finishedWork.stateNode)

    const updateExpirationTimeAfterCommit = finishedWork.expirationTime
    const childExpirationTimeAfterCommit = finishedWork.childExpirationTime
    const earliestRemainingTimeAfterCommit =
        childExpirationTimeAfterCommit > updateExpirationTimeAfterCommit
            ? childExpirationTimeAfterCommit
            : updateExpirationTimeAfterCommit
    if (earliestRemainingTimeAfterCommit === NoWork) {
        legacyErrorBoundariesThatAlreadyFailed = null
    }

    onCommit(root, earliestRemainingTimeAfterCommit)

    if (enableSchedulerTracing) {
        __interactionsRef.current = prevInteractions

        let subscriber

        try {
            subscriber = __subscriberRef.current
        } catch (error) {

        } finally {

        }
    }
}

function completeRoot(
    root,
    finishedWork,
    expirationTime
) {
    const firstBatch = root.firstBatch

    root.finishedWork = null

    if (root === lastCommittedRootDuringThisBatch) {
        nestedUpdateCount++
    } else {
        lastCommittedRootDuringThisBatch = root
        nestedUpdateCount = 0
    }

    runWithPriority(ImmediatePriority, () => {
        commitRoot(root, finishedWork);
    })
}

function onComplete(
    root,
    finishedWork,
    expirationTime
) {
    root.pendingCommitExpirationTime = expirationTime
    root.finishedWork = finishedWork
}

function unbatchedUpdates(fn, a) {
    if (isBatchingUpdates && !isUnbatchingUpdates) {
        isUnbatchingUpdates = true
        try {
            return fn(a)
          } finally {
            isUnbatchingUpdates = false
        }
    }
    return fn(a)
}

function requestCurrentTime() {
    if (isRendering) {
        return currentSchedulerTime
    }

    // Check if there's pending work.
    findHighestPriorityRoot();

    if (
        nextFlushedExpirationTime === NoWork ||
        nextFlushedExpirationTime === Never
    ) {
        // If there's no pending work, or if the pending work is offscreen, we can
        // read the current time without risk of tearing.
        recomputeCurrentRendererTime()
        currentSchedulerTime = currentRendererTime
        return currentSchedulerTime
    }

    return currentSchedulerTime
}

function computeExpirationForFiber(currentTime, fiber) {
    const priorityLevel = getCurrentPriorityLevel()

    let expirationTime

    if ((fiber.mode & ConcurrentMode) === NoContext) {
        expirationTime = Sync
    }

    return expirationTime
}

function findHighestPriorityRoot() {
    let highestPriorityWork = NoWork
    let highestPriorityRoot = null
    if (lastScheduledRoot !== null) {
        let previousScheduledRoot = lastScheduledRoot
        let root = firstScheduledRoot

        while (root !== null) {
            const remainingExpirationTime = root.expirationTime

            if (remainingExpirationTime === NoWork) {
                if (root === root.nextScheduledRoot) {
                    root.nextScheduledRoot = null
                    firstScheduledRoot = lastScheduledRoot = null
                    break
                }
            } else {
                if (remainingExpirationTime > highestPriorityWork) {
                    highestPriorityWork = remainingExpirationTime
                    highestPriorityRoot = root
                }
                if (root === lastScheduledRoot) {
                    break
                }
                if (highestPriorityWork === Sync) {
                    break
                }
                
                previousScheduledRoot = root
                root = root.nextScheduledRoot
            }
        }
    }

    nextFlushedRoot = highestPriorityRoot;
    nextFlushedExpirationTime = highestPriorityWork
}

function recomputeCurrentRendererTime() {
    const currentTimeMs = now() - originalStartTimeMs
    currentRendererTime = msToExpirationTime(currentTimeMs)
}

function flushPassiveEffects() {
    if (passiveEffectCallbackHandle !== null) {
      // cancelPassiveEffects(passiveEffectCallbackHandle)
    }
    if (passiveEffectCallback !== null) {
      // passiveEffectCallback()
    }
}

function addRootToSchedule(root, expirationTime) {
    if (root.nextScheduledRoot === null) {
        root.expirationTime = expirationTime
        if (lastScheduledRoot === null) {
            firstScheduledRoot = lastScheduledRoot = root
            root.nextScheduledRoot = root
        } else {

        }
    } else {

    }
}

function performWorkOnRoot(
    root,
    expirationTime,
    isYieldy
) {
    isRendering = true

    if (!isYieldy) {
        
        let finishedWork = root.finishedWork

        if (finishedWork !== null) {
            completeRoot(root, finishedWork, expirationTime)
        } else {
            root.finishedWork = null

            const timeoutHandle = root.timeoutHandle

            if (timeoutHandle !== noTimeout) {
                
            }

            renderRoot(root, isYieldy)
            finishedWork = root.finishedWork

            if (finishedWork !== null) {
                completeRoot(root, finishedWork, expirationTime)
            }
        }
    }
    isRendering = false
}

function resetStack() {
    if (nextUnitOfWork !== null) {
        
    }

    nextRoot = null
    nextRenderExpirationTime = NoWork
    nextLatestAbsoluteTimeoutMs = -1
    nextRenderDidError = false
    nextUnitOfWork = null
}

function workLoop(isYieldy) {
    if (!isYieldy) {
      while (nextUnitOfWork !== null) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      }
    } else {

    }
}

function performUnitOfWork(workInProgress) {
    const current = workInProgress.alternate

    // startWorkTimer(workInProgress)

    let next

    if (enableProfilerTimer) {
        
    } else {
        next = beginWork(current, workInProgress, nextRenderExpirationTime)
        workInProgress.memoizedProps = workInProgress.pendingProps
    }

    if (next === null) {
        next = completeUnitOfWork(workInProgress)
    }

    ReactCurrentOwner.current = null

    return next
}

function renderRoot(root, isYieldy) {
    flushPassiveEffects()

    isWorking = true
    
    const  previousDispatcher = ReactCurrentDispatcher.current
    ReactCurrentDispatcher.current = ContextOnlyDispatcher

    const expirationTime = root.nextExpirationTimeToWorkOn

    if (
        expirationTime !== nextRenderExpirationTime ||
        root !== nextRoot ||
        nextUnitOfWork === null
    ) {
        resetStack()
        nextRoot = root
        nextRenderExpirationTime = expirationTime
        nextUnitOfWork = createWorkInProgress(
            nextRoot.current,
            null,
            nextRenderExpirationTime,
        )
        root.pendingCommitExpirationTime = NoWork

        if (enableSchedulerTracing) {
            const interactions = new Set()
            root.pendingInteractionMap.forEach(
                (scheduledInteractions, scheduledExpirationTime) => {
                    if (scheduledExpirationTime >= expirationTime) {
                        scheduledInteractions.forEach(interaction =>
                            interactions.add(interaction),
                        )
                    }
            })

            root.memoizedInteractions = interactions

            if (interactions.size > 0) {

            }
        }

        let prevInteractions = null

        if (enableSchedulerTracing) {
            prevInteractions = __interactionsRef.current
            __interactionsRef.current = root.memoizedInteractions
        }

        let didFatal = false
        // Debug Fiber
        // startWorkLoopTimer(nextUnitOfWork)

        do {
            try {
                workLoop(isYieldy)
            } catch (thrownValue) {
                // resetContextDependences()
                resetHooks()
                if (nextUnitOfWork === null) {
                    didFatal = true
                } else {
                    const sourceFiber = nextUnitOfWork;
                    let returnFiber = sourceFiber.return;
                    if (returnFiber === null) {
                        didFatal = true
                    } else {
                        nextUnitOfWork = completeUnitOfWork(sourceFiber)
                        continue
                    }
                }
            }
            break
        } while (true)

        if (enableSchedulerTracing) {
            __interactionsRef.current = prevInteractions;
        }

        isWorking = false
        ReactCurrentDispatcher.current = previousDispatcher
        // resetContextDependences()
        resetHooks()

        if (didFatal) {
            
        }

        if (nextUnitOfWork !== null) {
        
        }

        const didCompleteRoot = true
        // stopWorkLoopTimer(interruptedBy, didCompleteRoot)
        const rootWorkInProgress = root.current.alternate

        nextRoot = null
        // interruptedBy = null

        if (nextRenderDidError) {
        
        }

        if (isYieldy && nextLatestAbsoluteTimeoutMs !== -1) {
            
        }

        // Ready to commit
        onComplete(root, rootWorkInProgress, expirationTime)
    }
}

function performWork(minExpirationTime, isYieldy) {
    findHighestPriorityRoot()

    if (isYieldy) {

    } else {
        while (
            nextFlushedRoot !== null &&
            nextFlushedExpirationTime !== NoWork &&
            minExpirationTime <= nextFlushedExpirationTime
          ) {
            performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false)
            findHighestPriorityRoot()
        }
    }
}

function performSyncWork() {
    performWork(Sync, false)
}

function requestWork(root, expirationTime) {
    addRootToSchedule(root, expirationTime)
    
    if (isRendering) {
        return
    }

    if (isBatchingUpdates) {
        return
    }

    if (expirationTime === Sync) {
        performSyncWork();
    } else {
        // scheduleCallbackWithExpirationTime(root, expirationTime);
    }
}

function scheduleWork(fiber, expirationTime) {
    const root = scheduleWorkToRoot(fiber, expirationTime)
    
    if (root === null) {

    }

    markPendingPriorityLevel(root, expirationTime)

    if (!isWorking || isCommitting || nextRoot !== root) {
        const rootExpirationTime = root.expirationTime
        requestWork(root, rootExpirationTime)
    }
}

function scheduleWorkToRoot(fiber, expirationTime) {
    recordScheduleUpdate()

    if (fiber.expirationTime < expirationTime) {
        fiber.expirationTime = expirationTime
    }

    let alternate = fiber.alternate
    if (alternate !== null && alternate.expirationTime < expirationTime) {
        alternate.expirationTime = expirationTime
    }

    let node = fiber.return
    let root = null

    if (node === null && fiber.tag === HostRoot) {
        root = fiber.stateNode
    } else {
        while (node !== null) {
            alternate = node.alternate
            if (node.childExpirationTime < expirationTime) {
              node.childExpirationTime = expirationTime
              if (
                alternate !== null &&
                alternate.childExpirationTime < expirationTime
              ) {
                alternate.childExpirationTime = expirationTime
              }
            } else if (
              alternate !== null &&
              alternate.childExpirationTime < expirationTime
            ) {
              alternate.childExpirationTime = expirationTime;
            }
            if (node.return === null && node.tag === HostRoot) {
              root = node.stateNode
              break
            }
            node = node.return
        }
    }

    if (enableSchedulerTracing) {
        if (root !== null) {
            const interactions = __interactionsRef.current

            if (interactions.size > 0) {
            
            }
        }
    }

    return root
}

export {
    batchedUpdates,
    interactiveUpdates,
    unbatchedUpdates,
    requestCurrentTime,
    computeExpirationForFiber,
    flushPassiveEffects,
    scheduleWork
}