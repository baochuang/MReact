import { NoWork } from "./ReactFiberExpirationTime";
import ReactSharedInternals from '../../shared/ReactSharedInternals'

const { ReactCurrentDispatcher } = ReactSharedInternals

let firstWorkInProgressHook = null

let remainingExpirationTime = NoWork
let componentUpdateQueue = null
let sideEffectTag = 0

let renderExpirationTime = NoWork
let currentlyRenderingFiber = null

let firstCurrentHook = null

let didScheduleRenderPhaseUpdate = false

export function renderWithHooks(
    current,
    workInProgress,
    Component,
    props,
    refOrContext,
    nextRenderExpirationTime
) {
    renderExpirationTime = nextRenderExpirationTime
    currentlyRenderingFiber = workInProgress
    firstCurrentHook = nextCurrentHook =
        current !== null ? current.memoizedState : null

    ReactCurrentDispatcher.current =
      nextCurrentHook === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate

    let children = Component(props, refOrContext)

    if (didScheduleRenderPhaseUpdate) {

    }

    ReactCurrentDispatcher.current = ContextOnlyDispatcher

    const renderedWork = currentlyRenderingFiber

    renderedWork.memoizedState = firstWorkInProgressHook
    renderedWork.expirationTime = remainingExpirationTime
    renderedWork.updateQueue = componentUpdateQueue
    renderedWork.effectTag |= sideEffectTag

    renderExpirationTime = NoWork
    currentlyRenderingFiber = null

    remainingExpirationTime = NoWork
    componentUpdateQueue = null
    sideEffectTag = 0
    
    return children
}

export const ContextOnlyDispatcher = {
    
}

