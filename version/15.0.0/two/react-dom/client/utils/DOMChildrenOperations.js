const setTextContent = function(node, text) {
    node.textContent = text;
}

function removeDelimitedText(parentNode, startNode, closingComment) {
    while (true) {
      var node = startNode.nextSibling
      if (node === closingComment) {
        break;
      } else {
        parentNode.removeChild(node)
      }
    }
}

function replaceDelimitedText(openingComment, closingComment, stringText) {
    const parentNode = openingComment.parentNode
    const nodeAfterComment = openingComment.nextSibling
    
    if (stringText) {
        setTextContent(nodeAfterComment, stringText)
        removeDelimitedText(parentNode, nodeAfterComment, closingComment)
    }
}

const DOMChildrenOperations = {
    replaceDelimitedText
}

export default DOMChildrenOperations