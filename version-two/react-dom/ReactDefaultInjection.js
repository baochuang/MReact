import ReactInjection from './ReactInjection'
import ReactReconcileTransaction from './client/ReactReconcilerTransaction'
import ReactDefaultBatchingStrategy from '../react-reconciler/ReactDefaultBatchingStrategy'
import ReactDOMComponent from './ReactDOMComponent'
import ReactDOMTextComponent from './ReactDOMTextComponent'

function inject() {
    ReactInjection.Updates.injectReconcileTransaction(
        ReactReconcileTransaction
      )
    ReactInjection.Updates.injectBatchingStrategy(
        ReactDefaultBatchingStrategy
    )
    ReactInjection.NativeComponent.injectGenericComponentClass(
        ReactDOMComponent
    )
    
    ReactInjection.NativeComponent.injectTextComponentClass(
        ReactDOMTextComponent
    )
}

const ReactDefaultInjection = {
    inject
}

export default ReactDefaultInjection