import { NoWork } from "./ReactFiberExpirationTime";
import ReactSharedInternals from '../../shared/ReactSharedInternals'

const { ReactCurrentDispatcher } = ReactSharedInternals

import { 
    scheduleWork,
    computeExpirationForFiber,
    flushPassiveEffects,
    requestCurrentTime 
} from './ReactFiberScheduler'

import is from '../../shared/objectls'

import {
    Update as UpdateEffect,
    Passive as PassiveEffect,
} from '../../shared/ReactSideEffectTags'

import { markWorkInProgressReceivedUpdate } from './ReactFiberBeginWork'

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

let numberOfReRenders = 0
const RE_RENDER_LIMIT = 25

let renderPhaseUpdates = null

let didReceiveUpdate = false

let nextWorkInProgressHook = null
let currentHook = null

function updateWorkInProgressHook() {
    if (nextWorkInProgressHook !== null) {
      // There's already a work-in-progress. Reuse it.
      workInProgressHook = nextWorkInProgressHook
      nextWorkInProgressHook = workInProgressHook.next
  
      currentHook = nextCurrentHook
      nextCurrentHook = currentHook !== null ? currentHook.next : null
    } else {
      // Clone from the current hook.
      currentHook = nextCurrentHook
  
      const newHook = {
        memoizedState: currentHook.memoizedState,
  
        baseState: currentHook.baseState,
        queue: currentHook.queue,
        baseUpdate: currentHook.baseUpdate,
  
        next: null
      }
  
      if (workInProgressHook === null) {
        // This is the first hook in the list.
        workInProgressHook = firstWorkInProgressHook = newHook
      } else {
        // Append to the end of the list.
        workInProgressHook = workInProgressHook.next = newHook
      }
      nextCurrentHook = currentHook.next
    }
    return workInProgressHook
}

function updateReducer(
    reducer,
    initialArg,
    init
) {
    const hook = updateWorkInProgressHook()
    const queue = hook.queue

    if (numberOfReRenders > 0) {
        
    }

    const last = queue.last

    const baseUpdate = hook.baseUpdate
    const baseState = hook.baseState

    let first 
    if (baseUpdate!== null) {
        if (last !== null) {
            last.next = null
        }
        first = baseUpdate.next
    } else {
        first = last !== null ? last.next : null
    }
    if (first !== null) {
        let newState = baseState;
        let newBaseState = null
        let newBaseUpdate = null
        let prevUpdate = baseUpdate
        let update = first
        let didSkip = false

        do {
            const updateExpirationTime = update.expirationTime

            if (updateExpirationTime < renderExpirationTime) {
            
            } else {
                // Process this update.
                if (update.eagerReducer === reducer) {
                    newState = update.eagerState
                } else {

                }
            }
            prevUpdate = update
            update = update.next
        } while (update !== null && update !== first)

        if (!didSkip) {
            newBaseUpdate = prevUpdate;
            newBaseState = newState;
        }

        // Mark that the fiber performed work, but only if the new state is
        // different from the current state.
        if (!is(newState, hook.memoizedState)) {
            markWorkInProgressReceivedUpdate()
        }

        hook.memoizedState = newState
        hook.baseUpdate = newBaseUpdate
        hook.baseState = newBaseState
    
        queue.eagerReducer = reducer
        queue.eagerState = newState
    }

    const dispatch = queue.dispatch
    return [hook.memoizedState, dispatch]
}

export function bailoutHooks(
    current,
    workInProgress,
    expirationTime
  ) {
    workInProgress.updateQueue = current.updateQueue
    workInProgress.effectTag &= ~(PassiveEffect | UpdateEffect)
    if (current.expirationTime <= expirationTime) {
      current.expirationTime = NoWork
    }
}

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

    currentHook = null
    nextWorkInProgressHook = null

    didScheduleRenderPhaseUpdate = false
    numberOfReRenders = 0
}

function updateCallback() {

}

function updateState(initialState) {
    return updateReducer(basicStateReducer, initialState)
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
    } else {
        flushPassiveEffects()

        const currentTime = requestCurrentTime()
        const expirationTime = computeExpirationForFiber(currentTime, fiber)
    
        const update = {
          expirationTime,
          action,
          eagerReducer: null,
          eagerState: null,
          next: null
        }

        // Append the update to the end of the list.
        const last = queue.last
        if (last === null) {
            // This is the first update. Create a circular list.
            update.next = update
        } else {
            const first = last.next
            if (first !== null) {
                // Still circular.
                update.next = first
            }
            last.next = update
        }
        queue.last = update

        if (
            fiber.expirationTime === NoWork &&
            (alternate === null || alternate.expirationTime === NoWork)
        ) {
            const eagerReducer = queue.eagerReducer
            if (eagerReducer !== null) {
                let prevDispatcher

                try {
                    const currentState = queue.eagerState
                    const eagerState = eagerReducer(currentState, action)

                    update.eagerReducer = eagerReducer
                    update.eagerState = eagerState
                    if (is(eagerState, currentState)) {
                      return
                    }
                  } catch (error) {

                  } finally {

                  }
            }
        }
        scheduleWork(fiber, expirationTime)
    }
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
    useState: mountState,
    // useReducer: mountReducer,
}

const HooksDispatcherOnUpdate = {
    useCallback: updateCallback,
    useState: updateState,
    // useReducer: updateReducer
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
        do {
            didScheduleRenderPhaseUpdate = false

            numberOfReRenders++

                  // Start over from the beginning of the list
            firstCurrentHook = nextCurrentHook =
                current !== null ? current.memoizedState : null
            nextWorkInProgressHook = firstWorkInProgressHook

            currentHook = null
            workInProgressHook = null
            componentUpdateQueue = null

            ReactCurrentDispatcher.current = HooksDispatcherOnUpdate

            children = Component(props, refOrContext)
        } while (didScheduleRenderPhaseUpdate)

        renderPhaseUpdates = null
        numberOfReRenders = 0
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

