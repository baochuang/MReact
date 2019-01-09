class ReactCompositeComponentWrapper extends ReactCompositeComponent {
    constructor(element) {
        super(element)
        this._instantiateReactComponent = instantiateReactComponent
    }
}

// 组件入口
// 判断node类型来区分不同组件
function instantiateReactComponent(node) {
    let instance

    if (node === null) {
        instance = ReactEmptyComponent.create(instantiateReactComponent) // 初始化空组件
    } else if (typeof node === 'object') {
        const element = node // 这里我们将节点称为元素

        if (typeof element.type === 'string') {
            instance = ReactNativeComponent.createInternalComponent(element) // 初始化DOM标签组件
        } else {
            instance = new ReactCompositeComponentWrapper(element) // 初始化React自定义标签组件 
        }
    } else if (typeof node === 'string' || typeof node === 'number') {
        instance = ReactNativeComponent.createInstanceForText(node) // 初始化文本组件
    } 
}