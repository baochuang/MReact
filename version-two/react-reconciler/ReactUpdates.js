let batchingStrategy = null

function batchedUpdates(callback, a, b, c) {
    batchingStrategy.batchedUpdates(callback, a, b, c)
}

function flushBatchedUpdates() {

}

const ReactUpdatesInjection = {
    injectReconcileTransaction: function(ReconcileTransaction) {
        ReactUpdates.ReactReconcileTransaction = ReconcileTransaction
    },
    injectBatchingStrategy: function(_batchingStrategy) {
        batchingStrategy = _batchingStrategy
    }
}

const ReactUpdates = {
    ReactReconcileTransaction: null,
    injection: ReactUpdatesInjection,
    batchedUpdates,
    flushBatchedUpdates
}

export default ReactUpdates