import { 
  HostComponent,
  HostText
} from '../../../shared/ReactWorkTags'

const randomKey = Math.random().toString(36).slice(2)

const internalInstanceKey = '__reactInternalInstance$' + randomKey
const internalEventHandlersKey = '__reactEventHandlers$' + randomKey

export function getFiberCurrentPropsFromNode(node) {
  return node[internalEventHandlersKey] || null
}

export function getNodeFromInstance(inst) {
  if (inst.tag === HostComponent || inst.tag === HostText) {
    // In Fiber this, is just the state node right now. We assume it will be
    // a host component or host text.
    return inst.stateNode
  }
}

export function getClosestInstanceFromNode(node) {
    if (node[internalInstanceKey]) {
      return node[internalInstanceKey]
    }
  
    while (!node[internalInstanceKey]) {
      if (node.parentNode) {
        node = node.parentNode
      } else {
        // Top of the tree. This node must not be part of a React tree (or is
        // unmounted, potentially).
        return null
      }
    }
  
    let inst = node[internalInstanceKey]
    if (inst.tag === HostComponent || inst.tag === HostText) {
      // In Fiber, this will always be the deepest root.
      return inst
    }
  
    return null
}

export function precacheFiberNode(hostInst, node) {
    node[internalInstanceKey] = hostInst
}

export function updateFiberProps(node, props) {
    node[internalEventHandlersKey] = props
  }