import ReactReconciler from './ReactReconciler'
import ReactChildReconciler from './ReactChildReconciler'

const ReactMultiChild = {
    mountChildren: function(nestedChildren, transaction, context) {
        const children = this._reconcilerInstantiateChildren(
            nestedChildren, transaction, context
        )
        this._renderedChildren = children
        let mountImages = [];
        let index = 0;
        for (let name in children) {
          if (children.hasOwnProperty(name)) {
            var child = children[name]
            var mountImage = ReactReconciler.mountComponent(
              child,
              transaction,
              this,
              this._nativeContainerInfo,
              context
            );
            child._mountIndex = index++;
            mountImages.push(mountImage);
          }
        }
        return mountImages
    },
    _reconcilerInstantiateChildren: function(nestedChildren, transaction, context) {
        return ReactChildReconciler.instantiateChildren(
            nestedChildren, transaction, context
        )
    }
}

export default ReactMultiChild