import ReactDOMComponent from '../react-dom/ReactDOMComponent'
import ReactDOMTextComponent from '../react-dom/ReactDOMTextComponent'

function createInternalComponent(element) {
    return new ReactDOMComponent(element)
}

function createInstanceForText(node) {
    return new ReactDOMTextComponent(text)
}

const ReactNativeComponent = {
    createInternalComponent,
    createInstanceForText
}

export default ReactNativeComponent