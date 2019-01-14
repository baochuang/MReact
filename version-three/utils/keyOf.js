const keyOf = function (oneKeyObj) {
    let key
    for (key in oneKeyObj) {
      if (!oneKeyObj.hasOwnProperty(key)) {
        continue
      }
      return key
    }
    return null
}

export default keyOf