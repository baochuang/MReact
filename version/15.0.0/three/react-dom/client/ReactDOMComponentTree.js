const internalInstanceKey = `__reactInternalInstance$${Math.random().toString(36).slice(2)}`
import ReactDOMComponentFlags from '../ReactDOMComponentFlags'

const Flags = ReactDOMComponentFlags

export const getNodeFromInstance = (inst) => {
    if (inst._nativeNode) {
        return inst._nativeNode
    }

    let parents = []

    while (!inst._nativeNode) {
        parents.push(inst)

        inst = inst._nativeParent
    }

    return inst._nativeNode
}

/**
 * 在实例上填充_nativeNode
 * @param {*} inst 
 * @param {*} node 
 */
export const precacheNode = function(inst, node) {
    const nativeInst = getRenderedNativeOrTextFromComponent(inst)
    nativeInst._nativeNode = node
    node[internalInstanceKey] = nativeInst
}

function getRenderedNativeOrTextFromComponent(component) {
    let rendered 
    while ((rendered = component._renderedComponent)) {
        component = rendered
    }
    return component
}

function getClosestInstanceFromNode(node) {
    if (node[internalInstanceKey]) {
      return node[internalInstanceKey]
    }
  
    // Walk up the tree until we find an ancestor whose instance we have cached.
    var parents = []
    while (!node[internalInstanceKey]) {
      parents.push(node)
      if (node.parentNode) {
        node = node.parentNode
      } else {
        // Top of the tree. This node must not be part of a React tree (or is
        // unmounted, potentially).
        return null
      }
    }
  
    var closest
    var inst
    for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
      closest = inst
      if (parents.length) {
        precacheChildNodes(inst, node)
      }
    }
  
    return closest
}

function precacheChildNodes(inst, node) {
    if (inst._flags & Flags.hasCachedChildNodes) {
      return
    }
    var children = inst._renderedChildren
    var childNode = node.firstChild
    outer: for (var name in children) {
      if (!children.hasOwnProperty(name)) {
        continue
      }
      var childInst = children[name]
      var childID = getRenderedNativeOrTextFromComponent(childInst)._domID
      if (childID == null) {
        // We're currently unmounting this child in ReactMultiChild; skip it.
        continue
      }
      // We assume the child nodes are in the same order as the child instances.
      for (; childNode !== null; childNode = childNode.nextSibling) {
        if ((childNode.nodeType === 1 &&
             childNode.getAttribute(ATTR_NAME) === String(childID)) ||
            (childNode.nodeType === 8 &&
             childNode.nodeValue === ' react-text: ' + childID + ' ') ||
            (childNode.nodeType === 8 &&
             childNode.nodeValue === ' react-empty: ' + childID + ' ')) {
          precacheNode(childInst, childNode)
          continue outer
        }
      }
    }
    inst._flags |= Flags.hasCachedChildNodes
}

const ReactDOMComponentTree = {
    precacheNode,
    getNodeFromInstance,
    getClosestInstanceFromNode
}

export default ReactDOMComponentTree