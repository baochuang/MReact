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

/**
 * 获取children对象将其转换为key-value对象
 * @param {*} children 
 * @param {*} nameSoFar 
 * @param {*} callback 
 * @param {*} traverseContext 
 */
function traverseAllChildrenImpl(
    children,
    nameSoFar,
    callback,
    traverseContext
) {
    const type = typeof children

    // 单个节点处理
    if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
        callback(traverseContext, children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar)
        return 1
    } 

    let child
    let nextName
    let subtreeCount = 0
    const nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR

    // 多个兄弟节点处理
    if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
            child = children[i]
            nextName = nextNamePrefix + getComponentKey(child, i);
            subtreeCount += traverseAllChildrenImpl(
              child,
              nextName,
              callback,
              traverseContext
            );
          }
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