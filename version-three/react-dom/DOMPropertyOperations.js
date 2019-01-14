import DOMProperty from './DOMProperty'

const DOMPropertyOperations = {
    setAttributeForRoot: function(node) {
        node.setAttribute(DOMProperty.ROOT_ATTRIBUTE_NAME, '')
    }
}

export default DOMPropertyOperations