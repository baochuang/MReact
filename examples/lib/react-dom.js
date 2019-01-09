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
/******/ 	return __webpack_require__(__webpack_require__.s = "./packages/react-dom/src/client/ReactDOM.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./packages/constants/NodeType.js":
/*!****************************************!*\
  !*** ./packages/constants/NodeType.js ***!
  \****************************************/
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

/***/ "./packages/constants/index.js":
/*!*************************************!*\
  !*** ./packages/constants/index.js ***!
  \*************************************/
/*! exports provided: internalInstanceKey, canUseLazy, emptyObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "internalInstanceKey", function() { return internalInstanceKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canUseLazy", function() { return canUseLazy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyObject", function() { return emptyObject; });
const internalInstanceKey = '__reactInternalInstance$' + Math.random().toString(36).slice(2)

const canUseLazy = !!(
    typeof document !== undefined &&
    typeof document.documentMode === 'number' ||
    typeof navigator !== 'undefined' &&
    typeof navigator.userAgent === 'string' &&
    /\bEdge\/\d/.test(navigator.userAgent)
)

const emptyObject = {}

/***/ }),

/***/ "./packages/react-dom/src/ReactDOMComponent.js":
/*!*****************************************************!*\
  !*** ./packages/react-dom/src/ReactDOMComponent.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_DOMLazyTree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/DOMLazyTree */ "./packages/utils/DOMLazyTree.js");
const CONTENT_TYPES = {'string': true, 'number': true}


function ReactDOMComponent(element) {
    const tag = element.type

    this._tag = tag.toLowerCase()
    this._currentElement = element
}

ReactDOMComponent.displayName = 'ReactDOMComponent'

ReactDOMComponent.Mixin = {
    mountComponent: function(
        nativeParent,
        nativeContainerInfo,
        context
    ) {
        this._nativeParent = nativeParent
        this._nativeContainerInfo = nativeContainerInfo

        const props = this._currentElement.props

        let mountImage

        if (true) {
            const ownerDocument = nativeContainerInfo._ownerDocument

            const el = ownerDocument.createElement(this._currentElement.type)

            const lazyTree = Object(_utils_DOMLazyTree__WEBPACK_IMPORTED_MODULE_0__["default"])(el);
            
            this._createInitialChildren(props, lazyTree);
      
            mountImage = lazyTree
        }

        return mountImage
    },
    _createInitialChildren: function(
        props,
        lazyTree
    ) {
        const contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
        const childrenToUse = contentToUse != null ? null : props.children;
        if (contentToUse) {
          // TODO: Validate that text is allowed as a child of this node
          _utils_DOMLazyTree__WEBPACK_IMPORTED_MODULE_0__["default"].queueText(lazyTree, contentToUse);
        } else if (childrenToUse) {
            // const mountImages = this.mountChildren(childrenToUse, context);
            // for (var i = 0; i < mountImages.length; i++) {
            //     DOMLazyTree.queueChild(lazyTree, mountImages[i]);
            // }
        }
    },
    getPublicInstance: function() {
        return null;
    }
}

Object.assign(
    ReactDOMComponent.prototype,
    ReactDOMComponent.Mixin
)

/* harmony default export */ __webpack_exports__["default"] = (ReactDOMComponent);

/***/ }),

/***/ "./packages/react-dom/src/ReactDOMContainerInfo.js":
/*!*********************************************************!*\
  !*** ./packages/react-dom/src/ReactDOMContainerInfo.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_NodeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/NodeType */ "./packages/constants/NodeType.js");


function ReactDOMContainerInfo(topLevelWrapper, node) {
    const info = {
        _topLevelWrapper: topLevelWrapper,
        _ownerDocument: node ?
            node.nodeType === _constants_NodeType__WEBPACK_IMPORTED_MODULE_0__["DOC_NODE_TYPE"] ?   
                node : node.ownerDocument :
                    null
    }
    return info
}

/* harmony default export */ __webpack_exports__["default"] = (ReactDOMContainerInfo);

