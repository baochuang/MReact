import {
  ConcurrentMode, StrictMode, NoContext
} from './ReactTypeOfMode'

import { NoWork } from './ReactFiberExpirationTime'
import { HostRoot } from 'shared/ReactWorkTags'
import { NoEffect } from 'shared/ReactSideEffectTags' 

// export 
// 创建一个alternate fiber执行任务
export function createWorkInProgress(
  current,
  pendingProps,
  expirationTime
) {
  let workInProgress = current.alternate

  if (workInProgress === null) {
    // 使用alternate作为双缓存技术中的载体
    workInProgress = createFiber(
      current.tag,
      pendingProps,
      current.key,
      current.mode,
    )
    workInProgress.elementType = current.elementType
    workInProgress.type = current.type
    workInProgress.stateNode = current.stateNode

    workInProgress.alternate = current
    current.alternate = workInProgress
  } else {
    workInProgress.pendingProps = pendingProps

    // Reset the effect tag.
    workInProgress.effectTag = NoEffect

    // The effect list is no longer valid.
    workInProgress.nextEffect = null
    workInProgress.firstEffect = null
    workInProgress.lastEffect = null
  }

  workInProgress.childExpirationTime = current.childExpirationTime
  workInProgress.expirationTime = current.expirationTime

  workInProgress.child = current.child
  workInProgress.memoizedProps = current.memoizedProps
  workInProgress.memoizedState = current.memoizedState
  workInProgress.updateQueue = current.updateQueue
  workInProgress.contextDependencies = current.contextDependencies

  // These will be overridden during the parent's reconciliation
  workInProgress.sibling = current.sibling
  workInProgress.index = current.index
  workInProgress.ref = current.ref

  return workInProgress;
}

export function createHostRootFiber(isConcurrent) {
  let mode = isConcurrent ? ConcurrentMode | StrictMode : NoContext

  return createFiber(HostRoot, null, null, mode)
}

// inner
const createFiber = function(
  tag,
  pendingProps,
  key,
  mode
) {
  return new FiberNode(tag, pendingProps, key, mode)
}

function FiberNode(
  tag,
  pendingProps,
  key,
  mode,
) {
  // Instance
  this.tag = tag
  this.key = key
  this.elementType = null
  this.type = null
  this.stateNode = null

  // Fiber
  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0

  this.ref = null

  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null
  this.memoizedState = null
  this.contextDependencies = null

  this.mode = mode

  // Effects
  this.effectTag = NoEffect
  this.nextEffect = null

  this.firstEffect = null
  this.lastEffect = null

  this.expirationTime = NoWork
  this.childExpirationTime = NoWork

  this.alternate = null
}