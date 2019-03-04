import { msToExpirationTime, NoWork, Never, Sync } from './ReactFiberExpirationTime'

import { now, noTimeout } from './ReactFiberHostConfig'

import {
  unstable_getCurrentPriorityLevel as getCurrentPriorityLevel,
  unstable_ImmediatePriority as ImmediatePriority,
  unstable_UserBlockingPriority as UserBlockingPriority,
  unstable_NormalPriority as NormalPriority,
  unstable_LowPriority as LowPriority,
  unstable_IdlePriority as IdlePriority
} from 'scheduler'

import { HostRoot } from 'shared/ReactWorkTags'

import { markPendingPriorityLevel } from './ReactFiberPendingPriority'

import { ConcurrentMode, NoContext } from './ReactTypeOfMode'

import ReactSharedInternals from 'shared/ReactSharedInternals'

import { ContextOnlyDispatcher } from './ReactFiberHooks'

import { createWorkInProgress } from './ReactFiber'

const { ReactCurrentDispatcher, ReactCurrentOwner } = ReactSharedInternals

import { beginWork } from './ReactFiberBeginWork'

let isBatchingUpdates = false
let isUnbatchingUpdates = false

let isRendering = false
let isWorking = false
let isCommitting = false

let nextUnitOfWork = null
let nextRoot = null

let originalStartTimeMs = now()
let currentRendererTime = msToExpirationTime(
  originalStartTimeMs
)
let currentSchedulerTime = currentRendererTime

let nextFlushedRoot = null
let nextFlushedExpirationTime = NoWork

let firstScheduledRoot = null
let lastScheduledRoot = null

// 性能跟踪
let interruptedBy = null

// 任务执行中使用
let nextRenderExpirationTime = NoWork

let lowestPriorityPendingInteractiveExpirationTime = NoWork

let passiveEffectCallbackHandle = null
let passiveEffectCallback = null

// 限制update次数
const NESTED_UPDATE_LIMIT = 50
let nestedUpdateCount = 0

// process

function performUnitOfWork(workInProgress) {
  
  const current = workInProgress.alternate

  let next 

  next = beginWork(current, workInProgress, nextRenderExpirationTime)
  workInProgress.memoizedProps = workInProgress.pendingProps

  if (next === null) {
    // If this doesn't spawn new work, complete the current work.
    next = completeUnitOfWork(workInProgress)
  }

  ReactCurrentOwner.current = null

  return next
}

function workLoop(isYieldy) {
  if (!isYieldy) {
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  } else {

  }
}

function renderRoot(root, isYieldy) {
  // 还是不知道干啥
  flushPassiveEffects()

  isWorking = true

  const previousDispatcher = ReactCurrentDispatcher.current
  ReactCurrentDispatcher.current = ContextOnlyDispatcher

  const expirationTime = root.nextExpirationTimeToWorkOn

  // 是开始一个新的stack还是从先前的yield work恢复
  if (
    expirationTime !== nextRenderExpirationTime ||
    root != nextRoot ||
    nextUnitOfWork === null
  ) {
    resetStack()
    nextRoot = root
    nextRenderExpirationTime = expirationTime
    nextUnitOfWork = createWorkInProgress(
      nextRoot.current,
      null,
      nextRenderExpirationTime
    )
    root.pendingCommitExpirationTime = NoWork
  }

  do {
    try {
      workLoop(isYieldy)
    } catch (thrownValue) {
      console.log(thrownValue) // 仅作为开发调试使用
    }
    break
  } while (true)
}

function performWorkOnRoot(root, expirationTime, isYieldy) {
  isRendering = true

  if (!isYieldy) {
    let finishedWork = root.finishedWork

    if (finishedWork !== null) {
      // commit it
      completeRoot(root, finishedWork, expirationTime)
    } else {
      root.finishedWork = null

      const timeoutHandle = root.timeoutHandle

      if (timeoutHandle !== noTimeout) {
        // root.timeoutHandle = noTimeout
      }

      renderRoot(root, isYieldy)

      finishedWork = root.finishedWork
      
      if (finishedWork !== null) {
        // commit it
        completeRoot(root, finishedWork, expirationTime)
      }
    }
  } else {

  }

  isRendering = false
}

