# React源码解析
为了方便学习，这里按照React的功能实现，以demo为切入点, 针对demo来完成一个简单阉割版的React, demo以数字为序，逐步添加React Feature或新的API实现,使得对React的每个Feature的了解直接落入源码实现上。

## Mount阶段
在学习React API或者Feature前，我们需要对React的渲染过程有个清晰的了解，即React是如何把React组件绑定到HTML页面的根节点上的，所以我们先从Mount阶段开始。

## Version
这里对React的解析分为两个版本，分别为15.0.0和16.8.0,这是两个大版本，在16之前，React的调度还是使用Stack调度，其源码实现相对简单，本人在研究master代码前，就是先看的15.0.0版本，《深入React技术栈》中对源码的解析就是基于这个版本，本人就是先看的此书，而后自己再看源码。16.8.0是本人此刻编写时最新的大版本，也是master分支的内容，后面新的feature更新和改动，都会有新的demo和代码实现

### 15.0.0
[点击此处](/version/15.0.0/README.md)

### 16.8.0
[点击此处](/version/16.8.0/README.md)