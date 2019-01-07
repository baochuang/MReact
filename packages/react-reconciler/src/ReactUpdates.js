let batchingStrategy = null

function ensureInjected() {

}

function batchedUpdates(callback, a, b, c, d, e) {
    ensureInjected();
    batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
}

const ReactUpdatesInjection = {
    injectBatchingStrategy: function(_batchingStrategy) {
        batchingStrategy = _batchingStrategy
    }
}

const ReactUpdates = {
    batchedUpdates,
    injection: ReactUpdatesInjection
}

export default ReactUpdates