function performWork(minExpirationTime, isYieldy) {
  // 一直执行任务直到所有任务结束或者更高优先级任务出现
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
    // Flush work 在批处理的结尾
    if (isUnbatchingUpdates) {
      nextFlushedRoot = root
      nextFlushedExpirationTime = Sync
      // performWorkOnRoot(root, Sync, false)
    }
    return
  }

  if (expirationTime === Sync) {
    performSyncWork()
  } else {
    // scheduleCallbackWithExpirationTime(root, expirationTime)
  }
}

// todo
function scheduleWorkToRoot(fiber, expirationTime) {

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

  }

  return root
}

function scheduleWork(fiber, expirationTime) {
  const root = scheduleWorkToRoot(fiber, expirationTime)
  if (root === null) {
    return
  }

  if (
    isWorking 
    && nextFlushedExpirationTime !== NoWork 
    && expirationTime > nextRenderExpirationTime
  ) {
    // 强制中断（用于性能跟踪）
    interruptedBy = fiber
    resetStack()
  }
  // 设置执行任务的优先级
  markPendingPriorityLevel(root, expirationTime)

  if (
    !isWorking ||
    isCommitting ||
    // 和正在rendering的root不同
    nextRoot !== root
  ) {
    const rootExpirationTime = root.expirationTime
    requestWork(root, rootExpirationTime)
  }

  if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
    nestedUpdateCount = 0
    // update超出限制次数提示
  }
}

// helper
function addRootToSchedule(root, expirationTime) {
  if (root.nextScheduledRoot === null) {
    root.expirationTime = expirationTime
    if (lastScheduledRoot === null) {
      firstScheduledRoot = lastScheduledRoot = root
    } else {
      // lastScheduledRoot.nextScheduledRoot = root 不明白为何有这么一段
      lastScheduledRoot = root
      lastScheduledRoot.nextScheduledRoot = firstScheduledRoot
    }
  } else {
    const remainingExpirationTime = root.expirationTime
    if (expirationTime > remainingExpirationTime) {
      // 提高优先级
      root.expirationTime = expirationTime
    }
  }
}

function resetStack() {
  if (nextUnitOfWork !== null) {
    let interruptedWork = nextUnitOfWork.return
    while (interruptedWork !== null) {
      // 目前不知道干啥的
      unwindInterruptedWork(interruptedWork)
      interruptedWork = interruptedWork.return
    } 
  }

  nextRoot = null
  nextRenderExpirationTime = NoWork
  // nextLatestAbsoluteTimeoutMs = -1
  // nextRenderDidError = false
  nextUnitOfWork = null
}

function flushPassiveEffects() {
  // 目前两个变量都为空
  if (passiveEffectCallbackHandle !== null) {

  }
  if (passiveEffectCallback !== null) {

  }
}

function computeExpirationForFiber(currentTime, fiber) {
  const priorityLevel = getCurrentPriorityLevel()

  let expirationTime

  if ((fiber.mode & ConcurrentMode) === NoContext) {
    // 非并发模式下，更新一直处于同步
    expirationTime = Sync
  } else if (isWorking && !isCommitting) {
    // 在渲染阶段，更新在当前渲染期间到期
    expirationTime = nextRenderExpirationTime
  } else {
    switch (priorityLevel) {
      case ImmediatePriority:
        expirationTime = Sync
        break
      case UserBlockingPriority:
        // expirationTime = computeInteractiveExpiration(currentTime)
        break
      case NormalPriority:
        // 并发更新
        expirationTime = computeAsyncExpiration(currentTime)
        break
      case LowPriority:
      case IdlePriority:
        expirationTime = Never
        break
      default:
        break
    }

    // 如果任务在渲染tree阶段，那么在同一个到期时间里不要更新
    if (nextRoot !== null && expirationTime === nextRenderExpirationTime) {
      expirationTime -= 1
    }
  }

  // 低优先级的处理
  if (priorityLevel === UserBlockingPriority && 
    (lowestPriorityPendingInteractiveExpirationTime === NoWork ||
      expirationTime < lowestPriorityPendingInteractiveExpirationTime) 
  ) {
    lowestPriorityPendingInteractiveExpirationTime = expirationTime
  }

  return expirationTime
}

