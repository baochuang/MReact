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

export {
    getCurrentTime as unstable_now
}