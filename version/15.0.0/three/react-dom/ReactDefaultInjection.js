import ReactInjection from './ReactInjection'
import ReactReconcileTransaction from './client/ReactReconcilerTransaction'
import ReactDefaultBatchingStrategy from '../react-reconciler/ReactDefaultBatchingStrategy'
import ReactDOMComponent from './ReactDOMComponent'
import ReactDOMTextComponent from './ReactDOMTextComponent'

import DefaultEventPluginOrder from './client/eventPlugins/DefaultEventPluginOrder'
import SimpleEventPlugin from './client/eventPlugins/SimpleEventPlugin'
import EnterLeaveEventPlugin from './client/eventPlugins/EnterLeaveEventPlugin'
import ChangeEventPlugin from './client/eventPlugins/ChangeEventPlugin'
import SelectEventPlugin from './client/eventPlugins/SelectEventPlugin'
import BeforeInputEventPlugin from './client/eventPlugins/BeforeInputEventPlugin'

import ReactEventListener from './client/ReactEventListener'

import ReactDOMComponentTree from './client/ReactDOMComponentTree'

function inject() {
    // Transaction
    ReactInjection.Updates.injectReconcileTransaction(
        ReactReconcileTransaction
    )
    // BatchingStrategy
    ReactInjection.Updates.injectBatchingStrategy(
        ReactDefaultBatchingStrategy
    )
    // DOM组件
    ReactInjection.NativeComponent.injectGenericComponentClass(
        ReactDOMComponent
    )
    // 文本组件
    ReactInjection.NativeComponent.injectTextComponentClass(
        ReactDOMTextComponent
    )
    // 事件系统
    ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder)

    // 自定义事件
    ReactInjection.EventPluginHub.injectEventPluginsByName({
        SimpleEventPlugin,
        EnterLeaveEventPlugin,
        ChangeEventPlugin,
        SelectEventPlugin,
        BeforeInputEventPlugin
    })

    // 事件注册
    ReactInjection.EventEmitter.injectReactEventListener(
        ReactEventListener
    )

    //
    ReactInjection.EventPluginUtils.injectComponentTree(ReactDOMComponentTree)
}

const ReactDefaultInjection = {
    inject
}

export default ReactDefaultInjection