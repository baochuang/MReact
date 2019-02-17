import { pop } from './ReactFiberStack'

export const emptyContextObject = {}

function popTopLevelContextObject(fiber) {
    pop(didPerformWorkStackCursor, fiber)
    pop(contextStackCursor, fiber)
} 

export {
    popTopLevelContextObject
}