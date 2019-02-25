const NormalPriority = 3
const UserBlockingPriority = 2

let currentPriorityLevel = NormalPriority

const hasNativePerformanceNow =
            typeof performance === 'object' && typeof performance.now === 'function'
            
const localDate = Date

let getCurrentTime

let globalValue = null

if (hasNativePerformanceNow) {
    const Performance = performance
    getCurrentTime = function() {
        return Performance.now()
    }
} else {
    getCurrentTime = function() {
        return localDate.now()
    }
}

if (typeof window !== 'undefined') {
    globalValue = window
} else if (typeof global !== 'undefined') {
    globalValue = global
}

if (globalValue && globalValue._schedMock) {
    const globalImpl = globalValue._schedMock
    getCurrentTime = globalImpl[3]
}

function unstable_getCurrentPriorityLevel() {
    return currentPriorityLevel
}

function unstable_runWithPriority(priorityLevel, eventHandler) {
    try {
        eventHandler()
    } finally {
        flushImmediateWork()
    }
}

function flushImmediateWork() {

}

export const unstable_ImmediatePriority = 1

export {
    unstable_getCurrentPriorityLevel,
    UserBlockingPriority as unstable_UserBlockingPriority,
    unstable_runWithPriority,
    getCurrentTime as unstable_now
}