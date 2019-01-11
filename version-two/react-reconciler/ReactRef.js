import ReactOwner from './ReactOwner'

const ReactRef = {}

ReactRef.attachRefs = function(instance, element) {
    if (element === null || element === false) {
      return
    }
    var ref = element.ref
    if (ref != null) {
      attachRef(ref, instance, element._owner)
    }
}

function attachRef(ref, component, owner) {
    if (typeof ref === 'function') {
      ref(component.getPublicInstance());
    } else {
      // Legacy ref
      ReactOwner.addComponentAsRefTo(component, ref, owner);
    }
}

export default ReactRef