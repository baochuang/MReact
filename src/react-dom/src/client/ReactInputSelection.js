import getActiveElement from './getActiveElement'
import { getOffsets } from './ReactDOMSelection'

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