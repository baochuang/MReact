import instantiateReactComponent from './instantiateReactComponent'
import traverseAllChildren from '../utils/traverseAllChildren'
import shouldUpdateReactComponent from './shouldUpdateReactComponent'
import ReactReconciler from './ReactReconciler'

function instantiateChild(childInstances, child, name) {
    var keyUnique = (childInstances[name] === undefined);
    if (child != null && keyUnique) {
      childInstances[name] = instantiateReactComponent(child);
    }
}

const ReactChildReconciler = {
    instantiateChildren: function(nestedChildNodes) {
        if (nestedChildNodes == null) {
          return null
        }
        var childInstances = {}
        traverseAllChildren(nestedChildNodes, instantiateChild, childInstances)
        // 返回一个对象，key为自动生成
        return childInstances
    },
    updateChildren: function(
        prevChildren,
        nextChildren,
        removedNodes,
        transaction,
    ) {
        let prevChild
        let name
        for(name in nextChildren) {
            if (nextChildren.hasOwnProperty(name)) {
                prevChild = prevChildren && prevChildren[name]
                const prevElement = prevChild && prevChild._currentElement
                const nextElement = nextChildren[name]

                if (prevChild != null &&
                    shouldUpdateReactComponent(prevElement, nextElement)) {
                        ReactReconciler.receiveComponent(
                            prevChild, nextElement, transaction
                        )
                        nextChildren[name] = prevChild
                } else {

                }
            }
        }

        for (name in prevChildren) {
            if (prevChildren.hasOwnProperty(name) &&
                !(nextChildren && nextChildren.hasOwnProperty(name))) {
                    prevChild = prevChildren[name]
                    removedNodes[name] = ReactReconciler.getNativeNode(prevChild)
                    // ReactReconciler.unmountComponent(prevChild, false)
            }
        }
    }
}

export default ReactChildReconciler