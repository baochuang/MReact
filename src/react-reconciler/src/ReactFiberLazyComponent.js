export function resolveDefaultProps(Component, baseProps) {
    if (Component && Component.defaultProps) {
      // Resolve default props. Taken from ReactElement
      const props = Object.assign({}, baseProps)
      const defaultProps = Component.defaultProps
      for (let propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName]
        }
      }
      return props
    }
    return baseProps
}