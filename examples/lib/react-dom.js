/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./version-one/react-dom/client/ReactDOM.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./version-one/constants/index.js":
/*!****************************************!*\
  !*** ./version-one/constants/index.js ***!
  \****************************************/
/*! exports provided: enableLazy, emptyObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableLazy", function() { return enableLazy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyObject", function() { return emptyObject; });
const enableLazy = !!(
    typeof document !== undefined &&
    typeof document.documentMode === 'number' ||
    typeof navigator !== 'undefined' &&
    typeof navigator.userAgent === 'string' &&
    /\bEdge\/\d/.test(navigator.userAgent)
)

const emptyObject = {}

/***/ }),

/***/ "./version-one/constants/nodeTypes.js":
/*!********************************************!*\
  !*** ./version-one/constants/nodeTypes.js ***!
  \********************************************/
/*! exports provided: ELEMENT_NODE_TYPE, ATTR_NODE_TYPE, TEXT_NODE_TYPE, CDATASECTION_NODE_TYPE, ENTITYREFERENCE_NODE_TYPE, ENTITY_NODE_TYPE, PROCESSINGINSTRUCTION_NODE_TYPE, COMMENT_NODE_TYPE, DOC_NODE_TYPE, DOCUMENTFRAGMENT_NODE_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ELEMENT_NODE_TYPE", function() { return ELEMENT_NODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTR_NODE_TYPE", function() { return ATTR_NODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT_NODE_TYPE", function() { return TEXT_NODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CDATASECTION_NODE_TYPE", function() { return CDATASECTION_NODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENTITYREFERENCE_NODE_TYPE", function() { return ENTITYREFERENCE_NODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENTITY_NODE_TYPE", function() { return ENTITY_NODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROCESSINGINSTRUCTION_NODE_TYPE", function() { return PROCESSINGINSTRUCTION_NODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENT_NODE_TYPE", function() { return COMMENT_NODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOC_NODE_TYPE", function() { return DOC_NODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTFRAGMENT_NODE_TYPE", function() { return DOCUMENTFRAGMENT_NODE_TYPE; });
const ELEMENT_NODE_TYPE = 1 // 元素
const ATTR_NODE_TYPE = 2 // 属性
const TEXT_NODE_TYPE = 3 // 元素或属性中的文本内容
const CDATASECTION_NODE_TYPE = 4 // 不会被解释的部分
const ENTITYREFERENCE_NODE_TYPE = 5 // 实体引用
const ENTITY_NODE_TYPE = 6 // 实体
const PROCESSINGINSTRUCTION_NODE_TYPE = 7 // 代表处理指令
const COMMENT_NODE_TYPE = 8  // 注释
const DOC_NODE_TYPE = 9 // 代表整个文档
const DOCUMENTFRAGMENT_NODE_TYPE = 11 // 轻量级的文档处理对象

/***/ }),

/***/ "./version-one/react-dom/DOMNamespaces.js":
/*!************************************************!*\
  !*** ./version-one/react-dom/DOMNamespaces.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const DOMNamespaces = {
    html: 'http://www.w3.org/1999/xhtml',
    mathml: 'http://www.w3.org/1998/Math/MathML',
    svg: 'http://www.w3.org/2000/svg',
}

/* harmony default export */ __webpack_exports__["default"] = (DOMNamespaces);

/***/ }),

/***/ "./version-one/react-dom/DOMProperty.js":
/*!**********************************************!*\
  !*** ./version-one/react-dom/DOMProperty.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const DOMProperty = {
    ROOT_ATTRIBUTE_NAME: 'data-reactroot'
}

/* harmony default export */ __webpack_exports__["default"] = (DOMProperty);

/***/ }),

/***/ "./version-one/react-dom/DOMPropertyOperations.js":
/*!********************************************************!*\
  !*** ./version-one/react-dom/DOMPropertyOperations.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DOMProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMProperty */ "./version-one/react-dom/DOMProperty.js");


const DOMPropertyOperations = {
    setAttributeForRoot: function(node) {
        node.setAttribute(_DOMProperty__WEBPACK_IMPORTED_MODULE_0__["default"].ROOT_ATTRIBUTE_NAME, '')
    }
}

