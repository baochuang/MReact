function replaceDelimitedText(openingComment, closingComment, stringText) {
    const parentNode = openingComment.parentNode
    const nodeAfterComment = openingComment.nextSibling
    
    if (stringText) {
        setTextContent(nodeAfterComment, stringText)
        removeDelimitedText(parentNode, nodeAfterComment, closingComment)
    }
}