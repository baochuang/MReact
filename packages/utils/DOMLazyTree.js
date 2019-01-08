import { DOCUMENTFRAGMENT_NODE_TYPE } from '../constants/NodeType'
import { canUseLazy } from '../constants'
import setTextContent from './setTextContent'

function insertTreeChildren(tree) {
    if (!canUseLazy) {
        return 
    }
    const node = tree.node
    const children = tree.children
    if (children.length) {
        for (var i = 0; i < children.length; i++) {
            insertTreeBefore(node, children[i], null);
        }
    } else if (tree.html !== null) {
        node.innerHTML = tree.html
    } else if (tree.text !== null) {
        setTextContent(node, tree.text)
    }
}

function insertTreeBefore(parentNode, tree, referenceNode) {
    if (tree.node.nodeType === DOCUMENTFRAGMENT_NODE_TYPE) {
        insertTreeChildren(tree)
        parentNode.insertBefore(tree.node, referenceNode)
    } else {
        parentNode.insertBefore(tree.node, referenceNode)
        insertTreeChildren(tree)
    }
}