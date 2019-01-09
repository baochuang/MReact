const ReactNativeComponent = {
    injection: ReactNativeComponentInjection = {
        injectGenericComponentClass: function(componentClass) {
            ReactNativeComponent.genericComponentClass = componentClass
        }
    },
    createInternalComponent: function(element) {
        return new ReactNativeComponent.genericComponentClass(element)
    },

    genericComponentClass: null
}