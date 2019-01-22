import ReactChildReconciler from './ReactChildReconciler'
import ReactReconciler from './ReactReconciler'

const ReactMultiChild = {
    mountChildren: function(nestedChildren) {
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
              child,
              this,
              this._nativeContainerInfo
            )
            mountImages.push(mountImage)
          }
        }
        return mountImages
    }
}

export default ReactMultiChild