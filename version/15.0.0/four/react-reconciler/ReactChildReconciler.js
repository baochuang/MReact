import traverseAllChildren from '../utils/traverseAllChildren'
import instantiateReactComponent from './instantiateReactComponent'

function instantiateChild(childInstances, child, name) {
    // We found a component instance.
    var keyUnique = (childInstances[name] === undefined);
    if (child != null && keyUnique) {
      childInstances[name] = instantiateReactComponent(child);
    }
}

const ReactChildReconciler = {
    instantiateChildren: function(nestedChildNodes, transaction, context) {
        if (nestedChildNodes == null) {
          return null
        }
        var childInstances = {}
        traverseAllChildren(nestedChildNodes, instantiateChild, childInstances)
        // 返回一个对象，key为自动生成
        return childInstances
    }
}

export default ReactChildReconciler