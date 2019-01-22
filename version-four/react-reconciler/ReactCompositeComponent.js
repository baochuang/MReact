import ReactReconciler from '../react-reconciler/ReactReconciler'

export default class ReactCompositeComponent {
    constructor(element) {
        this._currentElement = element
        this._instance = null
        this._renderedComponent = null
        // for dom tree
        this._nativeParent = null;
        this._nativeContainerInfo = null
    }

    mountComponent(
        nativeParent,
        nativeContainerInfo
    ) {
        // this._nativeParent = nativeParent
        // this._nativeContainerInfo = nativeContainerInfo

        const { props: publicProps, type: Component }  = this._currentElement

        let inst
        // 存储render返回的ReactElement对象
        let renderedElement

        // 判断是否为继承React.Component类的组件
        if (Component.prototype && Component.prototype.isReactComponent) {
            inst = new Component(publicProps)
        }

        inst.props = publicProps

        this._instance = inst

        // 执行render
        const markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo)

        if (inst.componentDidMount) {
            // transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
        }

        return markup
    } 

    performInitialMount(renderedElement, nativeParent, nativeContainerInfo) {
        const inst = this._instance

        if (inst.componentWillMount) {
            inst.componentWillMount()
        }
        
        if (renderedElement === undefined) {
            renderedElement = this._renderComponent()
        }

        this._renderedComponent = this._instantiateReactComponent(
            renderedElement
        )

        const markup = ReactReconciler.mountComponent(
            this._renderedComponent,
            nativeParent,
            nativeContainerInfo
        )

        return markup
    }

    _renderComponent() {
        const inst = this._instance;
        const renderedComponent = inst.render()
        return renderedComponent
    }
}