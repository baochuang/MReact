import { pop, createCursor } from './ReactFiberStack'

export const emptyContextObject = {}

let didPerformWorkStackCursor = createCursor(false)
let contextStackCursor = createCursor(emptyContextObject)

function popTopLevelContextObject(fiber) {
    pop(didPerformWorkStackCursor, fiber)
    pop(contextStackCursor, fiber)
} 

export {
    popTopLevelContextObject
}