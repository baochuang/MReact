import PooledClass from './PooledClass'

export default class CallbackQueue {
    constructor() {
        this._callbacks = null
        this._contexts = null
    }

    enqueue(callback, context) {
        this._callbacks = this._callbacks || []
        this._contexts = this._contexts || []
        this._callbacks.push(callback)
        this._contexts.push(context)
    }

    reset() {
        this._callbacks = null
        this._contexts = null
    }

    destructor() {
        this.reset()
    }

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
}

PooledClass.addPoolingTo(CallbackQueue)
