import getActiveElement from './getActiveElement'
import { getOffsets } from './ReactDOMSelection'

function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16)
  } else {
    return false;
  }
}

function isInDocument(node) {
  return (
    node &&
    node.ownerDocument &&
    containsNode(node.ownerDocument.documentElement, node)
  )
}

export function restoreSelection(priorSelectionInformation) {
    const curFocusedElem = getActiveElementDeep()
    const priorFocusedElem = priorSelectionInformation.focusedElem
    const priorSelectionRange = priorSelectionInformation.selectionRange
    if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {

    }
} 

function getActiveElementDeep() {
    let win = window
    let element = getActiveElement()
    while (element instanceof win.HTMLIFrameElement) {
      try {
        win = element.contentDocument.defaultView
      } catch (e) {
        return element
      }
      element = getActiveElement(win.document)
    }
    return element
}

export function getSelectionInformation() {
    const focusedElem = getActiveElementDeep()
    return {
      focusedElem: focusedElem,
      selectionRange: hasSelectionCapabilities(focusedElem)
        ? getSelection(focusedElem)
        : null
    }
}

export function hasSelectionCapabilities(elem) {
    const nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase()
    return (
      nodeName &&
      ((nodeName === 'input' &&
        (elem.type === 'text' ||
          elem.type === 'search' ||
          elem.type === 'tel' ||
          elem.type === 'url' ||
          elem.type === 'password')) ||
        nodeName === 'textarea' ||
        elem.contentEditable === 'true')
    )
}

export function getSelection(input) {
    let selection
  
    if ('selectionStart' in input) {
      selection = {
        start: input.selectionStart,
        end: input.selectionEnd
      };
    } else {
      selection = getOffsets(input);
    }
  
    return selection || {start: 0, end: 0};
}