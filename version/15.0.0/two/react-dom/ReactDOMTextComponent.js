import DOMLazyTree from "./client/utils/DOMLazyTree";
import { getNodeFromInstance, precacheNode } from './client/ReactDOMComponentTree'
import { COMMENT_NODE_TYPE } from '../constants/nodeTypes'
import DOMChildrenOperations from './client/utils/DOMChildrenOperations'

const commentValue = ' /react-text '
export default class ReactDOMTextComponent  {
    constructor(text) {
        this._currentElement = text
        this._stringText = '' + text
        this._closingComment = null
        this._commentNodes = null
        this._nativeNode = null
    }

    mountComponent(
        transaction,
        nativeParent,
        nativeContainerInfo
    ) {
        const domID = nativeContainerInfo._idCounter++
        const openingValue = ' react-text: ' + domID + ' '
        if(transaction.useCreateElement) {
            const ownerDocument =nativeContainerInfo._ownerDocument
            const lazyTree = DOMLazyTree(ownerDocument.createDocumentFragment())
            
            const closingComment = ownerDocument.createComment(commentValue)
            const openingComment = ownerDocument.createComment(openingValue)
            DOMLazyTree.queueChild(lazyTree, DOMLazyTree(openingComment))
            if (this._stringText) {
                DOMLazyTree.queueChild(
                    lazyTree,
                    DOMLazyTree(ownerDocument.createTextNode(this._stringText))
                )
            }
    
            DOMLazyTree.queueChild(lazyTree, DOMLazyTree(closingComment))

            precacheNode(this, openingComment)

            this._closingComment = closingComment

            return lazyTree
        }
    }

    receiveComponent(nextText, transaction) {
        if (nextText !== this._currentElement) {
            this._currentElement = nextText
            const nextStringText = '' + nextText
            if (nextStringText !== this._stringText) {
                this._stringText = nextStringText

                const commentNodes = this.getNativeNode()
                DOMChildrenOperations.replaceDelimitedText(
                    commentNodes[0],
                    commentNodes[1],
                    nextStringText
                )
            }
        }
    }

    getNativeNode() {
        let nativeNode = this._commentNodes

        if (nativeNode) {
            return nativeNode
        }

        if (!this._closingComment) {
            const openingComment = getNodeFromInstance(this)
            const node = openingComment.nextSibling

            while (true) {
                if(node.nodeType === COMMENT_NODE_TYPE && node.nodeValue === commentValue) {
                    this._closingComment = node
                    break
                }
                node = node.nextSibling
            }
        }

        nativeNode = [this._nativeNode, this._closingComment]
        this._commentNodes = nativeNode
        return nativeNode
    }
}