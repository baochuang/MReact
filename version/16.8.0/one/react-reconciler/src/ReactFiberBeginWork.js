function beginWork(
    current,
    workInProgress
) {
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
        case HostRoot: 
            return updateHostRoot(current, workInProgress, renderExpirationTime)
        case HostComponent:
            return updateHostComponent(current, workInProgress, renderExpirationTime)
        case HostText:
            return updateHostText(current, workInProgress)
    }
}

export {
    beginWork
}