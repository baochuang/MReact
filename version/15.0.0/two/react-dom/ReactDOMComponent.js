import DOMLazyTree from './client/utils/DOMLazyTree'
import ReactMultiChild from '../react-reconciler/ReactMultiChild'
import { getNodeFromInstance as getNode } from  './client/ReactDOMComponentTree'

const CONTENT_TYPES = {'string': true, 'number': true}
class ReactDOMComponent {
    constructor(element) {
        const tag = element.type
        this._currentElement = element
        this._tag = tag.toLowerCase()
        this._nativeNode = null
        this._domID = null
    }

    mountComponent(
        transaction,
        nativeParent,
        nativeContainerInfo,
    ) {
        this._domID = nativeContainerInfo._idCounter++
        this._nativeParent = nativeParent
        this._nativeContainerInfo = nativeContainerInfo

        const props = this._currentElement.props

        const ownerDocument = nativeContainerInfo._ownerDocument
            
        const el = ownerDocument.createElement(this._currentElement.type)

        const lazyTree = DOMLazyTree(el)

        this._createInitialChildren(transaction, props, lazyTree)

        const mountImage = lazyTree

        return mountImage
    }

    _createInitialChildren(transaction, props, lazyTree) {

        const contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null
        const childrenToUse = contentToUse != null ? null : props.children

        if (contentToUse) {
            DOMLazyTree.queueText(lazyTree, contentToUse)
        } else if (childrenToUse) {
            const mountImages = this.mountChildren(
                transaction,
                childrenToUse
            )
            for (var i = 0; i < mountImages.length; i++) {
                DOMLazyTree.queueChild(lazyTree, mountImages[i]);
            }
        }
    }

    receiveComponent(nextElement, transaction) {
        const prevElement = this._currentElement
        this._currentElement = nextElement
        this.updateComponent(transaction, prevElement)
    }

    updateComponent(transaction, prevElement) {
        const lastProps = prevElement.props
        const nextProps = this._currentElement.props

        this._updateDOMChildren(
            lastProps,
            nextProps,
            transaction
        )
    }

    _updateDOMChildren(lastProps, nextProps, transaction) {
        const lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null
        const nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null

        const lastChildren = lastContent != null ? null : lastProps.children
        const nextChildren = nextContent != null ? null : nextProps.children

        if (nextContent != null) {
            if (lastContent !== nextContent) {
            
            }
        } else if (nextChildren != null) {
            this.updateChildren(nextChildren, transaction)
        } 
    }

    getNativeNode() {
        return getNode(this)
    }
}

Object.assign(
    ReactDOMComponent.prototype,
    ReactMultiChild
)

export default ReactDOMComponent