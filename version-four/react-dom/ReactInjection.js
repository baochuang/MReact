import ReactUpdates from '../react-reconciler/ReactUpdates'
import ReactNativeComponent from '../react-reconciler/ReactNativeComponent'

const ReactInjection = {
    NativeComponent: ReactNativeComponent.injection,
    Updates: ReactUpdates.injection
}

export default ReactInjection