/* harmony default export */ __webpack_exports__["default"] = (DOMPropertyOperations);

/***/ }),

/***/ "./version-one/react-dom/ReactDOMComponent.js":
/*!****************************************************!*\
  !*** ./version-one/react-dom/ReactDOMComponent.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_reconciler_ReactMultiChild__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../react-reconciler/ReactMultiChild */ "./version-one/react-reconciler/ReactMultiChild.js");
/* harmony import */ var _DOMNamespaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMNamespaces */ "./version-one/react-dom/DOMNamespaces.js");
/* harmony import */ var _DOMPropertyOperations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOMPropertyOperations */ "./version-one/react-dom/DOMPropertyOperations.js");
/* harmony import */ var _client_utils_DOMLazyTree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./client/utils/DOMLazyTree */ "./version-one/react-dom/client/utils/DOMLazyTree.js");
/* harmony import */ var _client_ReactDOMComponentTree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./client/ReactDOMComponentTree */ "./version-one/react-dom/client/ReactDOMComponentTree.js");







const CONTENT_TYPES = {'string': true, 'number': true}

class ReactDOMComponent {
    constructor(element) {
        const tag = element.type
        // for diff
        this._domID = null

        this._currentElement = element
        this._tag = tag.toLowerCase()
        this._namespaceURI = null
    }

    mountComponent(
        transaction = { useCreateElement: true},
        nativeParent,
        nativeContainerInfo,
        context
    ) {
        this._domID = nativeContainerInfo._idCounter++
        this._nativeParent = nativeParent
        this._nativeContainerInfo = nativeContainerInfo

        const props = this._currentElement.props

        // namespace 还没去研究干啥的
        let namespaceURI
        let parentTag

        if (nativeParent) {
            namespaceURI = nativeParent._namespaceURI
            parentTag = nativeParent._tag
        } else if (nativeContainerInfo._tag) {
            namespaceURI = nativeContainerInfo._namespaceURI
            parentTag = nativeContainerInfo._tag
        }

        if (namespaceURI == null ||
            namespaceURI === _DOMNamespaces__WEBPACK_IMPORTED_MODULE_1__["default"].svg && parentTag === 'foreignobject') {
                namespaceURI = _DOMNamespaces__WEBPACK_IMPORTED_MODULE_1__["default"].html
        }

        if (namespaceURI === _DOMNamespaces__WEBPACK_IMPORTED_MODULE_1__["default"].html) {
            if (this._tag === 'svg') {
              namespaceURI = _DOMNamespaces__WEBPACK_IMPORTED_MODULE_1__["default"].svg;
            } else if (this._tag === 'math') {
              namespaceURI = _DOMNamespaces__WEBPACK_IMPORTED_MODULE_1__["default"].mathml;
            }
        }

        this._namespaceURI = namespaceURI

        let mountImage

        // 创建
        if (transaction && transaction.useCreateElement || true) {
            const ownerDocument = nativeContainerInfo._ownerDocument
            let el 

            if (namespaceURI === _DOMNamespaces__WEBPACK_IMPORTED_MODULE_1__["default"].html) {
                if (this._tag === 'script') {
                
                } else {
                    el = ownerDocument.createElement(this._currentElement.type)
                } 
            } else {
                el = ownerDocument.createElementNS(
                    namespaceURI,
                    this._currentElement.type
                )
            }

            if (!this._nativeParent) {
                _DOMPropertyOperations__WEBPACK_IMPORTED_MODULE_2__["default"].setAttributeForRoot(el);
            }

            this._updateDOMProperties(null, props, transaction)

            const lazyTree = Object(_client_utils_DOMLazyTree__WEBPACK_IMPORTED_MODULE_3__["default"])(el)

            this._createInitialChildren(transaction, props, context, lazyTree)

            mountImage = lazyTree
        } else { // 更新

        }

        return mountImage
    }

    _updateDOMProperties(lastProps, nextProps, transaction) {
        //
    }

