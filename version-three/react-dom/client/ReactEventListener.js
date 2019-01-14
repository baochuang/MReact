import EventListener from '../../utils/EventListener'
import ReactUpdates from '../../react-reconciler/ReactUpdates'
import PooledClass from '../../utils/PooledClass'
import ReactDOMComponentTree from './ReactDOMComponentTree'
import getEventTarget from './utils/getEventTarget'

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

function handleTopLevelImpl(bookKeeping) {
    const nativeEventTarget = getEventTarget(bookKeeping.nativeEvent)
    let targetInst = ReactDOMComponentTree.getClosestInstanceFromNode(
      nativeEventTarget
    )
  
    let ancestor = targetInst
    do {
      bookKeeping.ancestors.push(ancestor)
      ancestor = ancestor && findParent(ancestor)
    } while (ancestor)
  
    for (let i = 0; i < bookKeeping.ancestors.length; i++) {
      targetInst = bookKeeping.ancestors[i]
      ReactEventListener._handleTopLevel(
        bookKeeping.topLevelType,
        targetInst,
        bookKeeping.nativeEvent,
        getEventTarget(bookKeeping.nativeEvent)
      )
    }
}

function findParent(inst) {
    // TODO: It may be a good idea to cache this to prevent unnecessary DOM
    // traversal, but caching is difficult to do correctly without using a
    // mutation observer to listen for all DOM changes.
    while (inst._nativeParent) {
      inst = inst._nativeParent;
    }
    const rootNode = ReactDOMComponentTree.getNodeFromInstance(inst)
    const container = rootNode.parentNode
    return ReactDOMComponentTree.getClosestInstanceFromNode(container)
}

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