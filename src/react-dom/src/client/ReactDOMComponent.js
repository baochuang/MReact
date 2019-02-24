import {
    DOCUMENT_NODE
} from '../shared/HTMLNodeType'

import { Namespaces, getIntrinsicNamespace } from '../shared/DOMNamespaces'

import setTextContent from './setTextContent'

import { registrationNameModules } from '../../../events/EventPluginRegistry'

import { listenTo } from '../events/ReactBrowserEventEmitter'

const {html: HTML_NAMESPACE} = Namespaces

const CHILDREN = 'children'

function ensureListeningTo(rootContainerElement, registrationName) {
    const isDocumentOrFragment = rootContainerElement.nodeType === DOCUMENT_NODE 
    const doc = isDocumentOrFragment
      ? rootContainerElement
      : rootContainerElement.ownerDocument
    listenTo(registrationName, doc)
}

function setInitialDOMProperties(
    tag,
    domElement,
    rootContainerElement,
    nextProps,
    isCustomComponentTag
) {
    for (const propKey in nextProps) {
        const nextProp = nextProps[propKey]

        if (propKey === CHILDREN) {
            if (typeof nextProp === 'string') {
                const canSetTextContent = tag !== 'textarea' || nextProp !== ''
                if (canSetTextContent) {
                    setTextContent(domElement, nextProp)
                }
            } else if (typeof nextProp === 'number') {
                setTextContent(domElement, '' + nextProp)
            }
        } else if (registrationNameModules.hasOwnProperty(propKey)) {
            if (nextProp != null) {
              ensureListeningTo(rootContainerElement, propKey);
            }
        } 
    }
}

export function setInitialProperties(
    domElement,
    tag,
    rawProps,
    rootContainerElement
) {
    let props

    switch (tag) {
        default:
            props = rawProps
    }

    setInitialDOMProperties(
        tag,
        domElement,
        rootContainerElement,
        props,
        false,
    )
}

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