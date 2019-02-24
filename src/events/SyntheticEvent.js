const EVENT_POOL_SIZE = 10

function functionThatReturnsTrue() {
    return true
}
  
function functionThatReturnsFalse() {
    return false
}

function releasePooledEvent(event) {
    const EventConstructor = this

    event.destructor()

    if (EventConstructor.eventPool.length < EVENT_POOL_SIZE) {
      EventConstructor.eventPool.push(event)
    }
}

function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
    const EventConstructor = this
    if (EventConstructor.eventPool.length) {
      const instance = EventConstructor.eventPool.pop()
      EventConstructor.call(
        instance,
        dispatchConfig,
        targetInst,
        nativeEvent,
        nativeInst
      )
      return instance
    }
    return new EventConstructor(
      dispatchConfig,
      targetInst,
      nativeEvent,
      nativeInst
    )
}

function addEventPoolingTo(EventConstructor) {
    EventConstructor.eventPool = []
    EventConstructor.getPooled = getPooledEvent
    EventConstructor.release = releasePooledEvent
}

function SyntheticEvent(
    dispatchConfig,
    targetInst,
    nativeEvent,
    nativeEventTarget
) {
    this.dispatchConfig = dispatchConfig
    this._targetInst = targetInst
    this.nativeEvent = nativeEvent

    const Interface = this.constructor.Interface

    for (const propName in Interface) {
        if (!Interface.hasOwnProperty(propName)) {
          continue
        }

        const normalize = Interface[propName]
        if (normalize) {
          this[propName] = normalize(nativeEvent)
        } else {
          if (propName === 'target') {
            this.target = nativeEventTarget
          } else {
            this[propName] = nativeEvent[propName]
          }
        }
    }

    const defaultPrevented = nativeEvent.defaultPrevented != null
      ? nativeEvent.defaultPrevented
      : nativeEvent.returnValue === false

    if (defaultPrevented) {
        this.isDefaultPrevented = functionThatReturnsTrue
    } else {
        this.isDefaultPrevented = functionThatReturnsFalse
    }
    this.isPropagationStopped = functionThatReturnsFalse
    return this 
}

SyntheticEvent.extend = function(Interface) {
    const Super = this
  
    const E = function() {}

    E.prototype = Super.prototype

    const prototype = new E()
  
    function Class() {
      return Super.apply(this, arguments)
    }

    Object.assign(prototype, Class.prototype)
    Class.prototype = prototype
    Class.prototype.constructor = Class
  
    Class.Interface = Object.assign({}, Super.Interface, Interface)
    Class.extend = Super.extend
    addEventPoolingTo(Class)
  
    return Class
}

addEventPoolingTo(SyntheticEvent)

Object.assign(SyntheticEvent.prototype, {
  preventDefault: function() {},
  stopPropagation: function() {},
  isPersistent: functionThatReturnsFalse,
  destructor: function() {
    
  }
})

export default SyntheticEvent