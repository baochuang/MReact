import { REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE} from '../../shared/ReactSymbols'
import { Placement } from '../../shared/ReactSideEffectTags'
import {
    createFiberFromElement
} from './ReactFiber'

function ChildReconciler(shouldTrackSideEffects) {
    function deleteChild(returnFiber, childToDelete) {

    }

    function deleteRemainingChildren(returnFiber, currentFirstChild) {

    }

    function mapRemainingChildren(returnFiber, currentFirstChild) {

    }
    
    function useFiber(fiber, pendingProps, expirationTime) {

    }

    function placeChild(newFiber, lastPlacedIndex, newIndex) {

    }

    function placeSingleChild(newFiber) {
        if (shouldTrackSideEffects && newFiber.alternate === null) {
            newFiber.effectTag = Placement
        }
        return newFiber
    }

    function updateTextNode(
        returnFiber,
        current,
        textContent,
        expirationTime
    ) {

    }

    function updateElement(
        returnFiber,
        current,
        element,
        expirationTime
    ) {

    }

    function updatePortal(
        returnFiber,
        current,
        portal,
        expirationTime
    ) {

    }

    function updateFragment(
        returnFiber,
        current,
        fragment,
        expirationTime,
        key
    ) {

    }

    function createChild(
        returnFiber,
        newChild,
        expirationTime
    ) {

    }

    function reconcileSingleElement(
        returnFiber,
        currentFirstChild,
        element,
        expirationTime
    ) {
        const key = element.key

        if (element.type === REACT_FRAGMENT_TYPE) {
            
        } else {
            const created = createFiberFromElement(
                element,
                returnFiber.mode,
                expirationTime
            )
            // created.ref = coerceRef(returnFiber, currentFirstChild, element)
            created.return = returnFiber
            return created
        }
    }

    function reconcileChildFibers(
        returnFiber,
        currentFirstChild,
        newChild,
        expirationTime
    ) {
        const isObject = typeof newChild === 'object' && newChild !== null

        if (isObject) {
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    return placeSingleChild(
                        reconcileSingleElement(
                        returnFiber,
                        currentFirstChild,
                        newChild,
                        expirationTime,
                        )
                    )
            }
        }
    }

    return reconcileChildFibers
}

export const reconcileChildFibers = ChildReconciler(true)
export const mountChildFibers = ChildReconciler(false)