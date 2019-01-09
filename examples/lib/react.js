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
/******/ 	return __webpack_require__(__webpack_require__.s = "./packages/react/src/React.js");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./packages/react/src/React.js":
/*!*************************************!*\
  !*** ./packages/react/src/React.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReactElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactElement */ "./packages/react/src/ReactElement.js");
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactComponent */ "./packages/react/src/ReactComponent.js");


const { createElement } = _ReactElement__WEBPACK_IMPORTED_MODULE_0__["default"]



const React = {
    createElement,
    Component: _ReactComponent__WEBPACK_IMPORTED_MODULE_1__["default"]
}

window.React = React

/***/ }),

/***/ "./packages/react/src/ReactComponent.js":
/*!**********************************************!*\
  !*** ./packages/react/src/ReactComponent.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./packages/constants/index.js");


function ReactComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = _constants__WEBPACK_IMPORTED_MODULE_0__["emptyObject"];
}

ReactComponent.prototype.isReactComponent = {}

ReactComponent.prototype.setState = function(partialState, callback) {

}

/* harmony default export */ __webpack_exports__["default"] = (ReactComponent);

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

/***/ })

/******/ });
//# sourceMappingURL=react.js.map