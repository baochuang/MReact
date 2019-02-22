let index = -1
const valueStack = []

function push(cursor, value) {
  index++

  valueStack[index] = cursor.current

  cursor.current = value
}

function createCursor(defaultValue) {
    return {
      current: defaultValue
    }
}

export {
    createCursor,
    push
}