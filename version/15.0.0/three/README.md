# Version 3
1. 添加React事件机制

## React事件机制
react事件机制分为两个部分：事件注册和事件分发

### 事件注册
所有的事件都会注册到document上，拥有统一的回调函数dispatchEvent来执行事件分发

### 事件分发
首先生成合成事件，注意同一种事件类型只能生成一个合成事件Event，如onclick这个类型的事件，dom上所有带有通过jsx绑定的onClick的回调函数都会按顺序（冒泡或者捕获）会放到Event._dispatchListeners 这个数组里，后面依次执行它。