/***/ }),

/***/ "./packages/react-dom/src/ReactDOMTextComponent.js":
/*!*********************************************************!*\
  !*** ./packages/react-dom/src/ReactDOMTextComponent.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./packages/react-dom/src/ReactDefaultInjection.js":
/*!*********************************************************!*\
  !*** ./packages/react-dom/src/ReactDefaultInjection.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReactInjection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactInjection */ "./packages/react-dom/src/ReactInjection.js");
/* harmony import */ var _ReactDOMComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactDOMComponent */ "./packages/react-dom/src/ReactDOMComponent.js");
/* harmony import */ var _ReactDOMTextComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactDOMTextComponent */ "./packages/react-dom/src/ReactDOMTextComponent.js");
/* harmony import */ var _ReactDOMTextComponent__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ReactDOMTextComponent__WEBPACK_IMPORTED_MODULE_2__);




const ReactDefaultInjection = {
    inject: function() {
        _ReactInjection__WEBPACK_IMPORTED_MODULE_0__["default"].NativeComponent.injectGenericComponentClass(
            _ReactDOMComponent__WEBPACK_IMPORTED_MODULE_1__["default"]
        )
        
        _ReactInjection__WEBPACK_IMPORTED_MODULE_0__["default"].NativeComponent.injectTextComponentClass(
            _ReactDOMTextComponent__WEBPACK_IMPORTED_MODULE_2___default.a
        )
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ReactDefaultInjection);

/***/ }),

/***/ "./packages/react-dom/src/ReactInjection.js":
/*!**************************************************!*\
  !*** ./packages/react-dom/src/ReactInjection.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_reconciler_src_ReactNativeComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../react-reconciler/src/ReactNativeComponent */ "./packages/react-reconciler/src/ReactNativeComponent.js");


const ReactInjection = {
    NativeComponent: _react_reconciler_src_ReactNativeComponent__WEBPACK_IMPORTED_MODULE_0__["default"].injection
}

/* harmony default export */ __webpack_exports__["default"] = (ReactInjection);

/***/ }),

/***/ "./packages/react-dom/src/client/ReactDOM.js":
/*!***************************************************!*\
  !*** ./packages/react-dom/src/client/ReactDOM.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReactMount__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactMount */ "./packages/react-dom/src/client/ReactMount.js");
/* harmony import */ var _ReactDefaultInjection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReactDefaultInjection */ "./packages/react-dom/src/ReactDefaultInjection.js");

const { render } = _ReactMount__WEBPACK_IMPORTED_MODULE_0__["default"]



_ReactDefaultInjection__WEBPACK_IMPORTED_MODULE_1__["default"].inject()

const ReactDOM = {
    render
}

window.ReactDOM = ReactDOM

/***/ }),

/***/ "./packages/react-dom/src/client/ReactMount.js":
/*!*****************************************************!*\
  !*** ./packages/react-dom/src/client/ReactMount.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_src_ReactElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../react/src/ReactElement */ "./packages/react/src/ReactElement.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants */ "./packages/constants/index.js");
/* harmony import */ var _react_reconciler_src_instantiateReactComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../react-reconciler/src/instantiateReactComponent */ "./packages/react-reconciler/src/instantiateReactComponent.js");
/* harmony import */ var _ReactDOMContainerInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ReactDOMContainerInfo */ "./packages/react-dom/src/ReactDOMContainerInfo.js");
/* harmony import */ var _utils_setInnerHTML__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/setInnerHTML */ "./packages/utils/setInnerHTML.js");
/* harmony import */ var _utils_DOMLazyTree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/DOMLazyTree */ "./packages/utils/DOMLazyTree.js");
/* harmony import */ var _react_reconciler_src_ReactReconciler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react-reconciler/src/ReactReconciler */ "./packages/react-reconciler/src/ReactReconciler.js");








let topLevelRootCounter = 1