// 找到最好优先级的FiberRoot
function findHighestPriorityRoot() {
  let highestPriorityWork = NoWork
  let highestPriorityRoot = null

  // addRootToSchedule后不再为空
  if (lastScheduledRoot !== null) {
    let previousScheduledRoot = lastScheduledRoot
    let root = firstScheduledRoot
    while (root !== null) {
      const remainingExpirationTime = root.expirationTime;
      if (remainingExpirationTime === NoWork) {
        if (root === root.nextScheduledRoot) {
          // 唯一root
          root.nextScheduledRoot = null
          firstScheduledRoot = lastScheduledRoot = null
          break
        } else if (root === firstScheduledRoot) {
          // first root
          const next = root.nextScheduledRoot
          firstScheduledRoot = next
          lastScheduledRoot.nextScheduledRoot = next
          root.nextScheduledRoot = null
        } else if (root === lastScheduledRoot) {
          // last root
          lastScheduledRoot = previousScheduledRoot
          lastScheduledRoot.nextScheduledRoot = firstScheduledRoot
          root.nextScheduledRoot = null
          break
        } else {
          previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot
          root.nextScheduledRoot = null
        }
        root = previousScheduledRoot.nextScheduledRoot
      } else {
        if (remainingExpirationTime > highestPriorityWork) {
          // 更新优先级
          highestPriorityWork = remainingExpirationTime
          highestPriorityRoot = root
        }
        if (root === lastScheduledRoot) {
          break
        }
        if (highestPriorityWork === Sync) {
          // Sync为最高优先级， 停止搜索
          break
        }
        previousScheduledRoot = root
        root = root.nextScheduledRoot
      }
    }
  }

  nextFlushedRoot = highestPriorityRoot
  nextFlushedExpirationTime = highestPriorityWork
}

function recomputeCurrentRendererTime() {
  const currentTimeMs = now() - originalStartTimeMs
  currentRendererTime = msToExpirationTime(currentTimeMs)
}
// 用于计算到期时间,通过本函数返回的开始时间计算
// 在同一事件中，如安排了两个更新，我们将它们的开始时间视为同步
// 因为到期时间决定了批量更新的方式，所以我们希望同一事件中发生的所有优先级一致的更新收到相同的到期时间
// Fiber跟踪两个时间，渲染时间和调度时间，渲染时间可以随时更新。这个需要performance.now API的支持
// 如果没有待处理的工作或者不在事件当中，则只能更新调度程序时间
function requestCurrentTime() {
  if (isRendering) {
    return currentSchedulerTime
  }

  // 检查是否还有任务在进行
  findHighestPriorityRoot()

  if (
    nextFlushedExpirationTime === NoWork ||
    nextFlushedExpirationTime === Never
  ) {
    // 如果没有正在进行的任务，或者正在进行的任务离开屏幕，我们可以无撕裂风险读取到当前时间
    recomputeCurrentRendererTime()
    currentSchedulerTime = currentRendererTime
    return currentSchedulerTime
  }

  return currentSchedulerTime
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

export {
  scheduleWork,
  requestCurrentTime,
  computeExpirationForFiber,
  unbatchedUpdates,
  flushPassiveEffects
}