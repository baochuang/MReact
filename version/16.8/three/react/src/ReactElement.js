const ReactElement = function(type, key, ref, owner, props) {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type
    }
    
    return element
}

export function createElement(type, config, children) {
    return ReactElement(
        type
    )
}