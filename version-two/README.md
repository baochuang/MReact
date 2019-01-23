# state & 生命周期

## 示例
```
class Clock extends React.Component {
    constructor(props) {
      super(props)
      this.state = {date: new Date()}
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      )
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID)
    }
  
    tick() {
      this.setState({
        date: new Date()
      })
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      )
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
)
```
我们将一期的示例代码修改后，继续在一期的代码上执行，会发现报错,这是因为h2实例化的组件对象在mount过程中，其props.children值被解析成三个字符创数组对象
```
["It is ", "12:01:00 PM", "."]
```
这样我们在接下来对其值的实例化调用instantiateReactComponent方法时，会被判断为ComponentTextComponent对象，这在一期里，我们将其忽略，所以现在我们将其加上
```
class ReactDOMTextComponent  {
    constructor(text) {
        this._currentElement = text
        this._stringText = '' + text
    }

    mountComponent(
        nativeParent,
        nativeContainerInfo
    ) {
        const ownerDocument =nativeContainerInfo._ownerDocument
        const lazyTree = DOMLazyTree(ownerDocument.createDocumentFragment())

        if (this._stringText) {
            DOMLazyTree.queueChild(
                lazyTree,
                DOMLazyTree(ownerDocument.createTextNode(this._stringText))
            )
        }

        return lazyTree
    }
}
```
这和ReactComponent所做的事是一样，提供一个mountComponent方法，新建  一个文本DOM对象，将内容放入，并调用DOMLazyTree函数返回DOMLazyTree对象方便后面的绑定操作。至此，我们的代码又成功运行起来，并正确显示。但是，可以看到我们的componentDidMount方法和componentWillUnmount并没有被调用执行,那么问题来了，这两个方法会在哪里被调用呢？  
我们知道React组件被我们抽象成了四个，我们现在接触了三个，其中ReactDOMComponent和ReactDOMTextComponent都是对HTML标签的处理，示例中的Clock Class是我们的自定义组件ReactCompositeComponent，所以这两个方法也是我们自定义组件的实例方法，其执行自然是在我们的自定义组件内部方法中，到目前为止我们的自定义实例供外部调用的主要是mountComponent和render。

## 生命周期
![生命周期](/images/test.png)

这是React官网提供的生命周期图，我们可以先从开始到组件运行时这一段的实现
```
if (config) {
    let defaultProps

    if (element.type && element.type.defaultProps) {
        defaultProps = element.type.defaultProps
    }

    for (let propName in config) {
        props[propName] = config[propName] || defaultProps[propName]
    }
} 
```
这是对defaultProps的支持，在React.createElement函数中，也就是Class组件被转换为ReactElement时被执行。记下来是组件的实例化
```
class ReactCompositeComponentWrapper extends ReactCompositeComponent {
    constructor(element) {
        super(element)
        this._instantiateReactComponent = instantiateReactComponent
    }
}

function instantiateReactComponent(node) {
    let instance

    ...

    instance = new ReactCompositeComponentWrapper(element) 
}
```
它是在instantiateReactComponent工厂函数中被执行,接下来是componentWillMount，这里我们的示例并没有添加，但因为实现简单，所以我们依旧在代码里面实现
```
performInitialMount(renderedElement, nativeParent, nativeContainerInfo) {
    if (inst.componentWillMount) {
        inst.componentWillMount()
    }
    ......
}
```
这个函数的触发是在performInitialMount函数内，并且在第一时间执行，而后被调用_renderComponent函数执行render函数
```
_renderComponent() {
    const inst = this._instance;
    const renderedComponent = inst.render()
    return renderedComponent
}
```
自定义组件在执行performInitialMount函数最终拿到其对应的DOMLazyTree，而后我们的componentDidMount便开始被触发，但和前面的几个函数触发调用不同，componentDidMount函数的调用执行是在事务中。
```
if (inst.componentDidMount) {
      transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
}
```

