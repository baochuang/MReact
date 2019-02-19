import ReactOwner from './ReactOwner'

function attachRef(ref, component, owner) {
    if (typeof ref === 'function') {
      ref(component.getPublicInstance());
    } else {
      // Legacy ref
      ReactOwner.addComponentAsRefTo(component, ref, owner);
    }
}

const ReactRef = {}

ReactRef.attachRefs = function(instance, element) {
    if (element === null || element === false) {
      return
    }
    const ref = element.ref
    if (ref !== null) {
      attachRef(ref, instance, element._owner)
    }
}

export default ReactRef