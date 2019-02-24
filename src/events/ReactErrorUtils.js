import invokeGuardedCallbackImpl from '../shared/invokeGuardedCallbackImpl'

const reporter = {
  onError(error) {
    hasError = true;
    caughtError = error
  }
}

export function invokeGuardedCallback(
    name,
    func,
    context,
    a,
    b,
    c,
    d,
    e,
    f,
  ) {
    invokeGuardedCallbackImpl.apply(reporter, arguments);
}

export function invokeGuardedCallbackAndCatchFirstError(
  name,
  func,
  context,
  a,
  b,
  c,
  d,
  e,
  f
) {
  invokeGuardedCallback.apply(this, arguments)
}