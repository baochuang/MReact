function getEventTarget(nativeEvent) {
    var target = nativeEvent.target || nativeEvent.srcElement || window
  
    if (target.correspondingUseElement) {
      target = target.correspondingUseElement
    }
  
    return target.nodeType === 3 ? target.parentNode : target
  }

  export default getEventTarget