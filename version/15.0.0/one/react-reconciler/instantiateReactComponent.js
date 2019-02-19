
import ReactDOMComponent from '../react-dom/ReactDOMComponent'
import ReactCompositeComponent from './ReactCompositeComponent'

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
        // 初始化ReactDOMEmptyComponent 空组件
    } else if (typeof node === 'object') {
        // 一般情况下我们拿到的节点就是转换后的ReactElement
        const element = node 

        if (typeof element.type === 'string') {
            // 初始化ReactDOMComponent DOM标签组件
            instance = new ReactDOMComponent(element) 
        } else {
            // 初始化ReactCompositeComponent 自定义标签组件
            instance = new ReactCompositeComponentWrapper(element)  
        }
    } else if (typeof node === 'string' || typeof node === 'number') {
        // 初始化ReactDOMTextComponent 文本组件
    } 

    return instance
}

export default instantiateReactComponent