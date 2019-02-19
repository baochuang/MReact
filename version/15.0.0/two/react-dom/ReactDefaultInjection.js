import ReactDefaultBatchingStrategy from '../react-reconciler/ReactDefaultBatchingStrategy'
import ReactInjection from './ReactInjection'

function inject() {
    ReactInjection.Updates.injectBatchingStrategy(
        ReactDefaultBatchingStrategy
    )
}

const ReactDefaultInjection = {
    inject
}

export default ReactDefaultInjection