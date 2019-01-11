const REACT_ELEMENT_TYPE = (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) || 0xeac7

const RESERVED_PROPS = {
    key: true,
    ref: true
}

const ReactElement = function(type, key, ref, self, props) {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key,
        ref: ref,
        props: props,
    }
    return element
}

ReactElement.createElement = function(type, config, children) {

    const props = {}

    let key = null
    let ref = null
    let self = null

    if (config) {
        ref = config.ref || undefined
        for (let propName in config) {
            if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName]
            }
        }
    } 

    const childrenLength = arguments.length - 2

    if (childrenLength === 1) {
        props.children = children
    } else if (childrenLength > 1) {
        const childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2]
        }
        props.children = childArray
    }
    
    return ReactElement(
        type,
        key,
        ref,
        self,
        props,
    )
}

ReactElement.isValidElement =  function(object) {
    return (
      typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE
    )
}
export default ReactElement