let batchingStrategy = null

function batchedUpdates(callback, a, b, c) {
    batchingStrategy.batchedUpdates(callback, a, b, c)
}

function flushBatchedUpdates() {

}

const ReactUpdatesInjection = {
    injectReconcileTransaction: function(ReconcilerTransaction) {
        ReactUpdates.ReactReconcilerTransaction = ReconcilerTransaction
    },
    injectBatchingStrategy: function(_batchingStrategy) {
        batchingStrategy = _batchingStrategy
    }
}

const ReactUpdates = {
    ReactReconcilerTransaction: null,
    injection: ReactUpdatesInjection,
    batchedUpdates,
    flushBatchedUpdates
}

export default ReactUpdates