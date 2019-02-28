import { NoWork } from './ReactFiberExpirationTime'

// helper
function findNextExpirationTimeToWorkOn(completedExpirationTime, root) {
  const earliestSuspendedTime = root.earliestSuspendedTime
  const latestSuspendedTime = root.latestSuspendedTime
  const earliestPendingTime = root.earliestPendingTime
  const latestPingedTime = root.latestPingedTime

  // 在earliest pending time执行任务.失败的话，则转为latest pinged time
  let nextExpirationTimeToWorkOn = earliestPendingTime !== NoWork 
    ? earliestPendingTime
    : latestPingedTime

  // 如果没有正在进行的 或者pinged work，则检查是否有暂停的任务
  // 这比我们刚完成的任务优先级还要低
  if (
    nextExpirationTimeToWorkOn === NoWork &&
    (completedExpirationTime === NoWork ||
      latestSuspendedTime< completedExpirationTime)
  ) {
    nextExpirationTimeToWorkOn = latestSuspendedTime
  }

  let expirationTime = nextExpirationTimeToWorkOn
  if (expirationTime !== NoWork && earliestSuspendedTime > expirationTime) {
    expirationTime = earliestSuspendedTime
  }

  root.nextExpirationTimeToWorkOn = nextExpirationTimeToWorkOn
  root.expirationTime = expirationTime
}

// export
export function markPendingPriorityLevel(root, expirationTime) {
  root.didError = false

  // 更新最新和最早pending时间
  const earliestPendingTime = root.earliestPendingTime
  if (earliestPendingTime === NoWork) {
    root.earliestPendingTime = root.latestPendingTime = expirationTime
  } else {
    if (earliestPendingTime < expirationTime) {
      root.earliestPendingTime = expirationTime
    } else {
      const latestPendingTime = root.latestPendingTime
      if (latestPendingTime > expirationTime) {
        root.latestPendingTime = expirationTime
      }
    }
  }

  findNextExpirationTimeToWorkOn(expirationTime, root)
}