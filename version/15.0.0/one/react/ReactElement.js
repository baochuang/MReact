const REACT_ELEMENT_TYPE = (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) || 0xeac7

const ReactElement = function(type, props) {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        props: props,
    }
    
    return element
}

ReactElement.createElement = function(type, config, children) {

    const props = {}

    if (config) {
        for (let propName in config) {
            props[propName] = config[propName]
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
        props
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