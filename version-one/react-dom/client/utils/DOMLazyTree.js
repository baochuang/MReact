function DOMLazyTree(node) {
    return {
      node: node,
      children: [],
      html: null,
      text: null,
    }
}

DOMLazyTree.queueChild = function(parentTree, childTree) {
    parentTree.node.appendChild(childTree.node);
}

DOMLazyTree.queueText = function(tree, text) {
    tree.node.textContent = text
}

DOMLazyTree.insertTreeBefore = function(parentNode, tree) {
    parentNode.insertBefore(tree.node, null)
}

export default DOMLazyTree