import ReactElement from '../react/ReactElement'

const SEPARATOR = '.'

function traverseAllChildren(children, callback, traverseContext) {
    if (children == null) {
      return 0
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
    if (type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
        callback(traverseContext, children, nameSoFar === '' ? SEPARATOR + getName(children, 0) : nameSoFar)
        return 1
    }

    // 多个节点处理
    if (Array.isArray(children)) {
        let child
        let name
        for (let i = 0; i < children.length; i++) {
            child = children[i]
            name = getName(child, i)
            traverseAllChildrenImpl(child, name, callback, traverseContext)
        }
    }
}

function getName(component, index) {
    return index.toString(36)
}

export default traverseAllChildren