import ReactReconcileTransaction from '../react-dom/client/ReactReconcileTransaction'

let batchingStrategy

const batchedUpdates = function(callback, a, b, c) {
    batchingStrategy.batchedUpdates(callback, a, b, c)
}

function flushBatchedUpdates() {

}

const ReactUpdatesInjection = {
    injectBatchingStrategy: function(_batchingStrategy) {
        batchingStrategy = _batchingStrategy
    }
}

const ReactUpdates = {
    batchedUpdates,
    injection: ReactUpdatesInjection,
    ReactReconcileTransaction,
    flushBatchedUpdates
}

export default ReactUpdates