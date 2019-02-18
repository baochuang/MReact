import {
    DOCUMENT_NODE
} from '../shared/HTMLNodeType'

import { Namespaces, getIntrinsicNamespace } from '../shared/DOMNamespaces'


const {html: HTML_NAMESPACE} = Namespaces

function getOwnerDocumentFromRootContainer(
    rootContainerElement
) {
    return rootContainerElement.nodeType === DOCUMENT_NODE
      ? rootContainerElement
      : rootContainerElement.ownerDocument
}

export function createTextNode(
    text,
    rootContainerElement
) {
    return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text)
}

export function createElement(
    type,
    props,
    rootContainerElement,
    parentNamespace
) {
    let isCustomComponentTag

    const ownerDocument = getOwnerDocumentFromRootContainer(
        rootContainerElement
    )
    let domElement
    let namespaceURI = parentNamespace
    if (namespaceURI === HTML_NAMESPACE) {
        namespaceURI = getIntrinsicNamespace(type)
    }
    if (namespaceURI === HTML_NAMESPACE) {
        if (type === 'script') {
        
        } else if (typeof props.is === 'string') {
        
        } else {
            domElement = ownerDocument.createElement(type)

            if (type === 'select' && props.multiple) {

            }
        }
    } else {
        // domElement = ownerDocument.createElementNS(namespaceURI, type)
    }

    return domElement
}