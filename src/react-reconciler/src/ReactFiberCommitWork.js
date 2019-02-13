import { HostComponent, HostRoot } from "../../shared/ReactWorkTags";
import { ContentReset } from '../../shared/ReactSideEffectTags'
import {
    appendChildToContainer
} from './ReactFiberHostConfig'

let supportsMutation = true

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