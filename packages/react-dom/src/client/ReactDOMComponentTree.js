import { internalInstanceKey } from '../../../constants'

function getClosestInstanceFromNode(node) {
    if (node[internalInstanceKey]) {
      return node[internalInstanceKey]
    }
  
    // Walk up the tree until we find an ancestor whose instance we have cached.
    const parents = []
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
  
    let closest
    let inst
    for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
      closest = inst;
      if (parents.length) {
        // precacheChildNodes(inst, node)
      }
    }
  
    return closest
}

function getInstanceFromNode(node) {
    const inst = getClosestInstanceFromNode(node);
    if (inst != null && inst._hostNode === node) {
      return inst;
    } else {
      return null;
    }
}