import ReactUpdates from '../react-reconciler/ReactUpdates'
import ReactNativeComponent from '../react-reconciler/ReactNativeComponent'
import EventPluginHub from '../shared/event/EventPluginHub'
import ReactBrowserEventEmitter from '../react-dom/client/ReactBrowserEventEmitter'
import EventPluginUtils from '../shared/event/EventPluginUtils'

const ReactInjection = {
    NativeComponent: ReactNativeComponent.injection, // DOM组件和DOM Text组件
    Updates: ReactUpdates.injection, // 事务
    EventPluginHub: EventPluginHub.injection, // 自定义事件
    EventEmitter: ReactBrowserEventEmitter.injection, // 事件注册监听执行
    EventPluginUtils: EventPluginUtils.injection
}

export default ReactInjection