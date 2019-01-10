const ReactElement = function(type, key, ref, self, props) {
    const element = {
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

    } 

    const childrenLength = arguments.length - 2

    if (childrenLength.length === 1) {
        props.children = children
    }
    
    return ReactElement(
        type,
        key,
        ref,
        self,
        props,
    )
}

export default ReactElement