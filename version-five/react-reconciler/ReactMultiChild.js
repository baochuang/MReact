import ReactChildReconciler from './ReactChildReconciler'
import ReactReconciler from './ReactReconciler'
import flattenChildren from '../utils/flattenChildren'

function enqueue(queue, update) {
  if (update) {
    queue = queue || []
    queue.push(update)
  }
  return queue
}

function makeMove(child, afterNode, toIndex) {
  return {
    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
    content: null,
    fromIndex: child._mountIndex,
    fromNode: ReactReconciler.getNativeNode(child),
    toIndex: toIndex,
    afterNode: afterNode
  }
}

const ReactMultiChild = {
    mountChildren: function(transaction, nestedChildren) {
        const children = ReactChildReconciler.instantiateChildren(
          nestedChildren
        )

        this._renderedChildren = children
        let mountImages = []
        let index = 0
        for (let name in children) {
          if (children.hasOwnProperty(name)) {
            var child = children[name]
            var mountImage = ReactReconciler.mountComponent(
              transaction,
              child,
              this,
              this._nativeContainerInfo
            )
            child._mountIndex = index++
            mountImages.push(mountImage)
          }
        }
        return mountImages
    },
    updateChildren: function(nextNestedChildrenElements, transaction) {
      const prevChildren = this._renderedChildren
      const removedNodes = {}
      const nextChildren = this._reconcilerUpdateChildren(
        prevChildren,
        nextNestedChildrenElements,
        removedNodes,
        transaction
      )

      if (!nextChildren && !prevChildren) {
        return
      }

      let updates
      let lastIndex = 0
      let nextIndex = 0
      let lastPlacedNode = null
      for (let name in nextChildren) {
        if(nextChildren.hasOwnProperty(name)) {
          const prevChild = prevChildren && prevChildren[name]
          const nextChild = nextChildren[name]

          if (prevChild === nextChild) {
            updates = enqueue(
              updates,
              this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex)
            )
            lastIndex = Math.max(prevChild._mountIndex, lastIndex)
            prevChild._mountIndex = nextIndex
          } else {

          }
        }
      }
    },

    moveChild: function(child, afterNode, toIndex, lastIndex) {
      if (child._mountIndex < lastIndex) {
        return makeMove(child, afterNode, toIndex);
      }
    },

    _reconcilerUpdateChildren: function(      
      prevChildren,
      nextNestedChildrenElements,
      removedNodes,
      transaction,
    ) {
      const nextChildren = flattenChildren(nextNestedChildrenElements)

      ReactChildReconciler.updateChildren(
        prevChildren, 
        nextNestedChildrenElements, 
        nextChildren, 
        removedNodes, 
        transaction
      )

      return nextChildren
    }
}

export default ReactMultiChild