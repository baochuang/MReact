import {
    isEnabled as ReactBrowserEventEmitterIsEnabled,
    setEnabled as ReactBrowserEventEmitterSetEnabled,
} from '../events/ReactBrowserEventEmitter'
let eventsEnabled = null
let selectionInformation = null

export const noTimeout = -1

export function prepareForCommit(containerInfo) {
    eventsEnabled = ReactBrowserEventEmitterIsEnabled()
    selectionInformation = getSelectionInformation()
    ReactBrowserEventEmitterSetEnabled(false)
}

export {
    unstable_now as now
} from '../../../scheduler/src/Scheduler'