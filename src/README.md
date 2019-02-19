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
    key: null,
    props: {},
    ref: null,
    type: Example,
    _owner: null
}
```
进入render阶段
```
const ReactDOM = {
    render: function(element, container) {
        const root = new ReactRoot(container)

        unbatchedUpdates(() => {
            root.render(children
        })
    }
}
```
ReactRoot
```
function ReactRoot(container) {
    const root = createFiberRoot(container)
    this._internalRoot = root
}
```
ReactFiberRoot
```
function createFiberRoot(containerInfo) {
    const uninitializedFiber = new FiberNode(HostRoot, null, null, mode)
    return {
        current: uninitializedFiber,
        containerInfo: containerInfo,

        earliestSuspendedTime: NoWork,
        latestSuspendedTime: NoWork,
        earliestPendingTime: NoWork,
        latestPendingTime: NoWork,
        latestPingedTime: NoWork,

        pendingCommitExpirationTime: NoWork,
        finishedWork: null,
        timeoutHandle: noTimeout,

        nextExpirationTimeToWorkOn: NoWork,
        firstBatch: null,
        nextScheduledRoot: null
    }
}
```
ReactFiber
```

```