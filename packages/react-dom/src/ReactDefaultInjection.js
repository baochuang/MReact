import ReactInjection from './ReactInjection'
import ReactDOMComponent from './ReactDOMComponent'
import ReactDOMTextComponent from './ReactDOMTextComponent'

const ReactDefaultInjection = {
    inject: function() {
        ReactInjection.NativeComponent.injectGenericComponentClass(
            ReactDOMComponent
        )
        
        ReactInjection.NativeComponent.injectTextComponentClass(
            ReactDOMTextComponent
        )
    }
}

export default ReactDefaultInjection