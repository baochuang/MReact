import ReactInjection from './ReactInjection'
import ReactDefaultBatchingStrategy from './ReactDefaultBatchingStrategy'

let alreadyInjected = false

const inject = function () {
    if (alreadyInjected) {
        return 
    }

    alreadyInjected = true

    ReactInjection.Updates.injectBatchingStrategy(
        ReactDefaultBatchingStrategy
    )
}

const ReactDefaultInjection = {
    inject
}

export default ReactDefaultInjection