import PooledClass from '../../utils/PooledClass'
import Transaction from '../../utils/Transaction'
import CallbackQueue from  '../../utils/CallbackQueue'
import { emptyFunction } from '../../constants'

const ON_DOM_READY_QUEUEING = {
    initialize: function() {
        this.reactMountReady.reset()
    },
    close: function() {
        this.reactMountReady.notifyAll()
    }
}

const RESET_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: emptyFunction
}
  
const FLUSH_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: emptyFunction
}

const TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES, ON_DOM_READY_QUEUEING]

export default class ReactReconcilerTransaction extends Transaction {
    constructor(useCreateElement) {
        super()
        this.getTransactionWrappers = getTransactionWrappers
        this.reinitializeTransaction()
        this.getReactMountReady = getReactMountReady
        this.reactMountReady = CallbackQueue.getPooled(null)
        this.useCreateElement = useCreateElement
    }
}

function getReactMountReady() {
    return this.reactMountReady
}

function getTransactionWrappers() {
    return TRANSACTION_WRAPPERS
}

PooledClass.addPoolingTo(ReactReconcilerTransaction)