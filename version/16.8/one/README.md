# React DOM绑定
示例一(函数组件)：
```
function Example() {
    return (
        <div>
            Hello World
        </div>
    )
}

const rootContainer = document.querySelector('#root')

const element = <Example />

ReactDOM.render(element, rootContainer)
```
## JSX
在执行前需要被Babel转化为
```
function Example() {
  return React.createElement("div", null, "Hello World")
}

const rootContainer = document.querySelector('#root')
const element = React.createElement(Example, null)
ReactDOM.render(element, rootContainer)
```
## React > ReactElement > createElement
```
const RESERVED_PROPS = {
  key: true,
  ref: true
}

function ReactElement(type, key, ref, owner, props) {
  const element = {
    // React组件唯一标识
    $$typeof: REACT_ELEMENT_TYPE,

    type: type,
    key: key,
    ref: ref,
    props: props,

    _owner: owner
  }
}

export function createElement(type, config, children) {
  let propName

  const props = {}

  // React保留属性
  let key = null
  let ref = null

  if (config != null) {

    ref = config.ref || ref
    key = config.key && '' + config.key || key

    // React组件传入属性
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName]
      }
    }
  }

  // 子组件
  const childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength)
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2]
    }
    props.children = childArray
  }

  // 默认属性值
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    ReactCurrentOwner.current, // 这里为{}
    props
  )
}
```
这里我们将React组件转化为了ReactElement对象，代码执行阶段，首先被转化的是Example(React)组件，得到的ReactElement对象值如下
```
{
  $$type: Symbol.for('react.element'),
  type: Example,
  props: {},
  ref: null,
  key: null
}
```
## ReactDOM > render
我们需要先初始化绑定，获取一个ReactRoot对象, 主要属性_internalRoot为ReactFiberRoot对象
```
root = {
  current: uninitializedFiber,
  containerInfo: containerInfo,
  pendingChildren: null,

  pingCache: null,

  earliestPendingTime: NoWork,
  latestPendingTime: NoWork,
  earliestSuspendedTime: NoWork,
  latestSuspendedTime: NoWork,
  latestPingedTime: NoWork,

  didError: false,

  pendingCommitExpirationTime: NoWork,
  finishedWork: null,
  timeoutHandle: noTimeout,
  context: null,
  pendingContext: null,
  hydrate,
  nextExpirationTimeToWorkOn: NoWork,
  expirationTime: NoWork,
  firstBatch: null,
  nextScheduledRoot: null
}
```
其中current属性值为FiberNode对象,其值为
```
{
  // Instance
  this.tag = tag
  this.key = key
  this.elementType = null
  this.type = null
  this.stateNode = null

  // Fiber
  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0

  this.ref = null

  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null
  this.memoizedState = null
  this.contextDependencies = null

  this.mode = mode

  // Effects
  this.effectTag = NoEffect
  this.nextEffect = null

  this.firstEffect = null
  this.lastEffect = null

  this.expirationTime = NoWork
  this.childExpirationTime = NoWork

  this.alternate = null
}
```