    _createInitialChildren(transaction, props, context, lazyTree) {
        const innerHTML = props.dangerouslySetInnerHTML

        if (innerHTML) {

        } else {
            const contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null
            const childrenToUse = contentToUse != null ? null : props.children

            if (contentToUse != null) {
                // 将文本绑定到节点上去
                _client_utils_DOMLazyTree__WEBPACK_IMPORTED_MODULE_3__["default"].queueText(lazyTree, contentToUse);
              } else if (childrenToUse != null) {
                // 还不知道干啥
                const mountImages = this.mountChildren(
                  childrenToUse,
                  transaction,
                  context
                )
                for (var i = 0; i < mountImages.length; i++) {
                  _client_utils_DOMLazyTree__WEBPACK_IMPORTED_MODULE_3__["default"].queueChild(lazyTree, mountImages[i]);
                }
              }
        }
    }

    getPublicInstance() {
        return Object(_client_ReactDOMComponentTree__WEBPACK_IMPORTED_MODULE_4__["getNodeFromInstance"])(this)
    }
}

ReactDOMComponent.displayName = 'ReactDOMComponent'

Object.assign(
    ReactDOMComponent.prototype,
    _react_reconciler_ReactMultiChild__WEBPACK_IMPORTED_MODULE_0__["default"]
)

/* harmony default export */ __webpack_exports__["default"] = (ReactDOMComponent);

/***/ }),

/***/ "./version-one/react-dom/ReactDOMContainerInfo.js":
/*!********************************************************!*\
  !*** ./version-one/react-dom/ReactDOMContainerInfo.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_nodeTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/nodeTypes */ "./version-one/constants/nodeTypes.js");


function ReactDOMContainerInfo(topLevelWrapper, node) {
    const info = {
        _topLevelWrapper: topLevelWrapper,
        _ownerDocument: node ?
            node.nodeType === _constants_nodeTypes__WEBPACK_IMPORTED_MODULE_0__["DOC_NODE_TYPE"] ?   
                node : node.ownerDocument :
                    null
    }
    return info
}

/* harmony default export */ __webpack_exports__["default"] = (ReactDOMContainerInfo);

/***/ }),

/***/ "./version-one/react-dom/ReactDOMEmptyComponent.js":
/*!*********************************************************!*\
  !*** ./version-one/react-dom/ReactDOMEmptyComponent.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReactDOMEmptyComponent; });
class ReactDOMEmptyComponent {
    constructor(instantiate) {
        // ReactCompositeComponent uses this:
        this._currentElement = null
        // ReactDOMComponentTree uses these:
        this._nativeNode = null
        this._nativeParent = null
        this._nativeContainerInfo = null
        this._domID = null
    }

    mountComponent(
        transaction,
        nativeParent,
        nativeContainerInfo,
        context
    ) {

    }

    receiveComponent() {
        
    }
}

/***/ }),

/***/ "./version-one/react-dom/ReactDOMTextComponent.js":
/*!********************************************************!*\
  !*** ./version-one/react-dom/ReactDOMTextComponent.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


class ReactDOMTextComponent {
    constructor(text) {
        this._currentElement = text

        this._nativeNode = null
        this._nativeParent = null

        this._domID = null
    }

    mountComponent(
        transaction,
        nativeParent,
        nativeContainerInfo,
        context
    ) {

    }

    receiveComponent(nextText, transaction) {
    
    }
}

/***/ }),

/***/ "./version-one/react-dom/TopLevelWrapper.js":
/*!**************************************************!*\
  !*** ./version-one/react-dom/TopLevelWrapper.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let topLevelRootCounter = 1

const TopLevelWrapper = function() {
    this.rootID = topLevelRootCounter++
}

TopLevelWrapper.prototype.isReactComponent = {}

TopLevelWrapper.prototype.render = function() {
    console.log(this)
    return this.props
}

/* harmony default export */ __webpack_exports__["default"] = (TopLevelWrapper);

/***/ }),

/***/ "./version-one/react-dom/client/ReactDOM.js":
/*!**************************************************!*\
  !*** ./version-one/react-dom/client/ReactDOM.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReactMount__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactMount */ "./version-one/react-dom/client/ReactMount.js");


const ReactDOM = {
    render: _ReactMount__WEBPACK_IMPORTED_MODULE_0__["render"]
}

window.ReactDOM = ReactDOM

/***/ }),

/***/ "./version-one/react-dom/client/ReactDOMComponentTree.js":
/*!***************************************************************!*\
  !*** ./version-one/react-dom/client/ReactDOMComponentTree.js ***!
  \***************************************************************/
