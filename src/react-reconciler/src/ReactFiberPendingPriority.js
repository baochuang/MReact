import { NoWork } from './ReactFiberExpirationTime'

export function markCommittedPriorityLevels(
    root,
    earliestRemainingTime
) {
    root.didError = false
    if (earliestRemainingTime === NoWork) {
        root.earliestPendingTime = NoWork
        root.latestPendingTime = NoWork
        root.earliestSuspendedTime = NoWork
        root.latestSuspendedTime = NoWork
        root.latestPingedTime = NoWork

        findNextExpirationTimeToWorkOn(NoWork, root)

        return
    }
}

function findNextExpirationTimeToWorkOn(completedExpirationTime, root) {
    const earliestSuspendedTime = root.earliestSuspendedTime
    const latestSuspendedTime = root.latestSuspendedTime
    const earliestPendingTime = root.earliestPendingTime
    const latestPingedTime = root.latestPingedTime

    let nextExpirationTimeToWorkOn =
        earliestPendingTime !== NoWork ? earliestPendingTime : latestPingedTime

    let expirationTime = nextExpirationTimeToWorkOn

    root.nextExpirationTimeToWorkOn = nextExpirationTimeToWorkOn
    root.expirationTime = expirationTime
}

export function markPendingPriorityLevel(root, expirationTime) {
    root.didError = false

    const earliestPendingTime = root.earliestPendingTime

    if (earliestPendingTime === NoWork) {
        root.earliestPendingTime = root.latestPendingTime = expirationTime
    } else {

    }

    findNextExpirationTimeToWorkOn(expirationTime, root)
}