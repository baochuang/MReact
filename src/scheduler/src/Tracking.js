import { enableSchedulerTracing } from '../../shared/ReactFeatureFlags'

let interactionsRef = null
let subscriberRef = null

if (enableSchedulerTracing) {
    interactionsRef = {
      current: new Set()
    }
    subscriberRef = {
      current: null
    }
}

export { interactionsRef as __interactionsRef, subscriberRef as __subscriberRef}