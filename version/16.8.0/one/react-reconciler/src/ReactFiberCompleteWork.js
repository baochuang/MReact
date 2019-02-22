import { HostText } from '../../shared/ReactWorkTags'

import { getRootHostContainer } from './ReactFiberHostContext'

import { createTextInstance }  from '../../react-dom/src/client/ReactDOMHostConfig'

function completeWork(
    current,
    workInProgress
) {
    const newProps = workInProgress.pendingProps

    switch (workInProgress.tag) {
        case HostText: {
            let newText = newProps
            const rootContainerInstance = getRootHostContainer()
            workInProgress.stateNode = createTextInstance(
                newText,
                rootContainerInstance,
                workInProgress
            )
            break
        }
    }
}

export {
    completeWork
}