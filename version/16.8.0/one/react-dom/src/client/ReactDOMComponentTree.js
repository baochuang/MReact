const randomKey = Math.random().toString(36).slice(2)

const internalInstanceKey = '__reactInternalInstance$' + randomKey

export function precacheFiberNode(hostInst, node) {
    node[internalInstanceKey] = hostInst
}