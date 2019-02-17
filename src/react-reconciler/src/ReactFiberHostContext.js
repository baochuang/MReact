import { 
    createCursor,
    pop, 
    push
} from './ReactFiberStack'

import {
    getChildHostContext, 
    getRootHostContext
} from './ReactFiberHostConfig'

const NO_CONTEXT = {}

let rootInstanceStackCursor = createCursor(NO_CONTEXT)
let contextFiberStackCursor = createCursor(NO_CONTEXT)
let contextStackCursor = createCursor(NO_CONTEXT)

function pushHostContainer(fiber, nextRootInstance) {

    push(rootInstanceStackCursor, nextRootInstance, fiber)

    push(contextFiberStackCursor, fiber, fiber)
  
    push(contextStackCursor, NO_CONTEXT, fiber)
    const nextRootContext = getRootHostContext(nextRootInstance)
    pop(contextStackCursor, fiber)
    push(contextStackCursor, nextRootContext, fiber)
}

function pushHostContext(fiber) {
    const rootInstance = rootInstanceStackCursor.current
    const context = contextStackCursor.current
    const nextContext = getChildHostContext(context, fiber.type, rootInstance)
  
    if (context === nextContext) {
      return
    }

    push(contextFiberStackCursor, fiber, fiber)
    push(contextStackCursor, nextContext, fiber)
}

function popHostContainer(fiber) {
    pop(contextStackCursor, fiber)
    pop(contextFiberStackCursor, fiber)
    pop(rootInstanceStackCursor, fiber)
}

function getRootHostContainer() {
    const rootInstance = rootInstanceStackCursor.current
    return rootInstance
}

function getHostContext() {
    const context = contextStackCursor.current
    return context
}

export {
    getRootHostContainer,
    getHostContext,
    pushHostContext,
    pushHostContainer,
    popHostContainer
}