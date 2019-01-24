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