function mountComponentIntoNode(
    wrapperInstance,
    container,
    context
) {
    const markup = _react_reconciler_src_ReactReconciler__WEBPACK_IMPORTED_MODULE_6__["default"].mountComponent(
        wrapperInstance,
        null,
        Object(_ReactDOMContainerInfo__WEBPACK_IMPORTED_MODULE_3__["default"])(wrapperInstance, container),
        context
    )

    wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance

    ReactMount._mountImageIntoNode(
        markup,
        container,
        wrapperInstance
    )
}

function batchedMountComponentIntoNode (
    componentInstance,
    container,
    context
) {
    mountComponentIntoNode(
        componentInstance,
        container,
        context
    )
}

const TopLevelWrapper = function() {
    this.rootID = topLevelRootCounter++
};

TopLevelWrapper.prototype.isReactComponent = {};

TopLevelWrapper.prototype.render = function() {
  // this.props is actually a ReactElement
  return this.props;
}

const ReactMount = {
    _renderNewRootComponent: function(nextElement, container, context) {
        const componentInstance = Object(_react_reconciler_src_instantiateReactComponent__WEBPACK_IMPORTED_MODULE_2__["default"])(nextElement)

        batchedMountComponentIntoNode(componentInstance, container, context)

        return componentInstance
    },
    _mountImageIntoNode: function(
        markup,
        container,
        wrapperInstance,
        transaction = { useCreateElement : true}
    ){
        if (transaction.useCreateElement) {
            while (container.lastChild) {
                container.removeChild(container.lastChild)
            }
            _utils_DOMLazyTree__WEBPACK_IMPORTED_MODULE_5__["default"].insertTreeBefore(container, markup, null)
        } else {
            Object(_utils_setInnerHTML__WEBPACK_IMPORTED_MODULE_4__["default"])(container, markup)
        }
    },
    _renderSubtreeIntoContainer: function(parentComponent, nextElement, container, callback) {

        const nextWrappedElement = Object(_react_src_ReactElement__WEBPACK_IMPORTED_MODULE_0__["default"])(
            TopLevelWrapper,
            null,
            null,
            nextElement
        )

        const component = ReactMount._renderNewRootComponent(
            nextWrappedElement,
            container,
            parentComponent ? parentComponent._reactInternalInstance._processChildContext(
                parentComponent._reactInternalInstance._context
            ) : _constants__WEBPACK_IMPORTED_MODULE_1__["emptyObject"] // {}
        )._renderedComponent.getPublicInstance()

        if (callback) {

        }

        return component
    },
    render: function(nextElement, container, callback) {
        return ReactMount._renderSubtreeIntoContainer(
            null,
            nextElement,
            container,
            callback,
        )
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ReactMount);

/***/ }),

/***/ "./packages/react-reconciler/src/ReactCompositeComponent.js":
/*!******************************************************************!*\
  !*** ./packages/react-reconciler/src/ReactCompositeComponent.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReactInstanceMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactInstanceMap */ "./packages/react-reconciler/src/ReactInstanceMap.js");
/* harmony import */ var _ReactReconciler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactReconciler */ "./packages/react-reconciler/src/ReactReconciler.js");



function StatelessComponent(Component) {}

StatelessComponent.prototype.render = function() {
    const Component = _ReactInstanceMap__WEBPACK_IMPORTED_MODULE_0__["default"].get(this)._currentElement.type
    const element = Component(this.props)
    return element
}

