import DOMProperty from './DOMProperty'

const HTMLDOMPropertyConfig = {
    isCustomAttribute: RegExp.prototype.test.bind(
        new RegExp('^(data|aria)-[' + DOMProperty.ATTRIBUTE_NAME_CHAR + ']*$')
    ),
    Properties: {
        className: 0,
        htmlFor: 0,
        type: 0,
        id: 0,
        placeholder: 0,
        style: 0
    },
    DOMAttributeNames: {
        className: 'class',
        htmlFor: 'for'
    }
}

export default HTMLDOMPropertyConfig