# React Fiber (React master)

## 示例
```
function Example() {
    const [count, setCount] = React.useState(0)

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)} >
                Click me
            </button>
        </div>
    )
}

const rootContainer = document.querySelector('#root')

const element = <Example />

ReactDOM.render(element, rootContainer)
```
按执行顺序来，第一步，babel转换
```
function Example() {
  const [count, setCount] = React.useState(0);
  return React.createElement("div", null, React.createElement("p", null, "You clicked ", count, " times"), React.createElement("button", {
    onClick: () => setCount(count + 1)
  }, "Click me"));
}

const rootContainer = document.querySelector('#root');
const element = React.createElement(Example, null);
ReactDOM.render(element, rootContainer);
```
转换后，脚本放入页面加载执行，得到element值
```
{
    $$typeof: Symbol(react.element),
    type: Example
}
```
进入render阶段
```
const ReactDOM = {
    render: function(element, container) {
        const root = new ReactRoot(container)
        root.render(element)
    }
}
```
ReactRoot
```
function ReactRoot(container) {
    const root = createContainer(container)
    this._internalRoot = root
}
```
ReactFiberReconciler 
```
function createContainer(
    containerInfo
) {
    return createFiberRoot(containerInfo)
}
```
ReactFiber
```
function createFiberRoot(containerInfo) {
    const uninitializedFiber = createHostRootFiber()
    return {
        current: uninitializedFiber,
        containerInfo: containerInfo
    }
}

function createHostRootFiber() {
    let mode =  NoContext

    return createFiber(HostRoot, mode)
}

const createFiber = function(
    tag,
    mode
){
    return new FiberNode(tag,  mode)
}

function FiberNode(
    tag,
    mode
) {
    // instance
    this.tag = tag
    
    this.mode = mode
}
```
ReactWorkTags
```
const HostRoot = 3
```
ReactTypeOfMode
```
const NoContext = 0b000
```
render
```
ReactRoot.prototype.render = function(children) {
    const root = this._internalRoot
    updateContainer(children, root)
}
```
updateContainer
```
export function updateContainer(
    element,
    container
) {
    const current = container.current

    return scheduleRootUpdate(current, element)
}
```
scheduleRootUpdate
```
function scheduleRootUpdate(
    current,
    element
) {
    const update = createUpdate(expirationTime)

    update.payload = {element}

    flushPassiveEffects()
    enqueueUpdate(current, update)
    scheduleWork(current, expirationTime)
  
    return expirationTime
}
```