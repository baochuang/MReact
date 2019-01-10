// 抄的 还没搞清楚
import ReactElement from '../react/ReactElement'

const SEPARATOR = '.'

const userProvidedKeyEscaperLookup = {
    '=': '=0',
    ':': '=2',
  };
  
const userProvidedKeyEscapeRegex = /[=:]/g

function traverseAllChildren(children, callback, traverseContext) {
    if (children == null) {
      return 0;
    }
  
    return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

function traverseAllChildrenImpl(
    children,
    nameSoFar,
    callback,
    traverseContext
) {
    const type = typeof children

    if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
        callback(traverseContext, children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar)
        return 1
    }
}

function getComponentKey(component, index) {
    // Do some typechecking here since we call this blindly. We want to ensure
    // that we don't block potential future ES APIs.
    if (component && typeof component === 'object' && component.key != null) {
      // Explicit key
      return wrapUserProvidedKey(component.key)
    }
    // Implicit key determined by the index in the set
    return index.toString(36)
}

function wrapUserProvidedKey(key) {
    return '$' + escapeUserProvidedKey(key)
}

function escapeUserProvidedKey(text) {
    return ('' + text).replace(
      userProvidedKeyEscapeRegex,
      userProvidedKeyEscaper
    )
}

function userProvidedKeyEscaper(match) {
    return userProvidedKeyEscaperLookup[match]
}

export default traverseAllChildren