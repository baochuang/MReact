import ReactDefaultBatchingStrategy from './ReactDefaultBatchingStrategy'
import ReactReconcileTransaction from '../react-dom/client/ReactReconcileTransaction'

const batchingStrategy = ReactDefaultBatchingStrategy

const batchedUpdates = function(callback, a, b) {
    batchingStrategy.batchedUpdates(callback, a, b)
}

const ReactUpdates = {
    batchedUpdates,
    ReactReconcileTransaction
}

export default ReactUpdates