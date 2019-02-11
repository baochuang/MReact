const REACT_ELEMENT_TYPE = (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) || 0xeac7
const RESERVED_PROPS = { ref: true }

const ReactElement = function(type, ref, owner, props) {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        ref,
        _owner: owner,
        props: props,
    }
    
    return element
}

ReactElement.createElement = function(type, config, children) {

    const props = {}
    let ref = null

    if (config) {

        let propName
        let defaultProps

        if (config.ref) {
            ref = config.ref   
        }

        if (element.type && element.type.defaultProps) {
            defaultProps = element.type.defaultProps
        }
        
        for (propName in config) {
            if (!RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName] || defaultProps[propName]
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
        ref,
        Share.ReactCurrentOwner.current,
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