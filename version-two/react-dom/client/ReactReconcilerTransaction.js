import Transaction from '../../utils/Transaction'
import PooledClass from '../../utils/PooledClass'
import CallbackQueue from '../../utils/CallbackQueue'

const SELECTION_RESTORATION = {
    // initialize: ReactInputSelection.getSelectionInformation,
    // close: ReactInputSelection.restoreSelection,
    initialize: function() {

    },
    close: function() {

    }
}

const EVENT_SUPPRESSION = {
    initialize: function() {
    //   var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
    //   ReactBrowserEventEmitter.setEnabled(false);
    //   return currentlyEnabled;
    },
    close: function(previouslyEnabled) {
    //   ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
    }
}

const ON_DOM_READY_QUEUEING = {
    initialize: function() {

    },
    close: function() {

    }
}

const TRANSACTION_WRAPPERS = [
    SELECTION_RESTORATION,
    EVENT_SUPPRESSION,
    ON_DOM_READY_QUEUEING,
]

export default class ReactReconcilerTransaction extends Transaction {
    constructor(useCreateElement) {
        super()
        this.getTransactionWrappers = getTransactionWrappers
        this.reinitializeTransaction()
        this.getReactMountReady = getReactMountReady
        this.reactMountReady = CallbackQueue.getPooled(null)
        this.useCreateElement = useCreateElement;
    }
}

function getTransactionWrappers() {
    return TRANSACTION_WRAPPERS
}

function getReactMountReady() {
    return this.reactMountReady
}

PooledClass.addPoolingTo(ReactReconcilerTransaction)