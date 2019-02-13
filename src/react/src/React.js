import {
    createElement 
} from './ReactElement'

import {
    useState
} from './ReactHooks'

import ReactSharedInternals from './ReactSharedInternals'

const React = {
    useState,
    createElement,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
}

export default React