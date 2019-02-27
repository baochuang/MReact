import { 
    createCursor,
    push
} from './ReactFiberStack'

const NO_CONTEXT = {}

let rootInstanceStackCursor = createCursor(NO_CONTEXT)

function getHostContext() {
    const context = contextStackCursor.current
    return context
}

function getRootHostContainer() {
    const rootInstance = rootInstanceStackCursor.current
    return rootInstance
}

function pushHostContainer(fiber, nextRootInstance) {
    push(rootInstanceStackCursor, nextRootInstance)
}

export {
    getHostContext,
    getRootHostContainer,
    pushHostContainer
}