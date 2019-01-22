import ReactReconciler from '../react-reconciler/ReactReconciler'
import ReactUpdateQueue from './ReactUpdateQueue'
import ReactInstanceMap from './ReactInstanceMap'

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

        this._instance = inst

        ReactInstanceMap.set(inst, this)

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
            this._currentElement,
            this._context,
            this._context
          );
        }
    }

    updateComponent(
        transaction,
        prevParentElement,
        nextParentElement,
        prevUnmaskedContext,
        nextUnmaskedContext
      ) {
        // var inst = this._instance
        // var willReceive = false
        // var nextContext
        // var nextProps
    
        // // Determine if the context has changed or not
        // if (this._context === nextUnmaskedContext) {
        //   nextContext = inst.context;
        // } else {
        //   nextContext = this._processContext(nextUnmaskedContext);
        //   willReceive = true;
        // }
    
        // // Distinguish between a props update versus a simple state update
        // if (prevParentElement === nextParentElement) {
        //   // Skip checking prop types again -- we don't read inst.props to avoid
        //   // warning for DOM component props in this upgrade
        //   nextProps = nextParentElement.props;
        // } else {
        //   nextProps = this._processProps(nextParentElement.props);
        //   willReceive = true;
        // }
    
        // // An update here will schedule an update but immediately set
        // // _pendingStateQueue which will ensure that any state updates gets
        // // immediately reconciled instead of waiting for the next batch.
        // if (willReceive && inst.componentWillReceiveProps) {
        //   inst.componentWillReceiveProps(nextProps, nextContext);
        // }
    
        // var nextState = this._processPendingState(nextProps, nextContext);
    
        // var shouldUpdate =
        //   this._pendingForceUpdate ||
        //   !inst.shouldComponentUpdate ||
        //   inst.shouldComponentUpdate(nextProps, nextState, nextContext);
    
        // if (shouldUpdate) {
        //   this._pendingForceUpdate = false;
        //   // Will set `this.props`, `this.state` and `this.context`.
        //   this._performComponentUpdate(
        //     nextParentElement,
        //     nextProps,
        //     nextState,
        //     nextContext,
        //     transaction,
        //     nextUnmaskedContext
        //   );
        // } else {
        //   // If it's determined that a component should not update, we still want
        //   // to set props and state but we shortcut the rest of the update.
        //   this._currentElement = nextParentElement;
        //   this._context = nextUnmaskedContext;
        //   inst.props = nextProps;
        //   inst.state = nextState;
        //   inst.context = nextContext;
        // }
    }
}