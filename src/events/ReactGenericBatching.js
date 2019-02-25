let isBatching = false

let _batchedUpdatesImpl = function(fn, bookkeeping) {
    return fn(bookkeeping)
}

export function batchedUpdates(fn, bookkeeping) {
  if (isBatching) {
    return fn(bookkeeping)
  }
  isBatching = true
  try {
    return _batchedUpdatesImpl(fn, bookkeeping)
  } finally {
    isBatching = false
  }
}

let _interactiveUpdatesImpl = function(fn, a, b) {
    return fn(a, b)
}

export function interactiveUpdates(fn, a, b) {
    return _interactiveUpdatesImpl(fn, a, b)
}
  
export function setBatchingImplementation(
  batchedUpdatesImpl,
  interactiveUpdatesImpl,
  flushInteractiveUpdatesImpl
) {
  _batchedUpdatesImpl = batchedUpdatesImpl
  _interactiveUpdatesImpl = interactiveUpdatesImpl
  // _flushInteractiveUpdatesImpl = flushInteractiveUpdatesImpl
}