import {
  ConcurrentMode, StrictMode, NoContext
} from './ReactTypeOfMode'

import { NoWork } from './ReactFiberExpirationTime'

// export 
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