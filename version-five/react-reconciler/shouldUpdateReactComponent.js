const shouldUpdateReactComponent = function(prevElement, nextElement) {
    const prevEmpty = prevElement === null || prevElement === false
    const nextEmpty = nextElement === null || nextElement === false

    if (prevEmpty || nextEmpty) {
        return prevEmpty === nextEmpty
    }

    const prevType = typeof prevElement
    const nextType = typeof nextElement

    if (prevType === 'string' || prevType === 'number') {
        return (nextType === 'string' || nextType === 'number')
    } else {
        return (
            nextType === 'object' &&
            prevElement.type === nextElement.type &&
            prevElement.key === nextElement.key
        )
    }
}

export default shouldUpdateReactComponent