const enableLazy = (
  typeof document !== 'undefined' &&
  typeof document.documentMode === 'number'
  ||
  typeof navigator !== 'undefined' &&
  typeof navigator.userAgent === 'string' &&
  /\bEdge\/\d/.test(navigator.userAgent)
)

function DOMLazyTree(node) {
    return {
      node: node,
      children: [],
      html: null,
      text: null,
    }
}

DOMLazyTree.queueText = function(tree, text) {
  if (enableLazy) {
    tree.text = text;
  } else {
    setTextContent(tree.node, text);
  }
}

DOMLazyTree.queueChild = function(parentTree, childTree) {
  if (enableLazy) {
    parentTree.children.push(childTree);
  } else {
    parentTree.node.appendChild(childTree.node);
  }
}
