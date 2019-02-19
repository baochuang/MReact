import instantiateReactComponent from './instantiateReactComponent'
import traverseAllChildren from '../utils/traverseAllChildren'

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
    }
}

export default ReactChildReconciler