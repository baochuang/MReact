import StatelessComponent from './StatelessComponent'
import ReactInstanceMap from './ReactInstanceMap'
import ReactReconciler from './ReactReconciler'

export default class ReactCompositeComponent {
    constructor(element) {
        this._currentElement = element
        // for diff
        this._rootNodeID = null
        this._instance = null
        // for update
        this._renderedComponent = null
        this._context = null
        // for dom tree
        this._nativeParent = null;
        this._nativeContainerInfo = null
    }

    _processProps(newProps) {
        return newProps
    }

    _processContext(context) {
        return this._maskContext(context)
    }
    /**
     * 绑定上下文
     * @param {上下文} context 
     */
    _maskContext(context) {
        const Component = this._currentElement.type
        const contextTypes = Component.contextTypes
        if (contextTypes) {
            const maskedContext = {}

            for (let contextName in contextTypes) {
                maskedContext[contextName] = context[contextName]
            }

            return maskedContext
        }
        return {}
    }
    /**
     * 绑定组件
     * @param {*} transaction 
     * @param {*} nativeParent 
     * @param {*} nativeContainerInfo 
     * @param {*} context 
     */
    mountComponent(
        transaction,
        nativeParent,
        nativeContainerInfo,
        context
    ) {
        this.context = context
        this._nativeParent = nativeParent
        this._nativeContainerInfo = nativeContainerInfo

        const publicProps = this._processProps(this._currentElement.props) //
        const publicContext = this._processContext(context) //

        const Component = this._currentElement.type

        let inst
        // 存储render返回的数据
        let renderedElement

        // 判断是否为继承React.Component类的组件
        if (Component.prototype && Component.prototype.isReactComponent) {
            inst = new Component(publicProps, publicContext, null)
        } else {
            // 默认为function组件
            inst = Component(publicProps, publicContext, null)

            if (inst === null || inst.render == null) {
                renderedElement = inst
                // 无状态组件
                inst = new StatelessComponent(Component) 
            }

        }

        inst.props = publicProps
        inst.context = context
        inst.refs = {}

        this._instance = inst

        // 存储实例
        ReactInstanceMap.set(inst, this)

        // State部分

        // markup

        let markup 
        
        // 执行render
        markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction, context)

        // 钩子函数
        if (inst.componentDidMount) {
            
        }

        return markup
    } 

    performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction, context) {
        const inst = this._instance
        
        if (inst.componentWillMount) {

        }

        if (renderedElement === undefined) {
            renderedElement = this._renderValidatedComponent()
        }

        this._renderedComponent = this._instantiateReactComponent(
            renderedElement
        )

        const markup = ReactReconciler.mountComponent(
            this._renderedComponent,
            transaction,
            nativeParent,
            nativeContainerInfo,
            this._processChildContext(context)
        )

        return markup
    }

    _renderValidatedComponent() {
        return this._renderValidatedComponentWithoutOwnerOrContext()
    }

    _renderValidatedComponentWithoutOwnerOrContext() {
        const inst = this._instance;
        const renderedComponent = inst.render()
        return renderedComponent
    }
    /**
     * 后面讲解
     * @param {*} context 
     */
    _processChildContext(currentContext) {
        const Component = this._currentElement.type
        const inst = this._instance
        const childContext = inst.getChildContext && inst.getChildContext()

        if (childContext) {
            return Object.assign({}, currentContext, childContext)
        }

        return currentContext
    }

    getPublicInstance() {
        var inst = this._instance
        if (inst instanceof StatelessComponent) {
          return null
        }
        return inst
    }
}