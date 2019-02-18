import { REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE} from '../../shared/ReactSymbols'
import { Placement } from '../../shared/ReactSideEffectTags'
import {
    createFiberFromElement,
    createFiberFromText
} from './ReactFiber'

import { isArray } from 'util';

function ChildReconciler(shouldTrackSideEffects) {
    function deleteChild(returnFiber, childToDelete) {

    }

    function deleteRemainingChildren(returnFiber, currentFirstChild) {
        if (!shouldTrackSideEffects) {
            return null
        }
      
          // TODO: For the shouldClone case, this could be micro-optimized a bit by
          // assuming that after the first child we've already added everything.
          let childToDelete = currentFirstChild
          while (childToDelete !== null) {
            deleteChild(returnFiber, childToDelete)
            childToDelete = childToDelete.sibling
          }
          return null
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
        if (typeof newChild === 'string' || typeof newChild === 'number') {
            const created = createFiberFromText(
              '' + newChild,
              returnFiber.mode,
              expirationTime
            )
            created.return = returnFiber
            return created
          }
      
          if (typeof newChild === 'object' && newChild !== null) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE: {
                const created = createFiberFromElement(
                  newChild,
                  returnFiber.mode,
                  expirationTime
                )
                // created.ref = coerceRef(returnFiber, null, newChild);
                created.return = returnFiber
                return created
              }
            }
      
            // if (isArray(newChild) || getIteratorFn(newChild)) {
            //   const created = createFiberFromFragment(
            //     newChild,
            //     returnFiber.mode,
            //     expirationTime,
            //     null,
            //   );
            //   created.return = returnFiber;
            //   return created;
            // }
          }
      
          return null
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
                previousNewFiber = newFiber
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

        return deleteRemainingChildren(returnFiber, currentFirstChild)
    }

    return reconcileChildFibers
}

export const reconcileChildFibers = ChildReconciler(true)
export const mountChildFibers = ChildReconciler(false)