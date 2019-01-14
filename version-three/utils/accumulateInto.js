function accumulateInto(current, next) {
    if (current == null) {
        return next
    }

    const currentIsArray = Array.isArray(current)
    const nextIsArray = Array.isArray(next)

    if (currentIsArray && nextIsArray) {
        current.push.apply(current, next)
        return current
    }

    if (currentIsArray) {
        current.push(next)
        return current
    }

    if (nextIsArray) {
        return [current].concat(next)
    }

    return [current, next]
}

export default accumulateInto