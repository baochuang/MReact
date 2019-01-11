import PooledClass from './PooledClass'

export default class CallbackQueue {
    constructor() {
        this._callbacks = null
        this._contexts = null
    }
}

PooledClass.addPoolingTo(CallbackQueue)