## 事务
我们在一期的时候，刻意删除了事务部分的代码，但在React中，渲染，批处理, 事件处理，生命周期实现都是基于事务来实现的。现在我们来正式接触它。
```
const render = function(element, container) {
    const componentInstance = instantiateReactComponent(element)

    ReactUpdates.batchedUpdates(
        batchedMountComponentIntoNode,
        componentInstance,
        container
    )

    return componentInstance
}
```
在加入事务后，我们的ReactDOM.render方法便从单个方法的执行转为了基于事务的批量处理调用执行，我们首先看ReactUpdates.batchedUpdates方法
```
const batchingStrategy = ReactDefaultBatchingStrategy

const batchedUpdates = function(callback, a, b, c) {
    batchingStrategy.batchedUpdates(callback, a, b, c)
}

const ReactDefaultBatchingStrategy = {
    isBatchingUpdates: false,

    batchedUpdates: function(callback, a, b, c) {
        const alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates

        ReactDefaultBatchingStrategy.isBatchingUpdates = true

        if (alreadyBatchingUpdates) {
            callback(a, b, c)
        } else {
            transaction.perform(callback, a, b, c)
        }
    }
}
```
batchedUpdates依靠isBatchingUpdates来进行批量更新判断，这里我们初次调用，先是进入批量更新中，这里调用transaction.perform(callback, a, b)，这里我们来了解下transaction
```
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 ```
 上图是React源码中Transaction文件对事务的描述，形象地解释了它的作用。  
 事务就是将需要执行的方法使用wrapper封装起来，再通过事务提供的perform方法执行。而在perform之前，先执行所有wrapper中initialize方法，执行完perform之后(即执行完method方法后)再执行所有的close方法。  
 一组initialize及close方法被称之为一个wrapper，从上图可以看出事务支持多个wrapper的叠加。

```
const RESET_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: emptyFunction
}
  
const FLUSH_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: emptyFunction
}

class ReactDefaultBatchingStrategyTransaction extends Transaction {
    constructor() {
        super()
        this.getTransactionWrappers = getTransactionWrappers
        this.reinitializeTransaction()
    }
}

const getTransactionWrappers = function() {
    return TRANSACTION_WRAPPERS
}

const transaction = new ReactDefaultBatchingStrategyTransaction()
```
ReactDefaultBatchingStrategyTransaction是Transaction的实例，并对其进行了扩展，TRANSACTION_WRAPPERS对象就是两个wrapper,在实例化调用构造函数时执行reinitializeTransaction方法，该方法实现在Transaction类中
```
class Transaction {
    reinitializeTransaction() {
        this.transactionWrappers = this.getTransactionWrappers()

        if (this.wrapperInitData) {
            this.wrapperInitData.length = 0
        } else {
            this.wrapperInitData = []
        }
        this._isInTransaction = false
    }
}
```
这里我们在ReactDefaultBatchingStrategyTransaction中赋值了getTransactionWrappers，其返回的是两个包含initialize和close方法的对象，目前暂时没有，所以没做实现。接下来看perform方法
```
class Transaction {
    constructor() {
        this._isInTransaction = false
    }

    perform(method, a, b, c) {
        let errorThrow
        let result
        try {
            this._isInTransaction = true

            errorThrow = true

            this.initializeAll(0)

            result = method(a, b)

            errorThrow = false
        } finally {
            try {
                this.closeAll(0)
            } finally {
                this._isInTransaction = false
            }
        }
        return result
    }

    initializeAll(startIndex) {

    }

    closeAll(startIndex) {
        
    }
}
```
perform方法对要执行的callback函数做try catch的异常捕获，并进行处理，在try模块中调用callback方法执行
```
const ReactDOMFeatureFlags = {
    useCreateElement: true
}

const batchedMountComponentIntoNode = function(
    componentInstance,
    container
) {
    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled(ReactDOMFeatureFlags.useCreateElement)
    ......
}
```
ReactUpdates.ReactReconcileTransaction对应的是ReactReconcilerTransaction，我们调用它的getPooled方法获取到一个transaction
```
export default class ReactReconcilerTransaction extends Transaction {
    constructor(useCreateElement) {
        super()
    }
}

PooledClass.addPoolingTo(ReactReconcilerTransaction)
```
ReactReconcilerTransaction继承Transaction，包含perform方法，ReactgetPooled我们通过装饰者模式调用PooledClass.addPoolingTo方法直接对ReactReconcilerTransaction赋值将getPooled方法绑定到类属性中作为类的静态方法，而为什么采取这种方式赋值，是作为一种抽离，在多处被调用。我们先来看看PooledClass.addPoolingTo的实现
```
const oneArgumentPooler = function(copyFieldsFrom) {
    const Klass = this;
    if (Klass.instancePool.length) {
      const instance = Klass.instancePool.pop()
      Klass.call(instance, copyFieldsFrom);
      return instance
    } else {
      return new Klass(copyFieldsFrom);
    }
}

const DEFAULT_POOLER = oneArgumentPooler

const addPoolingTo = function(CopyConstructor, pooler) {
    const NewKlass = CopyConstructor
    NewKlass.instancePool = []
    NewKlass.getPooled = pooler || DEFAULT_POOLER
    ......
}

const PooledClass = {
  addPoolingTo
}
```
这里pooler对象为空，所以getPooled为默认方法oneArgumentPooler,在示例中被执行返回ReactReconcilerTransaction的实例
```
const batchedMountComponentIntoNode = function(
    componentInstance,
    container
) {

    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled()

    transaction.perform(
        mountComponentIntoNode,
        componentInstance,
        container，
        transaction
    )
}
```
我们拿到ReactReconcilerTransaction的实例后调用getPooled方法拿到其事务对象，然后执行其perform方法,在前面的解析中我们知道执行顺序，由于我们的wrapper并没有需要执行的代码，所以，我们依旧是只执行了我们的method(mountComponentIntoNode)方法,截止目前，事务部分暂时讲到这里。

