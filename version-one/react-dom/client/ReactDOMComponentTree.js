
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