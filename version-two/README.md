# State & 生命周期

## Transaction
```
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 ```
 
### ReactDefaultBatchingStrategyTransaction

#### Wrappers(TRANSACTION_WRAPPERS)
FLUSH_BATCHED_UPDATES
```
const FLUSH_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
}
```
RESET_BATCHED_UPDATES
 ```
 const RESET_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: function() {
        ReactDefaultBatchingStrategy.isBatchingUpdates = false
    }
}
```

#### perform
```
ReactDefaultBatchingStrategy.isBatchingUpdates = true

perform(callback, a, b, c)
```

### ReactReconcilerTransaction
```
this.reactMountReady = CallbackQueue.getPooled(null)
```
#### Wrappers(TRANSACTION_WRAPPERS)
ON_DOM_READY_QUEUEING
```
const ON_DOM_READY_QUEUEING = {
    initialize: function() {
        this.reactMountReady.reset()
    },
    close: function() {
        this.reactMountReady.notifyAll()
    }
}
```

### ReactUpdatesFlushTransaction

#### Wappers(TRANSACTION_WRAPPER)
NESTED_UPDATES
```
const NESTED_UPDATES = {
    initialize: function() {
      this.dirtyComponentsLength = dirtyComponents.length
    },
    close: function() {
        if (this.dirtyComponentsLength !== dirtyComponents.length) {
            
        } else {
            dirtyComponents.length = 0
        }
    }
}
```
UPDATE_QUEUEING
```
const UPDATE_QUEUEING = {
    initialize: function() {
      this.callbackQueue.reset()
    },
    close: function() {
      this.callbackQueue.notifyAll()
    }
}
```
### CallbackQueue
enqueue
```
enqueue(callback, context) {
    this._callbacks = this._callbacks || []
    this._contexts = this._contexts || []
    this._callbacks.push(callback)
    this._contexts.push(context)
}
```
reset
```
reset() {
    this._callbacks = null
    this._contexts = null
}
```
notifyAll
```
notifyAll() {
    const callbacks = this._callbacks
    const contexts = this._contexts
    if (callbacks) {
        this._callbacks = null
        this._contexts = null
        for (var i = 0; i < callbacks.length; i++) {
        callbacks[i].call(contexts[i])
        }
        callbacks.length = 0
        contexts.length = 0
    }
}
```
#### Usage enqueue
componentDidMount
```
transaction.getReactMountReady().enqueue(inst.componentDidMount, inst)
```
componentDidUpdate
```
transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState), inst)
```

## setState实现
```
this.setState({
    date: new Date()
})
```
next step
```
this.updater.enqueueSetState(this, {
    date: new Date()
})
```
ReactUpdateQueue
```
ReactUpdateQueue.enqueueSetState(internalInstance) {
    ...
    ReactUpdates.enqueueUpdate(internalInstance)
}
```
ReactUpdates.enqueueUpdate
```
{
    if (!batchingStrategy.isBatchingUpdates) {
        batchingStrategy.batchedUpdates(enqueueUpdate, component)
    }

    dirtyComponents.push(component)
}
```
ReactDefaultBatchingStrategy.batchedUpdates
```
transaction.perform(callback, a, b, c)
```
flushBatchedUpdates:ReactUpdates.flushBatchedUpdates
```
function flushBatchedUpdates() {
    let count = 1
    while (dirtyComponents.length && count < 100) {
        const transaction = ReactUpdatesFlushTransaction.getPooled()
        transaction.perform(runBatchedUpdates, transaction)
        ReactUpdatesFlushTransaction.release(transaction)
        count++
    }
}
```
runBatchedUpdates
```
function runBatchedUpdates(transaction) {
    const len = transaction.dirtyComponentsLength

    dirtyComponents.sort(mountOrderComparator)

    for (var i = 0; i < len; i++) {
        var component = dirtyComponents[i]

        ReactReconciler.performUpdateIfNecessary(
            component,
            transaction.reconcileTransaction
        )
    }
}
```
updateComponent
```
updateComponent(
    transaction,
    prevParentElement,
    nextParentElement,
    ) {
    const inst = this._instance

    const nextState = this._processPendingState(nextProps)
    
}
```
_processPendingState
```
_processPendingState(props) {
    const inst = this._instance
    const queue = this._pendingStateQueue
    this._pendingStateQueue = null
    if (!queue) {
        return inst.state
    }

    if (queue.length === 1) {
        return queue[0]
    }

    const nextState = Object.assign({}, inst.state)

    for (let i = 0; i < queue.length; i++) {
        const partial = queue[i]
        Object.assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props) : partial)
    }

    return nextState
}
```
_performComponentUpdate
```
_performComponentUpdate(
    nextElement,
    nextProps,
    nextState,
    transaction
) {
    
}
```
_updateRenderedComponent
```
ReactReconciler.receiveComponent(
    prevComponentInstance,
    nextRenderedElement,
    transaction
)
```
ReactDOMComponent实例方法receiveComponent
```
receiveComponent(nextElement, transaction) {
    const prevElement = this._currentElement
    this._currentElement = nextElement
    this.updateComponent(transaction, prevElement)
}
```
ReactDOMComponent实例方法updateComponent
```
updateComponent(transaction, prevElement) {
    const lastProps = prevElement.props
    const nextProps = this._currentElement.props

    this._updateDOMChildren(
        lastProps,
        nextProps,
        transaction
    )
}
```
_updateDOMChildren
```
_updateDOMChildren(lastProps, nextProps, transaction) {
    const lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null
    const nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null

    const lastChildren = lastContent != null ? null : lastProps.children
    const nextChildren = nextContent != null ? null : nextProps.children

    if (nextContent != null) {
        if (lastContent !== nextContent) {
        
        }
    } else if (nextChildren != null) {
        this.updateChildren(nextChildren, transaction)
    } 
}
```
updateChildren
```
updateChildren: function(nextNestedChildrenElements, transaction) {
    const prevChildren = this._renderedChildren
    const removedNodes = {}
    const nextChildren = this._reconcilerUpdateChildren(
        prevChildren,
        nextNestedChildrenElements,
        removedNodes,
        transaction
    )
}
```
