import {
    NoWork,
    Never,
    Sync,
    msToExpirationTime
} from './ReactFiberExpirationTime'

import {
    now
} from './ReactFiberHostConfig'

import {
    ConcurrentMode,
    NoContext
} from './ReactTypeOfMode'

import {
    HostRoot
} from '../../shared/ReactWorkTags'

import {
    enableSchedulerTracing
} from '../../shared/ReactFeatureFlags'

import {
    __interactionsRef
} from '../../scheduler/src/Tracking'

import { markPendingPriorityLevel } from './ReactFiberPendingPriority'

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

let nextRoot = null

let firstScheduledRoot = null

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

    let node = fiber.requestCurrentTime
    let root = null

    if (node === null && fiber.tag === HostRoot) {
        root = fiber.stateNode
    } else {

    }

    if (enableSchedulerTracing) {
        if (root !== null) {
            const interactions = __interactionsRef.current

            if (interactions.size > 0) {
            
            }
        }
        return root
    }
}

export {
    unbatchedUpdates,
    requestCurrentTime,
    computeExpirationForFiber,
    flushPassiveEffects,
    scheduleWork
}