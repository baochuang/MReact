import ReactReconcileTransaction from '../react-dom/client/ReactReconcileTransaction'

import Transaction from '../utils/Transaction'
import PooledClass from '../utils/PooledClass'
import CallbackQueue from '../utils/CallbackQueue'

let batchingStrategy
let dirtyComponents = []

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
        this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled(true)
    }
}

ReactUpdatesFlushTransaction.release = function(transaction) {

}

PooledClass.addPoolingTo(PooledClass)

function mountOrderComparator(c1, c2) {
    return c1._mountOrder - c2._mountOrder;
}

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
const batchedUpdates = function(callback, a, b, c) {
    batchingStrategy.batchedUpdates(callback, a, b, c)
}

function flushBatchedUpdates() {
    while (dirtyComponents.length) {
        const transaction = ReactUpdatesFlushTransaction.getPooled()
        transaction.perform(runBatchedUpdates, transaction)
        ReactUpdatesFlushTransaction.release(transaction)
    }
}

const ReactUpdatesInjection = {
    injectBatchingStrategy: function(_batchingStrategy) {
        batchingStrategy = _batchingStrategy
    }
}

function enqueueUpdate(component) {
    dirtyComponents.push(component)
}

const ReactUpdates = {
    batchedUpdates,
    injection: ReactUpdatesInjection,
    enqueueUpdate,
    ReactReconcileTransaction,
    flushBatchedUpdates
}

export default ReactUpdates