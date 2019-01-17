function DOMLazyTree(node) {
    return {
      node: node,
      children: [],
      html: null,
      text: null,
    }
}

export default DOMLazyTree