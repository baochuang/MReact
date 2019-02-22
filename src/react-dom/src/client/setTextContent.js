import { TEXT_NODE } from '../shared/HTMLNodeType'

const setTextContent = function(node, text) {
    if (text) {
      let firstChild = node.firstChild
  
      if (
        firstChild &&
        firstChild === node.lastChild &&
        firstChild.nodeType === TEXT_NODE
      ) {
        firstChild.nodeValue = text
        return
      }
    }
    node.textContent = text
}
  
export default setTextContent