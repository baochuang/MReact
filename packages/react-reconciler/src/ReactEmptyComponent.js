let emptyComponentFactory

const ReactEmptyComponentInjection = {
    injectEmptyComponentFactory: function(factory) {
        emptyComponentFactory = factory
    }
}

const ReactEmptyComponent = {
    create: function(instantiate) {
        return emptyComponentFactory(instantiate)
    }
}

ReactEmptyComponent.injection = ReactEmptyComponentInjection

export default ReactEmptyComponent