function invokeGuardedCallback(name, func, a, b) {
    try {
      return func(a, b)
    } catch (x) {
      if (caughtError === null) {
        caughtError = x
      }
      return undefined
    }
}

const ReactErrorUtils = {
    invokeGuardedCallback
}

export default ReactErrorUtils