import EventListener from '../../utils/EventListener'
import ReactUpdates from '../../react-reconciler/ReactUpdates'
import PooledClass from '../../utils/PooledClass'

class TopLevelCallbackBookKeeping {
    constructor(topLevelType, nativeEvent) {
        this.topLevelType = topLevelType
        this.nativeEvent = nativeEvent
        this.ancestors = []
    }

    destructor() {
        this.topLevelType = null
        this.nativeEvent = null
        this.ancestors.length = 0
    }
}

PooledClass.addPoolingTo(
    TopLevelCallbackBookKeeping,
    PooledClass.twoArgumentPooler
)

const ReactEventListener = {
    _enabled: true,
    _handleTopLevel: null,
    trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
        var element = handle
        if (!element) {
          return null
        }
        return EventListener.listen(
          element,
          handlerBaseName,
          ReactEventListener.dispatchEvent.bind(null, topLevelType)
        )
    },

    dispatchEvent: function(topLevelType, nativeEvent) {
        if (!ReactEventListener._enabled) {
            return
        }

        const bookKeeping = TopLevelCallbackBookKeeping.getPooled(
            topLevelType,
            nativeEvent
        )

        try {
            ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping)
        } finally {
            TopLevelCallbackBookKeeping.release(bookKeeping)
        }
    },

    setHandleTopLevel: function(handleTopLevel) {
        ReactEventListener._handleTopLevel = handleTopLevel
    }
}

export default ReactEventListener