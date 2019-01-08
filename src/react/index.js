const React = {
    Component,
    createElement
}

function Component(props) {
    this.props = props
}
  
Component.prototype.isReactComponent = {}

const ReactElement = function(type, props) {
    const element = {
        type: type,
        props: props,
    }

    return element
}

function createElement(type, config, children) {
    const props = {}

    if (config) {
        for ( prop in config ) {
            props[prop] = config[prop]
        }
    }

    return ReactElement(
        type,
        props
    )
}