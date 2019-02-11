import DOMProperty from './DOMProperty'

const DOMPropertyOperations = {
    setValueForProperty: function(node, name, value) {
        const propertyInfo = DOMProperty.properties.hasOwnProperty(name) ?
            DOMProperty.properties[name] : null
        if (propertyInfo) {
            const attributeName = propertyInfo.attributeName
            node.setAttribute(attributeName, '' + value)
        }
    }
}

export default DOMPropertyOperations