import { 
    unsafeCastStringToDOMTopLevelType,
    unsafeCastDOMTopLevelTypeToString
} from '../../../events/TopLevelEventTypes'

export const TOP_CLICK = unsafeCastStringToDOMTopLevelType('click')

export function getRawEventName(topLevelType) {
    return unsafeCastDOMTopLevelTypeToString(topLevelType)
}