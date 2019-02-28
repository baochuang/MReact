import {
    createElement 
} from './ReactElement'

import ReactCurrentDispatcher from './ReactCurrentDispatcher';
import ReactCurrentOwner from './ReactCurrentOwner'

const ReactSharedInternals = {
    ReactCurrentDispatcher,
    ReactCurrentOwner
}

const React = {
    createElement,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
}

export default React