import { REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE} from '../../shared/ReactSymbols'
import { Placement } from '../../shared/ReactSideEffectTags'
import {
    createFiberFromElement
} from './ReactFiber'
import { isArray } from 'util';

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

    function reconcileChildrenArray(
        returnFiber,
        currentFirstChild,
        newChildren,
        expirationTime
    ) {
        let resultingFirstChild = null
        let previousNewFiber = null

        let oldFiber = currentFirstChild

        let lastPlacedIndex = 0
        let newIdx = 0
        let nextOldFiber = null
        if (oldFiber === null) {
            for (; newIdx < newChildren.length; newIdx++) {
                const newFiber = createChild(
                    returnFiber,
                    newChildren[newIdx],
                    expirationTime
                )
                if (!newFiber) {
                    continue
                }
                lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx)
                if (previousNewFiber === null) {
                    resultingFirstChild = newFiber
                } else {
                    previousNewFiber.sibling = newFiber
                }
            }
            return resultingFirstChild
        }

        return resultingFirstChild
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

        if (isArray(newChild)) {
            return reconcileChildrenArray(
                returnFiber,
                currentFirstChild,
                newChild,
                expirationTime
            )
        }
    }

    return reconcileChildFibers
}

export const reconcileChildFibers = ChildReconciler(true)
export const mountChildFibers = ChildReconciler(false)