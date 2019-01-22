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
我们在一期的时候，刻意删除了事务部分的代码，但在React中，渲染，事件处理，生命周期实现都是基于事务来实现的。现在我们来正式接触它。
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

const batchedUpdates = function(callback, a, b) {
    batchingStrategy.batchedUpdates(callback, a, b)
}

const ReactDefaultBatchingStrategy = {
    isBatchingUpdates: false,

    batchedUpdates: function(callback, a, b) {
        const alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates

        ReactDefaultBatchingStrategy.isBatchingUpdates = true

        if (alreadyBatchingUpdates) {
            callback(a, b)
        } else {
            transaction.perform(callback, a, b)
        }
    }
}
```
batchedUpdates依靠isBatchingUpdates来进行批量更新判断，这里我们初次调用，先是进入批量更新中，这里调用transaction.perform(callback, a, b)
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
我们可以看到transaction是ReactDefaultBatchingStrategyTransaction实例化后的对象，在实例化调用构造函数时执行reinitializeTransaction方法，该方法实现在Transaction类中
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

    perform(method, a, b) {
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
    ......
    transaction.perform(
        mountComponentIntoNode,
        componentInstance,
        container
    )
}
```
我们拿到ReactReconcilerTransaction的实例后，就要开始执行其perform方法