/*! exports provided: getNodeFromInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodeFromInstance", function() { return getNodeFromInstance; });

const getNodeFromInstance = (inst) => {
    if (inst._nativeNode) {
        return inst._nativeNode
    }

    let parents = []

    while (!inst._nativeNode) {
        parents.push(inst)

        inst = inst._nativeParent
    }

    return inst._nativeNode
}

/***/ }),

/***/ "./version-one/react-dom/client/ReactMount.js":
/*!****************************************************!*\
  !*** ./version-one/react-dom/client/ReactMount.js ***!
  \****************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _react_ReactElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../react/ReactElement */ "./version-one/react/ReactElement.js");
/* harmony import */ var _TopLevelWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TopLevelWrapper */ "./version-one/react-dom/TopLevelWrapper.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants */ "./version-one/constants/index.js");
/* harmony import */ var _react_reconciler_instantiateReactComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../react-reconciler/instantiateReactComponent */ "./version-one/react-reconciler/instantiateReactComponent.js");
/* harmony import */ var _react_reconciler_ReactReconciler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../react-reconciler/ReactReconciler */ "./version-one/react-reconciler/ReactReconciler.js");
/* harmony import */ var _ReactDOMContainerInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ReactDOMContainerInfo */ "./version-one/react-dom/ReactDOMContainerInfo.js");
/* harmony import */ var _utils_DOMLazyTree__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/DOMLazyTree */ "./version-one/react-dom/client/utils/DOMLazyTree.js");








const render = function(nextElement, container, callback) {
    return renderSubtreeIntoContainer(
        null,
        nextElement,
        container,
        callback,
    )
}

const renderSubtreeIntoContainer = function(parentComponent, nextElement, container, callback) {

    const nextWrappedElement = Object(_react_ReactElement__WEBPACK_IMPORTED_MODULE_0__["default"])(
        _TopLevelWrapper__WEBPACK_IMPORTED_MODULE_1__["default"],
        null,
        null,
        null,
        nextElement
    )

    const component = renderNewRootComponent(
        nextWrappedElement,
        container,
        parentComponent ? parentComponent._reactInternalInstance._processChildContext(
            parentComponent._reactInternalInstance._context
        ) : _constants__WEBPACK_IMPORTED_MODULE_2__["emptyObject"] 
    )._renderedComponent.getPublicInstance()

    if (callback) {

    }

    return component
}

const renderNewRootComponent = function(nextElement, container, context) {
    const componentInstance = Object(_react_reconciler_instantiateReactComponent__WEBPACK_IMPORTED_MODULE_3__["default"])(nextElement)

    mountComponentIntoNode(componentInstance, container, context)

    return componentInstance
}

const mountComponentIntoNode = function(
    wrapperInstance,
    container,
    context
) {
    const markup = _react_reconciler_ReactReconciler__WEBPACK_IMPORTED_MODULE_4__["default"].mountComponent(
        wrapperInstance,
        { useCreateElement: true},
        null,
        Object(_ReactDOMContainerInfo__WEBPACK_IMPORTED_MODULE_5__["default"])(wrapperInstance, container),
        context
    )

    wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance

    mountImageIntoNode(
        markup,
        container,
        wrapperInstance
    )
}

const mountImageIntoNode = function(
    markup,
    container,
    wrapperInstance,
    transaction = { useCreateElement : true}
){
    if (transaction.useCreateElement) {
        while (container.lastChild) {
            container.removeChild(container.lastChild)
        }
        _utils_DOMLazyTree__WEBPACK_IMPORTED_MODULE_6__["default"].insertTreeBefore(container, markup, null)
    } else {
        setInnerHTML(container, markup)
    }
}

/***/ }),

/***/ "./version-one/react-dom/client/utils/DOMLazyTree.js":
/*!***********************************************************!*\
  !*** ./version-one/react-dom/client/utils/DOMLazyTree.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ "./version-one/constants/index.js");
/* harmony import */ var _constants_nodeTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants/nodeTypes */ "./version-one/constants/nodeTypes.js");
/* harmony import */ var _setTextContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setTextContent */ "./version-one/react-dom/client/utils/setTextContent.js");




