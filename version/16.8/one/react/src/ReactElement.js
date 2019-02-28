import {REACT_ELEMENT_TYPE} from 'shared/ReactSymbols'
import ReactCurrentOwner from './ReactCurrentOwner'

const RESERVED_PROPS = {
  key: true,
  ref: true
}

function ReactElement(type, key, ref, owner, props) {
  const element = {
    // React组件唯一标识
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

  // React保留属性
  let key = null
  let ref = null

  if (config != null) {

    ref = config.ref || ref
    key = config.key && '' + config.key || key

    // React组件传入属性
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName]
      }
    }
  }

  // 子组件
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

  // 默认属性值
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
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