const internalInstanceKey = `__reactInternalInstance$${Math.random().toString(36).slice(2)}`

export const getNodeFromInstance = (inst) => {
    if (inst._nativeNode) {
        return inst._nativeNode
    }

    let parents = []

    while (!inst._nativeNode) {
        parents.push(inst)

        inst = inst._nativeParent
    }

    return inst._nativeNode
}

/**
 * 在实例上填充_nativeNode
 * @param {*} inst 
 * @param {*} node 
 */
export const precacheNode = function(inst, node) {
    const nativeInst = getRenderedNativeOrTextFromComponent(inst)
    nativeInst._nativeNode = node
    node[internalInstanceKey] = nativeInst
}

function getRenderedNativeOrTextFromComponent(component) {
    let rendered 
    while ((rendered = component._renderedComponent)) {
        component = rendered
    }
    return component
}

const ReactDOMComponentTree = {
    precacheNode,
    getNodeFromInstance
}

export default ReactDOMComponentTree