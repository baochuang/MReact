import {
    setEnabled,
    isEnabled,
    trapBubbledEvent
} from './ReactDOMEventListener'

import { registrationNameDependencies } from '../../../events/EventPluginRegistry'

const alreadyListeningTo = {}
let reactTopListenersCounter = 0

const topListenersIDKey = '_reactListenersID' + ('' + Math.random()).slice(2)


function getListeningForDocument(mountAt) {
    // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
    // directly.
    if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
      mountAt[topListenersIDKey] = reactTopListenersCounter++
      alreadyListeningTo[mountAt[topListenersIDKey]] = {}
    }
    return alreadyListeningTo[mountAt[topListenersIDKey]]
}

export {
    setEnabled,
    isEnabled
}

export function listenTo(
    registrationName,
    mountAt
) {
    const isListening = getListeningForDocument(mountAt)

    const dependencies = registrationNameDependencies[registrationName]

    for (let i = 0; i < dependencies.length; i++) {
        const dependency = dependencies[i]

        if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
            switch(dependency) {
                default: 
                    trapBubbledEvent(dependency, mountAt)
                    break
            }
            isListening[dependency] = true
        }
    }
}