import { HostComponent, HostRoot } from "../../shared/ReactWorkTags";
import { ContentReset } from '../../shared/ReactSideEffectTags'
import {
    appendChildToContainer
} from './ReactFiberHostConfig'

import { 
    UnmountSnapshot,
    NoEffect as NoHookEffect
} from './ReactHookEffectTags'

let supportsMutation = true

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
        default:
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
                }
            }
        } else if (node.tag === HostPortal){

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
              return;
            }
            node = node.return
        }
        node.sibling.return = node.return
        node = node.sibling
    }
}

export {
    commitBeforeMutationLifeCycles
}