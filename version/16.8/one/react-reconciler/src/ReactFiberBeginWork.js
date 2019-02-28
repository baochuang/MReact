import {
  IndeterminateComponent,
  FunctionComponent,
  HostRoot,
  HostComponent,
  HostText
} from 'shared/ReactWorkTags'

let didReceiveUpdate = false

// process
function beginWork(current, workInProgress, renderExpirationTime) {
  const updateExpirationTime = workInProgress.expirationTime

  if (current !== null) {
    const oldProps = current.memoizedProps
    const newProps = workInProgress.pendingProps

    if (oldProps !== newProps || hasLegacyContextChanged()) {
      didReceiveUpdate = true
    } else if (updateExpirationTime < renderExpirationTime) { // update阶段才会被执行，内部状态变化
      didReceiveUpdate = false
      // working阶段，解析React组件
      switch (workInProgress.tag) {

      }
    } else {
      didReceiveUpdate = false
    }

    // 进入begin阶段 清除expirationTime
    workInProgress.expirationTime = NoWork

    switch (workInProgress.tag) {
      case IndeterminateComponent: {
        const elementType = workInProgress.elementType
        return mountIndeterminateComponent(
          current,
          workInProgress,
          elementType,
          renderExpirationTime
        )
      }
      case FunctionComponent: {
        const Component = workInProgress.type
        const unresolvedProps = workInProgress.pendingProps
        const resolvedProps =
          workInProgress.elementType === Component
            ? unresolvedProps
            : resolveDefaultProps(Component, unresolvedProps)
        return updateFunctionComponent(
          current,
          workInProgress,
          Component,
          resolvedProps,
          renderExpirationTime
        )
      }
      case HostRoot:
        return updateHostRoot(current, workInProgress, renderExpirationTime)
      case HostComponent:
        return updateHostComponent(current, workInProgress, renderExpirationTime)
      case HostText:
        return updateHostText(current, workInProgress)
    }
  }
}

export {
  beginWork
}