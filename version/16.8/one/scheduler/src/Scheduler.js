const ImmediatePriority = 1
const UserBlockingPriority = 2
const NormalPriority = 3
const LowPriority = 4
const IdlePriority = 5

let getCurrentTime
let currentPriorityLevel = NormalPriority

const hasNativePerformanceNow =
  typeof performance === 'object' && typeof performance.now === 'function'

const localDate = Date

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

function unstable_getCurrentPriorityLevel() {
  return currentPriorityLevel
}

// unstable的原因是准备换成Symbol
export {
  ImmediatePriority as unstable_ImmediatePriority,
  UserBlockingPriority as unstable_UserBlockingPriority,
  NormalPriority as unstable_NormalPriority,
  IdlePriority as unstable_IdlePriority,
  LowPriority as unstable_LowPriority,
  unstable_getCurrentPriorityLevel,
  getCurrentTime as unstable_now
}