function DOMLazyTree(node) {
    return {
      node: node,
      children: [],
      html: null,
      text: null,
    }
}

DOMLazyTree.queueText = function(tree, text) {
  if (_constants__WEBPACK_IMPORTED_MODULE_0__["enableLazy"]) {
    tree.text = text;
  } else {
    Object(_setTextContent__WEBPACK_IMPORTED_MODULE_2__["default"])(tree.node, text);
  }
}

DOMLazyTree.insertTreeBefore = function(parentNode, tree, referenceNode) {
  if (tree.node.nodeType === _constants_nodeTypes__WEBPACK_IMPORTED_MODULE_1__["DOCUMENTFRAGMENT_NODE_TYPE"]) {
      insertTreeChildren(tree)
      parentNode.insertBefore(tree.node, referenceNode)
  } else {
      parentNode.insertBefore(tree.node, referenceNode)
      insertTreeChildren(tree)
  }
}

function insertTreeChildren(tree) {
  if (!_constants__WEBPACK_IMPORTED_MODULE_0__["enableLazy"]) {
      return 
  }
  const node = tree.node
  const children = tree.children
  if (children.length) {
      for (var i = 0; i < children.length; i++) {
        DOMLazyTree.insertTreeBefore(node, children[i], null);
      }
  } else if (tree.html !== null) {
      node.innerHTML = tree.html
  } else if (tree.text !== null) {
      Object(_setTextContent__WEBPACK_IMPORTED_MODULE_2__["default"])(node, tree.text)
  }
}

DOMLazyTree.queueChild = function(parentTree, childTree) {
  if (_constants__WEBPACK_IMPORTED_MODULE_0__["enableLazy"]) {
    parentTree.children.push(childTree);
  } else {
    parentTree.node.appendChild(childTree.node);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (DOMLazyTree);

/***/ }),

/***/ "./version-one/react-dom/client/utils/setTextContent.js":
/*!**************************************************************!*\
  !*** ./version-one/react-dom/client/utils/setTextContent.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const setTextContent = function(node, text) {
    node.textContent = text
}

/* harmony default export */ __webpack_exports__["default"] = (setTextContent);

/***/ }),

/***/ "./version-one/react-reconciler/ReactChildReconciler.js":
/*!**************************************************************!*\
  !*** ./version-one/react-reconciler/ReactChildReconciler.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_traverseAllChildren__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/traverseAllChildren */ "./version-one/utils/traverseAllChildren.js");
/* harmony import */ var _instantiateReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instantiateReactComponent */ "./version-one/react-reconciler/instantiateReactComponent.js");



function instantiateChild(childInstances, child, name) {
    // We found a component instance.
    var keyUnique = (childInstances[name] === undefined);
    if (child != null && keyUnique) {
      childInstances[name] = Object(_instantiateReactComponent__WEBPACK_IMPORTED_MODULE_1__["default"])(child);
    }
}

const ReactChildReconciler = {
    instantiateChildren: function(nestedChildNodes, transaction, context) {
        if (nestedChildNodes == null) {
          return null
        }
        var childInstances = {}
        Object(_utils_traverseAllChildren__WEBPACK_IMPORTED_MODULE_0__["default"])(nestedChildNodes, instantiateChild, childInstances)
        return childInstances
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ReactChildReconciler);

/***/ }),

/***/ "./version-one/react-reconciler/ReactCompositeComponent.js":
/*!*****************************************************************!*\
  !*** ./version-one/react-reconciler/ReactCompositeComponent.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReactCompositeComponent; });
/* harmony import */ var _StatelessComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StatelessComponent */ "./version-one/react-reconciler/StatelessComponent.js");
/* harmony import */ var _ReactInstanceMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactInstanceMap */ "./version-one/react-reconciler/ReactInstanceMap.js");
/* harmony import */ var _ReactReconciler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactReconciler */ "./version-one/react-reconciler/ReactReconciler.js");




class ReactCompositeComponent {
    constructor(element) {
        this._currentElement = element
        // for diff
        this._rootNodeID = null
        this._instance = null
        // for update
        this._renderedComponent = null
        this._context = null
        // for dom tree
        this._nativeParent = null;
        this._nativeContainerInfo = null
    }

