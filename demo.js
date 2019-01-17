_createInitialChildren(props, context, lazyTree) {

    const contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null
    const childrenToUse = contentToUse != null ? null : props.children

    if (contentToUse) {
        // 将文本绑定到节点上去
        DOMLazyTree.queueText(lazyTree, contentToUse);
    } else if (childrenToUse) {
        const mountImages = this.mountChildren(
            childrenToUse,
            transaction,
            context
        )
        for (var i = 0; i < mountImages.length; i++) {
            DOMLazyTree.queueChild(lazyTree, mountImages[i]);
        }
    }
}