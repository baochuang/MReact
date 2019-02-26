import { 
  getRootHostContainer,
  getHostContext,
  popHostContainer
} from './ReactFiberHostContext'

import {
    HostComponent,
    HostRoot,
    HostText,
    FunctionComponent
} from '../../shared/ReactWorkTags'

import {
    createInstance,
    createTextInstance,
    supportsMutation,
    finalizeInitialChildren,
    appendInitialChild
} from './ReactFiberHostConfig'

import {
    popTopLevelContextObject as popTopLevelLegacyContextObject
} from './ReactFiberContext'

import {
    popHydrationState
} from './ReactFiberHydrationContext'

import {
  Placement,
  Update
} from '../../shared/ReactSideEffectTags'

function markUpdate(workInProgress) {
  workInProgress.effectTag |= Update;
}

function prepareToHydrateHostInstance(
    workInProgress,
    rootContainerInstance,
    currentHostContext,
) {
    return false
}

let appendAllChildren
let updateHostContainer
let updateHostText

if (supportsMutation) {
    appendAllChildren = function(
        parent,
        workInProgress,
        needsVisibilityToggle,
        isHidden
      ) {
        let node = workInProgress.child
        while (node !== null) {
          if (node.tag === HostComponent || node.tag === HostText) {
            appendInitialChild(parent, node.stateNode)
          } else if (node.tag === HostPortal) {

          } else if (node.child !== null) {
            node.child.return = node
            node = node.child
            continue
          }
          if (node === workInProgress) {
            return
          }
          while (node.sibling === null) {
            if (node.return === null || node.return === workInProgress) {
              return
            }
            node = node.return
          }
          node.sibling.return = node.return
          node = node.sibling
        }
    }   

    updateHostContainer = function(workInProgress) {
        // Noop
    }

    updateHostText = function(
      current,
      workInProgress,
      oldText,
      newText
    ) {
      if (oldText !== newText) {
        markUpdate(workInProgress)
      }
    }
}

function completeWork(
    current,
    workInProgress,
    renderExpirationTime
) {
    const newProps = workInProgress.pendingProps

    switch (workInProgress.tag) {
        case FunctionComponent: 
            break
        case HostRoot: {
            popHostContainer(workInProgress)
            popTopLevelLegacyContextObject(workInProgress)
            const fiberRoot = workInProgress.stateNode
            // if (fiberRoot.pendingContext) {
            //     fiberRoot.context = fiberRoot.pendingContext
            //     fiberRoot.pendingContext = null
            // }
            if (current === null || current.child === null) {
                popHydrationState(workInProgress)
                workInProgress.effectTag &= ~Placement
            }
            updateHostContainer(workInProgress)
            break
        }
        case HostComponent: {
            // popHostContext(workInProgress)
            const rootContainerInstance = getRootHostContainer()
            const type = workInProgress.type
            if (current !== null && workInProgress.stateNode != null) {
            //   updateHostComponent(
            //     current,
            //     workInProgress,
            //     type,
            //     newProps,
            //     rootContainerInstance,
            //   )
      
            // if (current.ref !== workInProgress.ref) {
                //markRef(workInProgress);
            // }
            } else {
              if (!newProps) {
                break
              }
              const currentHostContext = getHostContext()
            //   let wasHydrated = popHydrationState(workInProgress)
            //   if (wasHydrated) {
            //     if (
            //       prepareToHydrateHostInstance(
            //         workInProgress,
            //         rootContainerInstance,
            //         currentHostContext,
            //       )
            //     ) {
            //       // markUpdate(workInProgress);
            //     }
            //   } else {
                let instance = createInstance(
                  type,
                  newProps,
                  rootContainerInstance,
                  currentHostContext,
                  workInProgress,
                )
      
                appendAllChildren(instance, workInProgress, false, false);
                if (
                  finalizeInitialChildren(
                    instance,
                    type,
                    newProps,
                    rootContainerInstance,
                    currentHostContext
                  )
                ) {
                  markUpdate(workInProgress)
                }
                workInProgress.stateNode = instance
            //   }
      
              // if (workInProgress.ref !== null) {
                // markRef(workInProgress)
              // }
            }
            break
        }
        case HostText: {
            let newText = newProps
            if (current && workInProgress.stateNode != null) {
                const oldText = current.memoizedProps
                updateHostText(current, workInProgress, oldText, newText);
            } else {
                if (typeof newText !== 'string') {

                }
                const rootContainerInstance = getRootHostContainer()
                const currentHostContext = getHostContext()
                // let wasHydrated = popHydrationState(workInProgress)
                // if (wasHydrated) {

                // } else {
                    workInProgress.stateNode = createTextInstance(
                        newText,
                        rootContainerInstance,
                        currentHostContext,
                        workInProgress
                    )
                // }
            }
            break
        }
    }
    return null
}

export {completeWork}