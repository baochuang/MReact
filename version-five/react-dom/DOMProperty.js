const ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD'

const DOMPropertyInjection = {
    injectDOMPropertyConfig: function(domPropertyConfig) {

        const Properties = domPropertyConfig.Properties || {}
        const DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {}

        if (domPropertyConfig.isCustomAttribute) {
            DOMProperty._isCustomAttributeFunctions.push(
              domPropertyConfig.isCustomAttribute
            )
        }

        for (var propName in Properties) {
            const lowerCased = propName.toLowerCase()
            const propertyInfo = {
                attributeName: lowerCased
            }
            if (DOMAttributeNames.hasOwnProperty(propName)) {
                const attributeName = DOMAttributeNames[propName]
                propertyInfo.attributeName = attributeName
            }
            DOMProperty.properties[propName] = propertyInfo
        }
    }
}

const DOMProperty = {
    properties: {},
    
    ATTRIBUTE_NAME_CHAR: ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\uB7\\u0300-\\u036F\\u203F-\\u2040',

    _isCustomAttributeFunctions: [],

    isCustomAttribute: function(attributeName) {
        for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
          var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
          if (isCustomAttributeFn(attributeName)) {
            return true;
          }
        }
        return false;
    },

    injection: DOMPropertyInjection
}


export default DOMProperty