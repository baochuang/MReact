import Transaction from '../utils/Transaction'
import PooledClass from '../utils/PooledClass'
import CallbackQueue from '../utils/CallbackQueue'

const NESTED_UPDATES = {
    initialize: function() {
      this.dirtyComponentsLength = dirtyComponents.length
    },
    close: function() {

    }
}
  
const UPDATE_QUEUEING = {
    initialize: function() {
      this.callbackQueue.reset()
    },
    close: function() {
      this.callbackQueue.notifyAll()
    }
}

const TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING]

const getTransactionWrappers = function() {
    return TRANSACTION_WRAPPERS
}

export class ReactUpdatesFlushTransaction extends Transaction {
    constructor() {
        super()
        this.getTransactionWrappers = getTransactionWrappers
        this.reinitializeTransaction()
        this.dirtyComponentsLength = null
        this.callbackQueue = CallbackQueue.getPooled()
    }
}

ReactUpdatesFlushTransaction.release = function(transaction) {

}

PooledClass.addPoolingTo(PooledClass)