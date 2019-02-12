import ReactCurrentOwner from './ReactCurrentOwner'
import { REACT_ELEMENT_TYPE } from '../../shared/ReactSymbols'

const ReactElement = function(type, key, ref, owner, props) {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key,
        ref: ref,
        props: props,
        _owner: owner
    }
    
    return element
}

export function createElement(type, config, children) {
    let propName

    const props = {}

    let key = null
    let ref = null

    if (config) {
        ref = config.ref || null
        key = config.key ? '' + config.key : null
    }

    const childrenLength = arguments.length - 2

    if (childrenLength === 1) {
        props.children = children
    } else if (childrenLength > 1) {
        const childArray = Array(childrenLength)
        for (let i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2]
        }
        props.children = childArray
    }

    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps
        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName]
          }
        }
    }

    return ReactElement(
        type,
        key,
        ref,
        ReactCurrentOwner.current,
        props
    )
}