## 生命周期
我们继续回到之前的代码去，这里我们已经知道transaction对象就是我们上面ReactUpdates.ReactReconcileTransaction.getPooled()获取到的事务对象。
```
if (inst.componentDidMount) {
      transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
}
```
这里分两步，第一步调用transaction的示例方法getReactMountReady，第二步执行enqueue方法，将组件实例及其componentDidMount实例方法传入,这个方法是在对Transaction类的实现类ReactReconcilerTransaction上
```
class ReactReconcilerTransaction extends Transaction {
        constructor(useCreateElement) {
            super()
            ...
            this.getReactMountReady = getReactMountReady
            this.reactMountReady = CallbackQueue.getPooled(null)
            ...
        }
}

function getReactMountReady() {
    return this.reactMountReady
}
```
我们看到getReactMountReady方法获取的是一个reactMountReady对象，而这个对象是调用CallbackQueue的getPooled方法来拿到的。
```
class CallbackQueue {
    constructor() {
        this._callbacks = null
        this._contexts = null
    }
}

PooledClass.addPoolingTo(CallbackQueue)
```
对PooledClass.addPoolingTo是不是有种熟悉感，没错，在上文中我们同样用到过这个方法并提醒过我们后面还会用到，现在我们再一次和它见面了
```
const oneArgumentPooler = function(copyFieldsFrom) {
    const Klass = this;
    if (Klass.instancePool.length) {
      const instance = Klass.instancePool.pop()
      Klass.call(instance, copyFieldsFrom);
      return instance
    } else {
      return new Klass(copyFieldsFrom);
    }
}

const DEFAULT_POOLER = oneArgumentPooler

const addPoolingTo = function(CopyConstructor, pooler) {
    const NewKlass = CopyConstructor
    NewKlass.instancePool = []
    NewKlass.getPooled = pooler || DEFAULT_POOLER
    ......
}

const PooledClass = {
  addPoolingTo
}
```
在这里我们调用getPooled方法获取到的就是CallbackQueue对象，所以我们第二步就是调用其enqueue对象方法
```
class CallbackQueue {

    ......

    enqueue(callback, context) {
        this._callbacks = this._callbacks || []
        this._contexts = this._contexts || []
        this._callbacks.push(callback)
        this._contexts.push(context)
    }
}
```
我们可以看到我们的componentDidMount函数及其所在的组件实例最终被放入了一个CallbackQueue的数组对象中，这就是我们的事务任务队列，那么这个任务会在什么时候被拿出并执行呢，从生命周期图可以看出，它是在对应组件实例render函数被调用后。
```
closeAll(startIndex) {
        const transactionWrappers = this.transactionWrappers

        for (let i = startIndex; i < transactionWrappers.length; i++) {
            const wrapper = transactionWrappers[i]
            const initData = this.wrapperInitData[i]

            let errorThrown

            try {
                errorThrown = true

                if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
                    wrapper.close.call(this, initData)
                }

                errorThrown = false
            } finally {
                if (errorThrown) {
                    try {
                        this.closeAll(i + 1)
                    } catch (e) {

                    }
                }
            }
        }
    }
}
```
回忆一下render的执行在事务中是调用method方法，而componentDidMount方法的调用是在其后，那么应该是发生在closeAll方法中，那也就是wrapper的close方法中。遵循事务的执行顺序，自然在close之前，先initialize
```
const ON_DOM_READY_QUEUEING = {
    initialize: function() {
        this.reactMountReady.reset()
    },
    close: function() {
        this.reactMountReady.notifyAll()
    }
}
```
ON_DOM_READY_QUEUEING这个wrapper和它的名字一致，就是在render执行完成，DOM节点被绑定后执行的wrapper
```
    reset() {
        this._callbacks = null
        this._contexts = null
    }

    notifyAll() {
        const callbacks = this._callbacks
        const contexts = this._contexts
        if (callbacks) {
          this._callbacks = null
          this._contexts = null
          for (var i = 0; i < callbacks.length; i++) {
            callbacks[i].call(contexts[i])
          }
          callbacks.length = 0
          contexts.length = 0
        }
    }
```
reactMountReady为当前事务队列(CallbackQueue)对象，在wrapper中，先调用initialize重置，在method执行后再执行被enqueue进来的任务,这里就是我们的componentDidMount函数。
```
componentDidMount() {
    this.timerID = setInterval(
    () => this.tick(),
    1000
    )
}

tick() {
    this.setState({
        date: new Date()
    })
}
```
终于我们的componentDidMount函数被执行了，接下来就是this.setState方法被调用了，在示例中我们的App Class是继承自ReactComponent类，该类实现了setState方法
```
class ReactComponent {
    constructor(props, updater) {
        this.props = props
        this.updater = updater
    }

    setState(partialState, callback) {
        this.updater.enqueueSetState(this, partialState)
    }
}

class ReactCompositeComponent {
    ......
    mountComponent() {
        ......
        if (Component.prototype && Component.prototype.isReactComponent) {
            inst = new Component(publicProps, ReactUpdateQueue)
        }
    }
    ......
}
```
可以看出setState调用的this.updater对象为ReactUpdateQueue对象
```
const ReactUpdateQueue = {
    enqueueSetState: function(publicInstance, partialState) {
        const internalInstance = getInternalInstanceReadyForUpdate(publicInstance)
    
        ......
    }
}
```
这里的publicInstance是我们的Clock的实例，partialState是我们传入的{date: new Date()}对象，我们先看getInternalInstanceReadyForUpdate方法
```
function getInternalInstanceReadyForUpdate(publicInstance) {
    const internalInstance = ReactInstanceMap.get(publicInstance)
  
    return internalInstance
}
```
我们以publicInstance为key调用ReactInstanceMap对象的get方法获取value并返回，在我们上文中，并没有存储这么一条记录，现在我们把存储的这部分实现,毫无疑问这部分的实现自然是在ReactCompositeComponent内
```
mountComponent(
    ......
) {
     let inst

    ......

    // 判断是否为继承React.Component类的组件
    if (Component.prototype && Component.prototype.isReactComponent) {
        inst = new Component(publicProps, ReactUpdateQueue)
    }

    inst.updater = ReactUpdateQueue
    ......

    ReactInstanceMap.set(inst, this)
}

```
这里我们同样看看ReactInstanceMap
```
const ReactInstanceMap = {
 
    get: function(key) {
      return key._reactInternalInstance
    },
  
    set: function(key, value) {
      key._reactInternalInstance = value
    }
  
}
```
这样我们知道，通过传入的Clock类实例我们拿到了其对应的ReactCompositeComponent类的实例,接下来我们继续分析
```
const ReactUpdateQueue = {
    enqueueSetState: function(publicInstance, partialState) {
        const internalInstance = getInternalInstanceReadyForUpdate(publicInstance)
    
        if (!internalInstance) {
          return
        }
    
        const queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = [])

        queue.push(partialState)
    
        enqueueUpdate(internalInstance)
    }
}
```
获取这个ReactCompositeComponent类的实例的_pendingStateQueue, 同样这个实例属性在上文是没有实现的，我们先在mount函数中，给它填上
```
mountComponent(
    ......
) {
    ......
    this._pendingStateQueue = null
    ......
}
```
目前我们的queue对象为空数组，然后我们将{date: new Date()}放入这个数组当中，然后执行enqueueUpdate
```
function enqueueUpdate(internalInstance) {
  ReactUpdates.enqueueUpdate(internalInstance)
}
```
我们接下来看ReactUpdates.enqueueUpdate的实现
```
let dirtyComponents = []

function enqueueUpdate(component) {
    dirtyComponents.push(component)
}
```
我们将Clock类组件对应的ReactCompositeComponent实例放入dirtyComponents数组中，这时候我们的enqueueSetState就算执行完成，那么它的state值是在哪个阶段更新的呢？
```
function flushBatchedUpdates() {
    while (dirtyComponents.length) {
        const transaction = ReactUpdatesFlushTransaction.getPooled()
        transaction.perform(runBatchedUpdates, transaction)
        ReactUpdatesFlushTransaction.release(transaction)
    }
}
```
自然是在我们的事务任务FLUSH_BATCHED_UPDATES当中，最终是在flushBatchedUpdates函数中执行,这里我们区分我们之前的DOM调度事务，使用新的事务实现ReactUpdatesFlushTransaction
```
const NESTED_UPDATES = {
    initialize: function() {
      this.dirtyComponentsLength = dirtyComponents.length
    },
    close: function() {

    }
}
  
const UPDATE_QUEUEING = {
    initialize: function() {
      this.callbackQueue.reset()
    },
    close: function() {
      this.callbackQueue.notifyAll()
    }
}

const TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING]

const getTransactionWrappers = function() {
    return TRANSACTION_WRAPPERS
}

export class ReactUpdatesFlushTransaction extends Transaction {
    constructor() {
        super()
        this.getTransactionWrappers = getTransactionWrappers
        this.reinitializeTransaction()
        this.dirtyComponentsLength = null
        this.callbackQueue = CallbackQueue.getPooled()
    }
}

ReactUpdatesFlushTransaction.release = function(transaction) {

}

PooledClass.addPoolingTo(ReactUpdatesFlushTransaction)
```
新的事务主要对dirtyComponent的处理，该事物的两个wrapper的initialize被实现，所以，我们需要在Transaction对initialize做实现了
```
initializeAll(startIndex) {
    const transactionWrappers = this.transactionWrappers

    for (let i = startIndex; i < transactionWrappers.length; i++) {
        const wrapper = transactionWrappers[i]
        try {
            this.wrapperInitData[i] = Transaction.OBSERVED_ERROR
            this.wrapperInitData[i] = wrapper.initialize ?
                wrapper.initialize.call(this) : null
        } finally {
            if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
                try {
                    this.initializeAll(i + 1)
                } catch(err) {
                    
                }
            }
        }
    }
}
```
我们继续看runBatchedUpdates
```
function mountOrderComparator(c1, c2) {
    return c1._mountOrder - c2._mountOrder;
}

function runBatchedUpdates(transaction) {
    const len = transaction.dirtyComponentsLength

    dirtyComponents.sort(mountOrderComparator)

    for (var i = 0; i < len; i++) {
        var component = dirtyComponents[i]

        ReactReconciler.performUpdateIfNecessary(
            component,
            transaction.reconcileTransaction
        )
    }
}
```
```
const ReactReconciler = {
    performUpdateIfNecessary: function(
        internalInstance,
        transaction
    ) {
        internalInstance.performUpdateIfNecessary(transaction)
    }
}
```


## 依赖注入
React源码采用了依赖注入的方式来解决，这种方式在很多地方被采用，后面还会出现。
```
let batchingStrategy

const ReactUpdatesInjection = {
    injectBatchingStrategy: function(_batchingStrategy) {
        batchingStrategy = _batchingStrategy
    }
}

const ReactUpdates = {
    ......
    injection: ReactUpdatesInjection
}

const ReactInjection = {
    Updates: ReactUpdates.injection
}

function inject() {
    ReactInjection.Updates.injectBatchingStrategy(
        ReactDefaultBatchingStrategy
    )
}

const ReactDefaultInjection = {
    inject
}

ReactDefaultInjection.inject()
```
ReactDefaultInjection.inject方法在ReactMount中被最先执行