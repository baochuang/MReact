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
let nextCurrentHook  = null

let workInProgressHook = null

let didScheduleRenderPhaseUpdate = false

export function resetHooks() {
    ReactCurrentDispatcher.current = ContextOnlyDispatcher

    sideEffectTag = 0
    currentlyRenderingFiber = null
    firstWorkInProgressHook = null
    remainingExpirationTime = NoWork
    componentUpdateQueue = null
    renderExpirationTime = NoWork
    currentlyRenderingFiber = null;

    firstCurrentHook = null
    nextCurrentHook = null
    workInProgressHook = null
    
    didScheduleRenderPhaseUpdate = false
}

function updateCallback() {

}

function updateState() {

}

function dispatchAction(
    fiber,
    queue,
    action
) {
    const alternate = fiber.alternate;
    if (
      fiber === currentlyRenderingFiber ||
      (alternate !== null && alternate === currentlyRenderingFiber)
    ) {
        didScheduleRenderPhaseUpdate = true
    }

    // todo
}

function basicStateReducer(state, action) {
    return typeof action === 'function' ? action(state) : action
}

function mountWorkInProgressHook() {
    const hook = {
        memoizedState: null,

        baseState: null,
        queue: null,
        baseUpdate: null,
    
        next: null
    }

    if (workInProgressHook === null) {
        firstWorkInProgressHook = workInProgressHook = hook
    } else {
        workInProgressHook = workInProgressHook.next = hook
    }

    return workInProgressHook
}

function mountCallback(callback, deps) {
    const hook = mountWorkInProgressHook()

    const nextDeps = deps === undefined ? null : deps
    hook.memoizedState = [callback, nextDeps]
    
    return callback
}

function mountState(initialState) {
    const hook = mountWorkInProgressHook()

    if (typeof initialState === 'function') {
        initialState = initialState()
    }

    hook.memoizedState = hook.baseState = initialState

    const queue = (hook.queue = {
        last: null,
        dispatch: null,
        eagerReducer: basicStateReducer,
        eagerState: initialState
    })

    const dispatch =  (queue.dispatch = (dispatchAction.bind(
        null,
        currentlyRenderingFiber,
        queue
    )))
    return [hook.memoizedState, dispatch]
}

const HooksDispatcherOnMount = {
    useCallback: mountCallback,
    useState: mountState
}

const HooksDispatcherOnUpdate = {
    useCallback: updateCallback,
    useState: updateState,
}

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

