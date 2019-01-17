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
        nativeParent,
        nativeContainerInfo,
    ) {
        this._nativeParent = nativeParent
        this._nativeContainerInfo = nativeContainerInfo

        const props = this._currentElement.props

        const ownerDocument = nativeContainerInfo._ownerDocument
            
        const el = ownerDocument.createElement(this._currentElement.type)

        const lazyTree = DOMLazyTree(el)

        this._createInitialChildren(props, lazyTree)

        const mountImage = lazyTree

        return mountImage
    }

    _createInitialChildren(props, lazyTree) {

        const contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null
        const childrenToUse = contentToUse != null ? null : props.children

        if (contentToUse) {
            // 将文本绑定到节点上去
        } else if (childrenToUse) {
            const mountImages = this.mountChildren(
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