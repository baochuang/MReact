import {
    isEnabled as ReactBrowserEventEmitterIsEnabled,
    setEnabled as ReactBrowserEventEmitterSetEnabled,
} from '../events/ReactBrowserEventEmitter'

import { getSelectionInformation, restoreSelection } from './ReactInputSelection'

let eventsEnabled = null
let selectionInformation = null

export const noTimeout = -1

export function resetAfterCommit(containerInfo) {
    restoreSelection(selectionInformation)
    selectionInformation = null
    ReactBrowserEventEmitterSetEnabled(eventsEnabled)
    eventsEnabled = null
}

export function prepareForCommit(containerInfo) {
    eventsEnabled = ReactBrowserEventEmitterIsEnabled()
    selectionInformation = getSelectionInformation()
    ReactBrowserEventEmitterSetEnabled(false)
}

export {
    unstable_now as now
} from '../../../scheduler/src/Scheduler'