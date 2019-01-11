import ReactDOMComponent from '../react-dom/ReactDOMComponent'
import ReactDOMTextComponent from '../react-dom/ReactDOMTextComponent'

let genericComponentClass = null
let textComponentClass = null

const ReactNativeComponentInjection = {
    injectGenericComponentClass: function(componentClass) {
        genericComponentClass = componentClass;
    },
    injectTextComponentClass: function(componentClass) {
        textComponentClass = componentClass;
    }
}

function createInternalComponent(element) {
    return new genericComponentClass(element)
}

function createInstanceForText(node) {
    return new textComponentClass(text)
}

const ReactNativeComponent = {
    createInternalComponent,
    createInstanceForText,
    injection: ReactNativeComponentInjection
}

export default ReactNativeComponent