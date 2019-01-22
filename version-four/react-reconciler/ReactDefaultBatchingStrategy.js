import { emptyFunction } from '../constants'
import Transaction from '../utils/Transaction'

const RESET_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: emptyFunction
}
  
const FLUSH_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: emptyFunction
}
  
const TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES]

class ReactDefaultBatchingStrategyTransaction extends Transaction {
    constructor() {
        super()
        this.getTransactionWrappers = getTransactionWrappers
        this.reinitializeTransaction()
    }
}

const getTransactionWrappers = function() {
    return TRANSACTION_WRAPPERS
}

const transaction = new ReactDefaultBatchingStrategyTransaction()

const ReactDefaultBatchingStrategy = {
    isBatchingUpdates: false,

    batchedUpdates: function(callback, a, b) {
        const alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates

        ReactDefaultBatchingStrategy.isBatchingUpdates = true

        if (alreadyBatchingUpdates) {
            callback(a, b)
        } else {
            transaction.perform(callback, a, b)
        }
    }
}

export default ReactDefaultBatchingStrategy