    _processProps(newProps) {
        return newProps
    }

    _processContext(context) {
        return this._maskContext(context)
    }
    /**
     * 绑定上下文
     * @param {上下文} context 
     */
    _maskContext(context) {
        const Component = this._currentElement.type
        const contextTypes = Component.contextTypes
        if (contextTypes) {
            const maskedContext = {}

            for (let contextName in contextTypes) {
                maskedContext[contextName] = context[contextName]
            }

            return maskedContext
        }
        return {}
    }
    /**
     * 绑定组件
     * @param {*} transaction 
     * @param {*} nativeParent 
     * @param {*} nativeContainerInfo 
     * @param {*} context 
     */
    mountComponent(
        transaction,
        nativeParent,
        nativeContainerInfo,
        context
    ) {
        this.context = context
        this._nativeParent = nativeParent
        this._nativeContainerInfo = nativeContainerInfo

        const publicProps = this._processProps(this._currentElement.props) //
        const publicContext = this._processContext(context) //

        const Component = this._currentElement.type

        let inst
        // 存储render返回的数据
        let renderedElement

        // 判断是否为继承React.Component类的组件
        if (Component.prototype && Component.prototype.isReactComponent) {
            inst = new Component(publicProps, publicContext, null)
        } else {
            // 默认为function组件
            inst = Component(publicProps, publicContext, null)

            if (inst === null || inst.render == null) {
                renderedElement = inst
                // 无状态组件
                inst = new _StatelessComponent__WEBPACK_IMPORTED_MODULE_0__["default"](Component) 
            }

        }

        inst.props = publicProps
        inst.context = context
        inst.refs = {}

        this._instance = inst

        // 存储实例
        _ReactInstanceMap__WEBPACK_IMPORTED_MODULE_1__["default"].set(inst, this)

        // State部分

        // markup

        let markup 
        
        // 执行render
        markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction, context)

        // 钩子函数
        if (inst.componentDidMount) {
            
        }

        return markup
    } 

    performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction, context) {
        const inst = this._instance
        
        if (inst.componentWillMount) {

        }

        if (renderedElement === undefined) {
            renderedElement = this._renderValidatedComponent()
        }

        this._renderedComponent = this._instantiateReactComponent(
            renderedElement
        )

        const markup = _ReactReconciler__WEBPACK_IMPORTED_MODULE_2__["default"].mountComponent(
            this._renderedComponent,
            transaction,
            nativeParent,
            nativeContainerInfo,
            this._processChildContext(context)
        )

        return markup
    }

    _renderValidatedComponent() {
        return this._renderValidatedComponentWithoutOwnerOrContext()
    }

    _renderValidatedComponentWithoutOwnerOrContext() {
        const inst = this._instance;
        const renderedComponent = inst.render()
        return renderedComponent
    }
    /**
     * 后面讲解
     * @param {*} context 
     */
    _processChildContext(currentContext) {
        const Component = this._currentElement.type
        const inst = this._instance
        const childContext = inst.getChildContext && inst.getChildContext()

        if (childContext) {
            return Object.assign({}, currentContext, childContext)
        }

        return currentContext
    }

    getPublicInstance() {
        var inst = this._instance
        if (inst instanceof _StatelessComponent__WEBPACK_IMPORTED_MODULE_0__["default"]) {
          return null
        }
        return inst
    }
}

/***/ }),

/***/ "./version-one/react-reconciler/ReactEmptyComponent.js":
/*!*************************************************************!*\
  !*** ./version-one/react-reconciler/ReactEmptyComponent.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_dom_ReactDOMEmptyComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../react-dom/ReactDOMEmptyComponent */ "./version-one/react-dom/ReactDOMEmptyComponent.js");


const ReactEmptyComponent = {
    create: function(instantiate) {
        return new _react_dom_ReactDOMEmptyComponent__WEBPACK_IMPORTED_MODULE_0__["default"](instantiate)
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ReactEmptyComponent);

/***/ }),

/***/ "./version-one/react-reconciler/ReactInstanceMap.js":
/*!**********************************************************!*\
  !*** ./version-one/react-reconciler/ReactInstanceMap.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const ReactInstanceMap = {
    get: function(key) {
        return key._reactInternalInstance
    },
    set: function(key, value) {
        key._reactInternalInstance = value;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ReactInstanceMap);

/***/ }),

