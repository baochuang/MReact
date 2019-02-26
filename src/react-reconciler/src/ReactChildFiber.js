import { REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE} from '../../shared/ReactSymbols'
import { Placement } from '../../shared/ReactSideEffectTags'

import {
    createFiberFromElement,
    createFiberFromText,
    createWorkInProgress
} from './ReactFiber'

import {
    HostText,
    Fragment
} from '../../shared/ReactWorkTags'

const isArray = Array.isArray

export function cloneChildFibers(current, workInProgress) {
  
    if (workInProgress.child === null) {
      return
    }
  
    let currentChild = workInProgress.child
    let newChild = createWorkInProgress(
      currentChild,
      currentChild.pendingProps,
      currentChild.expirationTime
    )
    workInProgress.child = newChild
  
    newChild.return = workInProgress
    while (currentChild.sibling !== null) {
      currentChild = currentChild.sibling
      newChild = newChild.sibling = createWorkInProgress(
        currentChild,
        currentChild.pendingProps,
        currentChild.expirationTime,
      )
      newChild.return = workInProgress
    }
    newChild.sibling = null
}

function ChildReconciler(shouldTrackSideEffects) {

    function updateSlot(
        returnFiber,
        oldFiber,
        newChild,
        expirationTime
    ) {
        const key = oldFiber !== null ? oldFiber.key : null

        if (typeof newChild === 'string' || typeof newChild === 'number') {
            if (key !== null) {
                return null
            }

            return updateTextNode(
                returnFiber,
                oldFiber,
                '' + newChild,
                expirationTime
            )
        }

        if (typeof newChild === 'object' && newChild !== null) {
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE: {
                    if (newChild.key === key) {
                        if (newChild.type === REACT_FRAGMENT_TYPE) {

                        }
                        return updateElement(
                            returnFiber,
                            oldFiber,
                            newChild,
                            expirationTime
                        )
                    } else {
                        return null
                    }
                }
            }

            if (isArray(newChild)) {
                if (key !== null) {
                    return null
                }

                return updateFragment(
                    returnFiber,
                    oldFiber,
                    newChild,
                    expirationTime,
                    null,
                )
            }
        }

        return null
    }

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
        const clone = createWorkInProgress(fiber, pendingProps, expirationTime)
        clone.index = 0
        clone.sibling = null
        return clone
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
        if (current === null || current.tag !== HostText) {
            // Insert
            // const created = createFiberFromText(
            //   textContent,
            //   returnFiber.mode,
            //   expirationTime,
            // );
            // created.return = returnFiber
            // return created
          } else {
            // Update
            const existing = useFiber(current, textContent, expirationTime)
            existing.return = returnFiber
            return existing
        }
    }

    function updateElement(
        returnFiber,
        current,
        element,
        expirationTime
    ) {
        if (current !== null && current.elementType === element.type) {
            // Move based on index
            const existing = useFiber(current, element.props, expirationTime)
            // existing.ref = coerceRef(returnFiber, current, element);
            existing.return = returnFiber
            return existing
        } else {

        }
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
        // Update
        for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
            if (oldFiber.index > newIdx) {
              nextOldFiber = oldFiber;
              oldFiber = null
            } else {
              nextOldFiber = oldFiber.sibling
            }
            const newFiber = updateSlot(
              returnFiber,
              oldFiber,
              newChildren[newIdx],
              expirationTime,
            )
            if (newFiber === null) {
                
            }
            if (shouldTrackSideEffects) {
                if (oldFiber && newFiber.alternate === null) {
                
                }
            }
            lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx)
            if (previousNewFiber === null) {
                // TODO: Move out of the loop. This only happens for the first run.
                resultingFirstChild = newFiber
            } else {
                previousNewFiber.sibling = newFiber
            }
            previousNewFiber = newFiber
            oldFiber = nextOldFiber
        }
        // Update
        if (newIdx === newChildren.length) {
            // We've reached the end of the new children. We can delete the rest.
            deleteRemainingChildren(returnFiber, oldFiber);
            return resultingFirstChild;
        }
        // Create
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
        let child = currentFirstChild
        while (child !== null) {
            // TODO: If key === null and child.key === null, then this only applies to
            // the first item in the list.
            if (child.key === key) {
                if (
                    child.tag === Fragment
                    ? element.type === REACT_FRAGMENT_TYPE
                    : child.elementType === element.type
                ) {
                    deleteRemainingChildren(returnFiber, child.sibling)
                    const existing = useFiber(
                        child,
                        element.type === REACT_FRAGMENT_TYPE
                        ? element.props.children
                        : element.props,
                        expirationTime
                    )
                    // existing.ref = coerceRef(returnFiber, child, element)
                    existing.return = returnFiber
                    return existing
                } else {
                    deleteRemainingChildren(returnFiber, child)
                    break
                }
            } else {
                deleteChild(returnFiber, child)
            }
            child = child.sibling
        }
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