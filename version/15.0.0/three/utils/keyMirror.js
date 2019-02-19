const keyMirror = function (obj) {
    var ret = {}
    var key
    for (key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue
      }
      ret[key] = key
    }
    return ret
}

export default keyMirror