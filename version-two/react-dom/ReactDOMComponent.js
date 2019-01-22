import DOMLazyTree from './client/utils/DOMLazyTree'
import ReactMultiChild from '../react-reconciler/ReactMultiChild'

const CONTENT_TYPES = {'string': true, 'number': true}
class ReactDOMComponent {
    constructor(element) {
        const tag = element.type
        this._currentElement = element
        this._tag = tag.toLowerCase()
    }

    mountComponent(
        transaction,
        nativeParent,
        nativeContainerInfo,
    ) {
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
}

Object.assign(
    ReactDOMComponent.prototype,
    ReactMultiChild
)

export default ReactDOMComponent