import {
    traverseTwoPhase
} from '../shared/ReactTreeTraversal'

import accumulateInto from './accumulateInto'

import { getListener } from './EventPluginHub'

import forEachAccumulated from './forEachAccumulated'

function listenerAtPhase(inst, event, propagationPhase) {
    const registrationName =
      event.dispatchConfig.phasedRegistrationNames[propagationPhase]
    return getListener(inst, registrationName)
}

function accumulateDirectionalDispatches(inst, phase, event) {
    const listener = listenerAtPhase(inst, event, phase)
    if (listener) {
      event._dispatchListeners = accumulateInto(
        event._dispatchListeners,
        listener,
      )
      event._dispatchInstances = accumulateInto(event._dispatchInstances, inst)
    }
}

function accumulateTwoPhaseDispatchesSingle(event) {
    if (event && event.dispatchConfig.phasedRegistrationNames) {
      traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event)
    }
}
  
export function accumulateTwoPhaseDispatches(events) {
    forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle)
}