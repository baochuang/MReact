import Transaction from '../utils/Transaction'
import { emptyFunction } from '../constants'
import ReactUpdates from './ReactUpdates'

const RESET_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: function() {
      ReactDefaultBatchingStrategy.isBatchingUpdates = false
    }
}
  
const FLUSH_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
}

const TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES]

class ReactDefaultBatchingStrategyTransaction extends Transaction {
    constructor() {
        super()
        this.getTransactionWrappers = getTransactionWrappers
        this.reinitializeTransaction()
    }
}

function getTransactionWrappers() {
    return TRANSACTION_WRAPPERS
}
const transaction = new ReactDefaultBatchingStrategyTransaction()

const ReactDefaultBatchingStrategy = {
    isBatchingUpdates: false,

    batchedUpdates: function(callback, a, b, c) {
        const alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates

        ReactDefaultBatchingStrategy.isBatchingUpdates = true

        if (alreadyBatchingUpdates) {
            callback(a, b, c);
        } else {
            transaction.perform(callback, a, b, c);
        }
    }
}

export default ReactDefaultBatchingStrategy