import {
    DOCUMENT_NODE
} from '../shared/HTMLNodeType'

import { Namespaces, getIntrinsicNamespace } from '../shared/DOMNamespaces'

import setTextContent from './setTextContent'

import { registrationNameModules } from '../../../events/EventPluginRegistry'

import { listenTo } from '../events/ReactBrowserEventEmitter'

import isCustomComponent from '../shared/isCustomComponent'

const {html: HTML_NAMESPACE} = Namespaces

const CHILDREN = 'children'

function updateDOMProperties(
    domElement,
    updatePayload,
    wasCustomComponentTag,
    isCustomComponentTag
) {
    // TODO: Handle wasCustomComponentTag
    for (let i = 0; i < updatePayload.length; i += 2) {
    //   const propKey = updatePayload[i];
    //   const propValue = updatePayload[i + 1];
    //   if (propKey === STYLE) {
    //     setValueForStyles(domElement, propValue);
    //   } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
    //     setInnerHTML(domElement, propValue);
    //   } else if (propKey === CHILDREN) {
    //     setTextContent(domElement, propValue);
    //   } else {
    //     setValueForProperty(domElement, propKey, propValue, isCustomComponentTag);
    //   }
    }
}

// Apply the diff
export function updateProperties(
    domElement,
    updatePayload,
    tag,
    lastRawProps,
    nextRawProps
) {
    if (
        tag === 'input' &&
        nextRawProps.type === 'radio' &&
        nextRawProps.name != null
    ) {

    }

    const wasCustomComponentTag = isCustomComponent(tag, lastRawProps)
    const isCustomComponentTag = isCustomComponent(tag, nextRawProps)

    // Apply the diff.
    updateDOMProperties(
        domElement,
        updatePayload,
        wasCustomComponentTag,
        isCustomComponentTag
    )

    // TODO: Ensure that an update gets scheduled if any of the special props
    // changed.
    switch (tag) {
        case 'input':
            break
        case 'textarea':
            break
        case 'select':
            break
    }
}

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
              ensureListeningTo(rootContainerElement, propKey)
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
        false
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