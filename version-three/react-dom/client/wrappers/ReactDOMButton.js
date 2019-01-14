const mouseListenerNames = {
    onClick: true,
    onDoubleClick: true,
    onMouseDown: true,
    onMouseMove: true,
    onMouseUp: true,
  
    onClickCapture: true,
    onDoubleClickCapture: true,
    onMouseDownCapture: true,
    onMouseMoveCapture: true,
    onMouseUpCapture: true,
}

const ReactDOMButton = {
    getNativeProps: function(inst, props) {
        if (!props.disabled) {
            return props
        }

        const nativeProps = {}

        for (var key in props) {
            if (props.hasOwnProperty(key) && !mouseListenerNames[key]) {
                nativeProps[key] = props[key]
            }
        }

        return nativeProps
    }
}

export default ReactDOMButton