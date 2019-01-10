import { enableLazy } from '../../../constants'
import { DOCUMENTFRAGMENT_NODE_TYPE } from '../../../constants/nodeTypes'
import setTextContent from './setTextContent'

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

DOMLazyTree.insertTreeBefore = function(parentNode, tree, referenceNode) {
  if (tree.node.nodeType === DOCUMENTFRAGMENT_NODE_TYPE) {
      insertTreeChildren(tree)
      parentNode.insertBefore(tree.node, referenceNode)
  } else {
      parentNode.insertBefore(tree.node, referenceNode)
      insertTreeChildren(tree)
  }
}

function insertTreeChildren(tree) {
  if (!enableLazy) {
      return 
  }
  const node = tree.node
  const children = tree.children
  if (children.length) {
      for (var i = 0; i < children.length; i++) {
        DOMLazyTree.insertTreeBefore(node, children[i], null);
      }
  } else if (tree.html !== null) {
      node.innerHTML = tree.html
  } else if (tree.text !== null) {
      setTextContent(node, tree.text)
  }
}

DOMLazyTree.queueChild = function(parentTree, childTree) {
  if (enableLazy) {
    parentTree.children.push(childTree);
  } else {
    parentTree.node.appendChild(childTree.node);
  }
}

export default DOMLazyTree