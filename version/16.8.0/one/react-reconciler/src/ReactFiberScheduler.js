import {
    HostRoot 
} from '../../shared/ReactWorkTags'

import { Sync } from './ReactFiberExpirationTime'

import { createWorkInProgress } from './ReactFiber'

import { beginWork } from './ReactFiberBeginWork'

import { 
    PerformedWork
} from '../../shared/ReactSideEffectTags'

import { completeWork } from './ReactFiberCompleteWork'

let firstScheduledRoot = null
let lastScheduledRoot = null
let nextFlushedRoot = null
let nextUnitOfWork = null
let nextRoot = null

function completeUnitOfWork(workInProgress) {
    while (true) {
        const current = workInProgress.alternate

        const returnFiber = workInProgress.return
        const siblingFiber = workInProgress.sibling

        nextUnitOfWork = completeWork(
            current,
            workInProgress,
            nextRenderExpirationTime,
        )

        if (returnFiber !== null) {
            returnFiber.firstEffect = workInProgress.firstEffect

            const effectTag = workInProgress.effectTag

            if (effectTag > PerformedWork) {
                returnFiber.firstEffect = workInProgress
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
    }

    return null
}

function performUnitOfWork(workInProgress) {
    const current = workInProgress.alternate

    let next = beginWork(current, workInProgress)

    if (next === null) {
        next = completeUnitOfWork(workInProgress)
    }

    return next
}

function workLoop() {
    while (nextUnitOfWork !== null) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
}

function resetStack() {
    nextRoot = null
    nextUnitOfWork = null
}

function renderRoot(root) {
    resetStack()

    nextRoot = root

    nextUnitOfWork = createWorkInProgress(
        nextRoot.current,
        null
    )

    do {
        try {
            workLoop()
        } catch (thrownValue) {
            if (nextUnitOfWork === null) {

            } else {
                const sourceFiber = nextUnitOfWork
                let returnFiber = sourceFiber.return
                if (returnFiber === null) {

                } else {
                    nextUnitOfWork = completeUnitOfWork(sourceFiber)
                    continue
                }
            }
        }
        break
    } while (true)
}

function performWorkOnRoot(
    root
) {
    let finishedWork = root.finishedWork

    root.finishedWork = null

    renderRoot(root)

    finishedWork = root.finishedWork

    if (finishedWork !== null) {
        completeRoot(root, finishedWork, expirationTime)
    }
}

function findHighestPriorityRoot() {
    let highestPriorityWork = NoWork
    let highestPriorityRoot = null

    if (lastScheduledRoot !== null) {
        let previousScheduledRoot = lastScheduledRoot
        let root = firstScheduledRoot

        while (root !== null) {
            highestPriorityRoot = root

            if (root === lastScheduledRoot) {
                break
            }
        }
    }

    nextFlushedRoot = highestPriorityRoot
}

function performWork() {
    findHighestPriorityRoot()

    while (
        nextFlushedRoot !== null
        ) {
        performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false)
        findHighestPriorityRoot()
    }
}

function addRootToSchedule(root) {
    firstScheduledRoot = lastScheduledRoot = root
    root.nextScheduledRoot = root
}

function requestWork(root) {
    addRootToSchedule(root)

    performWork(Sync)
}

function scheduleWork(fiber) {
    const root = scheduleWorkToRoot(fiber)

    requestWork(root)
}

function scheduleWorkToRoot(fiber) {
    let root 
    
    if (fiber.tag === HostRoot ) {
        root = fiber.stateNode
    }

    return root
}

export {
    scheduleWork
}