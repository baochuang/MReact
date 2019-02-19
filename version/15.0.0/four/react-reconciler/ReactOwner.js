const ReactOwner = {
    addComponentAsRefTo: function(component, ref, owner) {
        owner.attachRef(ref, component);
    }
}

export default ReactOwner