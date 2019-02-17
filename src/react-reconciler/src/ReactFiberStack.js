let index = -1
const valueStack = []

function push(cursor, value, fiber) {
  index++

  valueStack[index] = cursor.current

  cursor.current = value
}

function createCursor(defaultValue) {
    return {
      current: defaultValue
    }
}

function pop(cursor, fiber) {
  if (index < 0) {
    return
  }

  cursor.current = valueStack[index];

  valueStack[index] = null

  index--
}

export {
    createCursor,
    pop,
    push
}