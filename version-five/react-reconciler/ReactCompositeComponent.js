import ReactReconciler from '../react-reconciler/ReactReconciler'
import ReactUpdateQueue from './ReactUpdateQueue'
import ReactInstanceMap from './ReactInstanceMap'
import shouldUpdateReactComponent from './shouldUpdateReactComponent'

let nextMountID = 1

export default class ReactCompositeComponent {
    constructor(element) {
        this._currentElement = element
        this._instance = null
        this._renderedComponent = null
        // for dom tree
        this._nativeParent = null;
        this._nativeContainerInfo = null
        // transaction order
        this._mountOrder = 0
    }

    mountComponent(
        transaction,
        nativeParent,
        nativeContainerInfo
    ) {
        // this._nativeParent = nativeParent
        // this._nativeContainerInfo = nativeContainerInfo

        this._mountOrder = nextMountID++

        const { props: publicProps, type: Component }  = this._currentElement

        let inst
        // 存储render返回的ReactElement对象
        let renderedElement

        // 判断是否为继承React.Component类的组件
        if (Component.prototype && Component.prototype.isReactComponent) {
            inst = new Component(publicProps, ReactUpdateQueue)
        }

        inst.props = publicProps
        inst.updater = ReactUpdateQueue
        
        this._instance = inst

        ReactInstanceMap.set(inst, this)

        let initialState = inst.state

        if (initialState === undefined) {
            inst.state = initialState = null
        }

        this._pendingStateQueue = null
        
        // 执行render
        const markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction)

        if (inst.componentDidMount) {
            transaction.getReactMountReady().enqueue(inst.componentDidMount, inst)
        }

        return markup
    } 

    performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction) {
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
            transaction,
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

    performUpdateIfNecessary(transaction) {
        if (this._pendingStateQueue !== null) {
          this.updateComponent(
            transaction,
            this._currentElement,
            this._currentElement
          );
        }
    }

    updateComponent(
        transaction,
        prevParentElement,
        nextParentElement,
      ) {
        const inst = this._instance
        let willReceive = false
        let nextProps
    
        if (prevParentElement === nextParentElement) {
            nextProps = nextParentElement.props;
        } else {
            nextProps = nextParentElement.props
            willReceive = true
        }
    
        if (willReceive && inst.componentWillReceiveProps) {
            inst.componentWillReceiveProps(nextProps)
        }
    
        const nextState = this._processPendingState(nextProps)
    
        const shouldUpdate = !inst.shouldComponentUpdate ||
                    inst.shouldComponentUpdate(nextProps, nextState)
    
        if (shouldUpdate) {
          this._performComponentUpdate(
            nextParentElement,
            nextProps,
            nextState,
            transaction
          )
        } else {
          this._currentElement = nextParentElement
          inst.props = nextProps;
          inst.state = nextState;
        }
    }

    _processPendingState(props) {
        const inst = this._instance
        const queue = this._pendingStateQueue
        this._pendingStateQueue = null
        if (!queue) {
            return inst.state
        }

        if (queue.length === 1) {
            return queue[0]
        }

        const nextState = Object.assign({}, inst.state)

        for (let i = 0; i < queue.length; i++) {
            const partial = queue[i]
            Object.assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props) : partial)
        }

        return nextState
    }

    _performComponentUpdate(
        nextElement,
        nextProps,
        nextState,
        transaction
    ) {
        const inst = this._instance

        let prevProps
        let prevState

        if (inst.componentDidUpdate) {
            prevProps = inst.props
            prevState = inst.state
        }

        if (inst.componentWillUpdate) {
            inst.componentWillUpdate(nextProps, nextState)
        }

        this._currentElement = nextElement
        inst.props = nextProps
        inst.state = nextState

        this._updateRenderedComponent(transaction)

        if (inst.componentDidUpdate) {
            transaction.getReactMountReady().enqueue(
                inst.componentDidUpdate.bind(inst, prevProps, prevState),
                inst
            )
        }
    }

    _updateRenderedComponent(transaction) {
        const prevComponentInstance = this._renderedComponent
        const prevRenderedElement = prevComponentInstance._currentElement
        const nextRenderedElement = this._renderComponent()

        if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
            ReactReconciler.receiveComponent(
                prevComponentInstance,
                nextRenderedElement,
                transaction
            )
        } else {

        }
    }

    receiveComponent(
        nextElement,
        transaction
    ) {
        const prevElement = this._currentElement

        this.updateComponent(
            transaction,
            prevElement,
            nextElement
        )
    }
}