import { createTextNode } from './ReactDOMComponent'
import { precacheFiberNode } from './ReactDOMComponentTree'

export function createTextInstance(
    text,
    rootContainerInstance,
    internalInstanceHandle
)   {
    const textNode = createTextNode(text, rootContainerInstance)
    precacheFiberNode(internalInstanceHandle, textNode)
    return textNode
}