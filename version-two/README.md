# Version 实现

## Ref

### ReactElement
添加ref
### ReactReconciler
在自定义组件将Virtual DOM绑定到真实DOM后，讲ref对应的真实DOM放入组件实例的refs对象中
```
transaction.getReactMountReady().enqueue(attachRefs, internalInstance)
```
### ReactMount
启动Transaction
```
ReactUpdates.batchedUpdates(
    batchedMountComponentIntoNode,
    componentInstance,
    container,
    shouldReuseMarkup,
    context
)
```

### ReactUpdates & ReactDOMFeatureFlags.useCreateElement
1. batchedUpdates
2. ReactReconcileTransaction.getPooled
3. transaction.perform

### ReactDefaultBatchingStrategy

### Transaction
1. reinitializeTransaction
2. perform