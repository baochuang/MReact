const ReactInstanceMap = {
 
    get: function(key) {
      return key._reactInternalInstance
    },
  
    set: function(key, value) {
      key._reactInternalInstance = value
    }
  
}

export default ReactInstanceMap