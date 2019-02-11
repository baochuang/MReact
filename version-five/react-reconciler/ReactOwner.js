const ReactOwner = {
    addComponentAsRefTo: (component, ref, owner) => {
        owner.attachRef(ref, component)
    }
}

export default ReactOwner