import { DOC_NODE_TYPE } from '../constants/nodeTypes'

function ReactDOMContainerInfo(node) {
    const info = {
        _idCounter: 1,
        _ownerDocument: node ?
            node.nodeType === DOC_NODE_TYPE ?   
                node : node.ownerDocument :
                    null
    }
    return info
}

export default ReactDOMContainerInfo