/***/ "./version-one/react-reconciler/ReactMultiChild.js":
/*!*********************************************************!*\
  !*** ./version-one/react-reconciler/ReactMultiChild.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReactReconciler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactReconciler */ "./version-one/react-reconciler/ReactReconciler.js");
/* harmony import */ var _ReactChildReconciler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactChildReconciler */ "./version-one/react-reconciler/ReactChildReconciler.js");



const ReactMultiChild = {
    mountChildren: function(nestedChildren, transaction, context) {
        const children = this._reconcilerInstantiateChildren(
            nestedChildren, transaction, context
        )
        this._renderedChildren = children
        let mountImages = [];
        let index = 0;
        for (let name in children) {
          if (children.hasOwnProperty(name)) {
            var child = children[name]
            var mountImage = _ReactReconciler__WEBPACK_IMPORTED_MODULE_0__["default"].mountComponent(
              child,
              transaction,
              this,
              this._nativeContainerInfo,
              context
            );
            child._mountIndex = index++;
            mountImages.push(mountImage);
          }
        }
        return mountImages
    },
    _reconcilerInstantiateChildren: function(nestedChildren, transaction, context) {
        return _ReactChildReconciler__WEBPACK_IMPORTED_MODULE_1__["default"].instantiateChildren(
            nestedChildren, transaction, context
        )
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ReactMultiChild);

/***/ }),

/***/ "./version-one/react-reconciler/ReactNativeComponent.js":
/*!**************************************************************!*\
  !*** ./version-one/react-reconciler/ReactNativeComponent.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_dom_ReactDOMComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../react-dom/ReactDOMComponent */ "./version-one/react-dom/ReactDOMComponent.js");
/* harmony import */ var _react_dom_ReactDOMTextComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../react-dom/ReactDOMTextComponent */ "./version-one/react-dom/ReactDOMTextComponent.js");
/* harmony import */ var _react_dom_ReactDOMTextComponent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_react_dom_ReactDOMTextComponent__WEBPACK_IMPORTED_MODULE_1__);



function createInternalComponent(element) {
    return new _react_dom_ReactDOMComponent__WEBPACK_IMPORTED_MODULE_0__["default"](element)
}

function createInstanceForText(node) {
    return new _react_dom_ReactDOMTextComponent__WEBPACK_IMPORTED_MODULE_1___default.a(text)
}

const ReactNativeComponent = {
    createInternalComponent,
    createInstanceForText
}

/* harmony default export */ __webpack_exports__["default"] = (ReactNativeComponent);

/***/ }),

/***/ "./version-one/react-reconciler/ReactReconciler.js":
/*!*********************************************************!*\
  !*** ./version-one/react-reconciler/ReactReconciler.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const ReactReconciler = {
    mountComponent: function (
        internalInstance,
        transaction = { useCreateElement: true },
        nativeParent,
        nativeContainerInfo,
        context
    ) {
        const markup = internalInstance.mountComponent(
            transaction,
            nativeParent,
            nativeContainerInfo,
            context
        ) 
        if ( internalInstance._currentElement &&
            internalInstance._currentElement.ref !== null) {

        }
        return markup
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ReactReconciler);

/***/ }),

/***/ "./version-one/react-reconciler/StatelessComponent.js":
/*!************************************************************!*\
  !*** ./version-one/react-reconciler/StatelessComponent.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StatelessComponent; });
/* harmony import */ var _ReactInstanceMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactInstanceMap */ "./version-one/react-reconciler/ReactInstanceMap.js");


class StatelessComponent {
    constructor(Component) {

    }

    render() {
        var Component = _ReactInstanceMap__WEBPACK_IMPORTED_MODULE_0__["default"].get(this)._currentElement.type
        var element = Component(this.props, this.context, this.updater)
        return element
    }
}

/***/ }),

/***/ "./version-one/react-reconciler/instantiateReactComponent.js":
/*!*******************************************************************!*\
  !*** ./version-one/react-reconciler/instantiateReactComponent.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReactEmptyComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactEmptyComponent */ "./version-one/react-reconciler/ReactEmptyComponent.js");