const ReactCompositeComponentMixin = {
    construct: function(element) {
        this._currentElement = element
        this._renderedComponent = null
    },
    mountComponent: function(
        nativeParent,
        nativeContainerInfo,
        context
    ) {
        this._nativeParent = nativeParent
        this._nativeContainerInfo = nativeContainerInfo
        
        const publicProps = this._processProps(this._currentElement.props)

        const Component = this._currentElement.type

        let inst
        let renderedElement

        if (Component.prototype && Component.prototype.isReactComponent) {
            inst = new Component(publicProps)
        } else {
            inst = Component(publicProps)
        }

        if (inst == null || inst.render == null) {
            renderedElement = inst
            inst = new StatelessComponent(Component)
        }

        inst.props = publicProps

        this._instance = inst

        _ReactInstanceMap__WEBPACK_IMPORTED_MODULE_0__["default"].set(inst, this)

        let markup

        if (inst.unstable_handleError) {

        } else {
            markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo)
        }

        if (inst.componentDidMount) {

        }

        return markup
    },
    _processProps: function(newProps) {
        return newProps
    },
    performInitialMount: function(
        renderedElement,
        nativeParent, 
        nativeContainerInfo
    ) {
        const inst = this._instance
    
        if (inst.componentWillMount) {
            inst.componentWillMount()
        }
        // If not a stateless component, we now render
        if (renderedElement === undefined) {
            renderedElement = this._renderValidatedComponent()
        }
    
        this._renderedComponent = this._instantiateReactComponent(renderedElement)
    
        const markup = _ReactReconciler__WEBPACK_IMPORTED_MODULE_1__["default"].mountComponent(
            this._renderedComponent,
            nativeParent,
            nativeContainerInfo
        )
      
        return markup
    },
    _instantiateReactComponent: null,
    _renderValidatedComponent: function() {
        let renderedComponent
    
        try {
            renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext()
        } finally {
            return renderedComponent
        }
    },
    _renderValidatedComponentWithoutOwnerOrContext: function() {
        const inst = this._instance;
        const renderedComponent = inst.render()
    
        return renderedComponent
    }
}

const ReactCompositeComponent = {
    Mixin: ReactCompositeComponentMixin
}

/* harmony default export */ __webpack_exports__["default"] = (ReactCompositeComponent);

/***/ }),

/***/ "./packages/react-reconciler/src/ReactInstanceMap.js":
/*!***********************************************************!*\
  !*** ./packages/react-reconciler/src/ReactInstanceMap.js ***!
  \***********************************************************/
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

/***/ "./packages/react-reconciler/src/ReactNativeComponent.js":
/*!***************************************************************!*\
  !*** ./packages/react-reconciler/src/ReactNativeComponent.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let genericComponentClass = null
let textComponentClass = null

const ReactHostComponentInjection = {
    injectGenericComponentClass: function(componentClass) {
        genericComponentClass = componentClass;
    },
    injectTextComponentClass: function(componentClass) {
        textComponentClass = componentClass;
    }
}

function createInternalComponent(element) {
    return new genericComponentClass(element)
}

function createInstanceForText(node) {
    return new textComponentClass(text)
}

const ReactNativeComponent = {
    createInternalComponent,
    createInstanceForText,
    injection: ReactHostComponentInjection
}

/* harmony default export */ __webpack_exports__["default"] = (ReactNativeComponent);

/***/ }),

/***/ "./packages/react-reconciler/src/ReactReconciler.js":
/*!**********************************************************!*\
  !*** ./packages/react-reconciler/src/ReactReconciler.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const ReactReconciler = {
    mountComponent: function (
        internalInstance,
        nativeParent,
        nativeContainerInfo,
        context
    ) {
        const markup = internalInstance.mountComponent(
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

/***/ "./packages/react-reconciler/src/instantiateReactComponent.js":
/*!********************************************************************!*\
  !*** ./packages/react-reconciler/src/instantiateReactComponent.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReactNativeComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactNativeComponent */ "./packages/react-reconciler/src/ReactNativeComponent.js");
/* harmony import */ var _ReactCompositeComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactCompositeComponent */ "./packages/react-reconciler/src/ReactCompositeComponent.js");



const ReactCompositeComponentWrapper = function(element) {
    this.construct(element);
}

Object.assign(
    ReactCompositeComponentWrapper.prototype,
    _ReactCompositeComponent__WEBPACK_IMPORTED_MODULE_1__["default"].Mixin,
    {
      _instantiateReactComponent: instantiateReactComponent,
    }
)

