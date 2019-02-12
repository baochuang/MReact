import { enableUserTimingAPI } from '../../shared/ReactFeatureFlags'

let isCommitting = false
let currentPhase = null

export function recordScheduleUpdate() {
    if (enableUserTimingAPI) {
      if (isCommitting) {
        // hasScheduledUpdateInCurrentCommit = true
      }
      if (
        currentPhase !== null &&
        currentPhase !== 'componentWillMount' &&
        currentPhase !== 'componentWillReceiveProps'
      ) {
        // hasScheduledUpdateInCurrentPhase = true;
      }
    }
}