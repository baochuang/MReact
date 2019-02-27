import { REACT_ELEMENT_TYPE } from '../../shared/ReactSymbols'
import { createFiberFromElement } from './ReactFiber'

function ChildReconciler(shouldTrackSideEffects) {

    function reconcileSingleElement(
        returnFiber,
        element
    ) {

        const created = createFiberFromElement(
            element,
            returnFiber.mode
        )
        
        created.return = returnFiber
        return created
    }

    function placeSingleChild(newFiber) {
        if (shouldTrackSideEffects && newFiber.alternate === null) {
            newFiber.effectTag = Placement
        }
        return newFiber
    }

    function reconcileChildFibers(
        returnFiber,
        currentFirstChild,
        newChild
    ) {
        const isObject = typeof newChild === 'object' && newChild !== null

        if (isObject) {
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    return placeSingleChild(
                        reconcileSingleElement(
                            returnFiber,
                            newChild
                        )
                    )
            }
        }
    }

    return reconcileChildFibers
}

export const reconcileChildFibers = ChildReconciler(true)
export const mountChildFibers = ChildReconciler(false)