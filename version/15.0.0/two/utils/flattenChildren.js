import traverseAllChildren from './traverseAllChildren'

function flattenSingleChildIntoContext(traverseContext, child, name) {
    var result = traverseContext
    var keyUnique = result[name] === undefined

    if (keyUnique && child != null) {
      result[name] = child;
    }
}

function flattenChildren(children) {
    if (children == null) {
      return children
    }
    var result = {}
    traverseAllChildren(children, flattenSingleChildIntoContext, result)
    return result
}

export default flattenChildren