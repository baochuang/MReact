function ReactDOMContainerInfo(topLevelWrapper, node) {
    const info = {
        _topLevelWrapper: topLevelWrapper,
        _ownerDocument: node ?
            node.nodeType === DOC_NODE_TYPE ?   
                node : node.ownerDocument :
                    null
    }
    return info
}