function isInternalComponentType(type) {
    return (
        typeof type === 'function' &&
        typeof type.prototype !== 'undefined' &&
        typeof type.prototype.mountComponent === 'function' &&
        typeof type.prototype.receiveComponent === 'function'
      )
}

function instantiateReactComponent(node) {
    let instance 

    if (node === null || node === false) {

    } else if (typeof node === 'object') {
        const type = node.type
        const element = node
        if (typeof type === 'string') {
            instance = _ReactNativeComponent__WEBPACK_IMPORTED_MODULE_0__["default"].createInternalComponent(element)
        } else if (isInternalComponentType(type)) {
            instance = new type(element)
        } else {
            instance = new ReactCompositeComponentWrapper(element)
        }
    } else if (typeof node === 'string' || typeof node === 'number') {
        instance = _ReactNativeComponent__WEBPACK_IMPORTED_MODULE_0__["default"].createInstanceForText(node)
    }

    return instance
}

/* harmony default export */ __webpack_exports__["default"] = (instantiateReactComponent);

/***/ }),

/***/ "./packages/react/src/ReactElement.js":
/*!********************************************!*\
  !*** ./packages/react/src/ReactElement.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const ReactElement = function(type, key, ref, props) {
    const element = {
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
    
    if (config) {

    } 

    const childrenLength = arguments.length - 2

    if (childrenLength.length === 1) {
        props.children = children
    }
    
    return ReactElement(
        type,
        key,
        ref,
        props,
    )
}

/* harmony default export */ __webpack_exports__["default"] = (ReactElement);

/***/ }),

/***/ "./packages/utils/DOMLazyTree.js":
/*!***************************************!*\
  !*** ./packages/utils/DOMLazyTree.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_NodeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/NodeType */ "./packages/constants/NodeType.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./packages/constants/index.js");
/* harmony import */ var _setTextContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setTextContent */ "./packages/utils/setTextContent.js");




function insertTreeChildren(tree) {
    if (!_constants__WEBPACK_IMPORTED_MODULE_1__["canUseLazy"]) {
        return 
    }
    const node = tree.node
    const children = tree.children
    if (children.length) {
        for (var i = 0; i < children.length; i++) {
            insertTreeBefore(node, children[i], null);
        }
    } else if (tree.html !== null) {
        node.innerHTML = tree.html
    } else if (tree.text !== null) {
        Object(_setTextContent__WEBPACK_IMPORTED_MODULE_2__["default"])(node, tree.text)
    }
}

function DOMLazyTree(node) {
    return {
      node: node,
      children: [],
      html: null,
      text: null,
    }
}

DOMLazyTree.insertTreeBefore = function(parentNode, tree, referenceNode) {
    if (tree.node.nodeType === _constants_NodeType__WEBPACK_IMPORTED_MODULE_0__["DOCUMENTFRAGMENT_NODE_TYPE"]) {
        insertTreeChildren(tree)
        parentNode.insertBefore(tree.node, referenceNode)
    } else {
        parentNode.insertBefore(tree.node, referenceNode)
        insertTreeChildren(tree)
    }
}

DOMLazyTree.queueText = function(tree, text) {
    if (enableLazy) {
        tree.text = text;
    } else {
        Object(_setTextContent__WEBPACK_IMPORTED_MODULE_2__["default"])(tree.node, text);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (DOMLazyTree);

/***/ }),

/***/ "./packages/utils/setInnerHTML.js":
/*!****************************************!*\
  !*** ./packages/utils/setInnerHTML.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const setInnerHTML = function(node, html) {
    node.innerHTML = html
}

/* harmony default export */ __webpack_exports__["default"] = (setInnerHTML);

/***/ }),

/***/ "./packages/utils/setTextContent.js":
/*!******************************************!*\
  !*** ./packages/utils/setTextContent.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const setTextContent = function(node, text) {
    node.textContent = text
}

/* harmony default export */ __webpack_exports__["default"] = (setTextContent);

/***/ })

/******/ });
//# sourceMappingURL=react-dom.js.map