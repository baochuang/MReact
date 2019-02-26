import { 
    HostComponent, 
    HostRoot, 
    HostPortal,
    HostText,
    DehydratedSuspenseComponent
} from "../../shared/ReactWorkTags"

import { ContentReset, Placement } from '../../shared/ReactSideEffectTags'
import {
    appendChildToContainer,
    commitTextUpdate,
    commitUpdate
} from './ReactFiberHostConfig'

import { 
    UnmountSnapshot,
    NoEffect as NoHookEffect
} from './ReactHookEffectTags'

let supportsMutation = true

function commitWork(current, finishedWork) {
    if (!supportsMutation) {

    }

    switch (finishedWork.tag) {
        case HostComponent: {
            const instance = finishedWork.stateNode
            if (instance != null) {
                // Commit the work prepared earlier.
                const newProps = finishedWork.memoizedProps
                const oldProps = current !== null ? current.memoizedProps : newProps
                const type = finishedWork.type

                const updatePayload = finishedWork.updateQueue
                finishedWork.updateQueue = null
                if (updatePayload !== null) {
                    commitUpdate(
                        instance,
                        updatePayload,
                        type,
                        oldProps,
                        newProps,
                        finishedWork
                    )
                }
            }
            return
        }
        case HostText: {
            const textInstance = finishedWork.stateNode
            const newText = finishedWork.memoizedProps
            const oldText = current !== null ? current.memoizedProps : newText
            commitTextUpdate(textInstance, oldText, newText)
            return
        }
    }
}

function getHostSibling(fiber) {
    let node = fiber
    siblings: while (true) {
      while (node.sibling === null) {
        if (node.return === null || isHostParent(node.return)) {
          return null
        }
        node = node.return
      }
      node.sibling.return = node.return
      node = node.sibling
      while (
        node.tag !== HostComponent &&
        node.tag !== HostText &&
        node.tag !== DehydratedSuspenseComponent
      ) {
        if (node.effectTag & Placement) {
          continue siblings
        }
        if (node.child === null || node.tag === HostPortal) {
          continue siblings
        } else {
          node.child.return = node
          node = node.child
        }
      }
      if (!(node.effectTag & Placement)) {
        return node.stateNode
      }
    }
}

function isHostParent(fiber) {
    return (
      fiber.tag === HostComponent ||
      fiber.tag === HostRoot ||
      fiber.tag === HostPortal
    )
}

function getHostParentFiber(fiber) {
    let parent = fiber.return
    while (parent !== null) {
      if (isHostParent(parent)) {
        return parent
      }
      parent = parent.return
    }
}

function commitPlacement(finishedWork) {
    if (!supportsMutation) {
        return
    }

    const parentFiber = getHostParentFiber(finishedWork)

    let parent
    let isContainer

    switch (parentFiber.tag) {
        case HostComponent:
            break
        case HostRoot:
            parent = parentFiber.stateNode.containerInfo
            isContainer = true
            break
    }

    if (parentFiber.effectTag & ContentReset) {
        
    }

    const before = getHostSibling(finishedWork)

    let node = finishedWork

    while (true) {
        if (node.tag === HostComponent || node.tag === HostText) {
            if (before) {
            
            } else {
                if (isContainer) {
                    appendChildToContainer(parent, node.stateNode)
                } else {

                }
            }
        } else if (node.tag === HostPortal) {

        } else if (node.child !== null) {
            node.child.return = node
            node = node.child
            continue
        }

        if (node === finishedWork) {
            return
        }

        while (node.sibling === null) {
            if (node.return === null || node.return === finishedWork) {
                return
            }
            node = node.return
        }

        node.sibling.return = node.return
        node = node.sibling
    }
}

function commitHookEffectList(
    unmountTag,
    mountTag,
    finishedWork
) {
    const updateQueue = finishedWork.updateQueue
    let lastEffect = updateQueue !== null ? updateQueue.lastEffect : null
    if (lastEffect !== null) {
        const firstEffect = lastEffect.next
        let effect = firstEffect
        do {
            effect = effect.next
        } while (effect !== firstEffect)
    }
}

function commitBeforeMutationLifeCycles(
    current,
    finishedWork
) {
    switch (finishedWork.tag) {
        case FunctionComponent:
            commitHookEffectList(UnmountSnapshot, NoHookEffect, finishedWork)
            return
        case HostRoot:
        case HostComponent:
        case HostText:
            return 
        default:
            return
    }
}

export {
    commitBeforeMutationLifeCycles,
    commitPlacement,
    commitWork
}