/* harmony import */ var _ReactNativeComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactNativeComponent */ "./version-one/react-reconciler/ReactNativeComponent.js");
/* harmony import */ var _ReactCompositeComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactCompositeComponent */ "./version-one/react-reconciler/ReactCompositeComponent.js");




class ReactCompositeComponentWrapper extends _ReactCompositeComponent__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor(element) {
        super(element)
        this._instantiateReactComponent = instantiateReactComponent
    }
}

// 组件入口
// 判断node类型来区分不同组件
function instantiateReactComponent(node) {
    let instance

    if (node === null) {
        instance = _ReactEmptyComponent__WEBPACK_IMPORTED_MODULE_0__["default"].create(instantiateReactComponent) // 初始化ReactDOMEmptyComponent 空组件
    } else if (typeof node === 'object') {
        const element = node // 这里我们将节点称为元素

        if (typeof element.type === 'string') {
            instance = _ReactNativeComponent__WEBPACK_IMPORTED_MODULE_1__["default"].createInternalComponent(element) // 初始化ReactDOMComponent DOM标签组件
        } else {
            instance = new ReactCompositeComponentWrapper(element) // 初始化ReactCompositeComponent 自定义标签组件 
        }
    } else if (typeof node === 'string' || typeof node === 'number') {
        instance = _ReactNativeComponent__WEBPACK_IMPORTED_MODULE_1__["default"].createInstanceForText(node) // 初始化ReactDOMTextComponent 文本组件
    } 

    return instance
}

/* harmony default export */ __webpack_exports__["default"] = (instantiateReactComponent);

/***/ }),

/***/ "./version-one/react/ReactElement.js":
/*!*******************************************!*\
  !*** ./version-one/react/ReactElement.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const REACT_ELEMENT_TYPE = (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) || 0xeac7

const ReactElement = function(type, key, ref, self, props) {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key,
        ref: ref,
        props: props,
    }
    return element
}

ReactElement.createElement = function(type, config, children) {

    const props = {}

    let key = null
    let ref = null
    let self = null

    if (config) {

    } 

    const childrenLength = arguments.length - 2
    if (childrenLength === 1) {
        props.children = children
    }
    
    return ReactElement(
        type,
        key,
        ref,
        self,
        props,
    )
}

ReactElement.isValidElement =  function(object) {
    return (
      typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE
    )
}
/* harmony default export */ __webpack_exports__["default"] = (ReactElement);

/***/ }),

/***/ "./version-one/utils/traverseAllChildren.js":
/*!**************************************************!*\
  !*** ./version-one/utils/traverseAllChildren.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_ReactElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../react/ReactElement */ "./version-one/react/ReactElement.js");
// 抄的 还没搞清楚


const SEPARATOR = '.'

const userProvidedKeyEscaperLookup = {
    '=': '=0',
    ':': '=2',
  };
  
const userProvidedKeyEscapeRegex = /[=:]/g

function traverseAllChildren(children, callback, traverseContext) {
    if (children == null) {
      return 0;
    }
  
    return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

function traverseAllChildrenImpl(
    children,
    nameSoFar,
    callback,
    traverseContext
) {
    const type = typeof children

    if (children === null || type === 'string' || type === 'number' || _react_ReactElement__WEBPACK_IMPORTED_MODULE_0__["default"].isValidElement(children)) {
        callback(traverseContext, children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar)
        return 1
    }
}

function getComponentKey(component, index) {
    // Do some typechecking here since we call this blindly. We want to ensure
    // that we don't block potential future ES APIs.
    if (component && typeof component === 'object' && component.key != null) {
      // Explicit key
      return wrapUserProvidedKey(component.key)
    }
    // Implicit key determined by the index in the set
    return index.toString(36)
}

function wrapUserProvidedKey(key) {
    return '$' + escapeUserProvidedKey(key)
}

function escapeUserProvidedKey(text) {
    return ('' + text).replace(
      userProvidedKeyEscapeRegex,
      userProvidedKeyEscaper
    )
}

function userProvidedKeyEscaper(match) {
    return userProvidedKeyEscaperLookup[match]
}

/* harmony default export */ __webpack_exports__["default"] = (traverseAllChildren);

/***/ })

/******/ });
//# sourceMappingURL=react-dom.js.map