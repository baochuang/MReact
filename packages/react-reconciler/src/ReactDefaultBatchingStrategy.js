import Transaction from './'
const emptyFunction = function() {}

function ReactDefaultBatchingStrategyTransaction() {
    this.reinitializeTransaction();
}

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

Object.assign(
    ReactDefaultBatchingStrategyTransaction.prototype,
    Transaction.Mixin,
    {
      getTransactionWrappers: function() {
        return TRANSACTION_WRAPPERS;
      },
    }
)

const transaction = new ReactDefaultBatchingStrategyTransaction()

const ReactDefaultBatchingStrategy = {
    isBatchingUpdates: false,
    batchedUpdates: function(callback, a, b, c, d, e) {
        const alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates
    
        ReactDefaultBatchingStrategy.isBatchingUpdates = true
    
        // The code is written this way to avoid extra allocations
        if (alreadyBatchingUpdates) {
          callback(a, b, c, d, e);
        } else {
          transaction.perform(callback, null, a, b, c, d, e);
        }
    }
}