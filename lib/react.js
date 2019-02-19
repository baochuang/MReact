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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/react/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/react/index.js":
/*!****************************!*\
  !*** ./src/react/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_React__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/React */ \"./src/react/src/React.js\");\n\r\n\r\nwindow.React = _src_React__WEBPACK_IMPORTED_MODULE_0__[\"default\"]//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3QvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QvaW5kZXguanM/YTMxYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAnLi9zcmMvUmVhY3QnXHJcblxyXG53aW5kb3cuUmVhY3QgPSBSZWFjdCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/react/index.js\n");

/***/ }),

/***/ "./src/react/src/React.js":
/*!********************************!*\
  !*** ./src/react/src/React.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ReactElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactElement */ \"./src/react/src/ReactElement.js\");\n/* harmony import */ var _ReactHooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactHooks */ \"./src/react/src/ReactHooks.js\");\n/* harmony import */ var _ReactSharedInternals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactSharedInternals */ \"./src/react/src/ReactSharedInternals.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst React = {\r\n    useState: _ReactHooks__WEBPACK_IMPORTED_MODULE_1__[\"useState\"],\r\n    createElement: _ReactElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"],\r\n    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: _ReactSharedInternals__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (React);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3Qvc3JjL1JlYWN0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3NyYy9SZWFjdC5qcz8xMmM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBjcmVhdGVFbGVtZW50IFxyXG59IGZyb20gJy4vUmVhY3RFbGVtZW50J1xyXG5cclxuaW1wb3J0IHtcclxuICAgIHVzZVN0YXRlXHJcbn0gZnJvbSAnLi9SZWFjdEhvb2tzJ1xyXG5cclxuaW1wb3J0IFJlYWN0U2hhcmVkSW50ZXJuYWxzIGZyb20gJy4vUmVhY3RTaGFyZWRJbnRlcm5hbHMnXHJcblxyXG5jb25zdCBSZWFjdCA9IHtcclxuICAgIHVzZVN0YXRlLFxyXG4gICAgY3JlYXRlRWxlbWVudCxcclxuICAgIF9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEOiBSZWFjdFNoYXJlZEludGVybmFsc1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/react/src/React.js\n");

/***/ }),

/***/ "./src/react/src/ReactCurrentDispatcher.js":
/*!*************************************************!*\
  !*** ./src/react/src/ReactCurrentDispatcher.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst ReactCurrentDispatcher = {\r\n    current: null\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ReactCurrentDispatcher);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3Qvc3JjL1JlYWN0Q3VycmVudERpc3BhdGNoZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3Qvc3JjL1JlYWN0Q3VycmVudERpc3BhdGNoZXIuanM/ODY3MiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBSZWFjdEN1cnJlbnREaXNwYXRjaGVyID0ge1xyXG4gICAgY3VycmVudDogbnVsbFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdEN1cnJlbnREaXNwYXRjaGVyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/react/src/ReactCurrentDispatcher.js\n");

/***/ }),

/***/ "./src/react/src/ReactCurrentOwner.js":
/*!********************************************!*\
  !*** ./src/react/src/ReactCurrentOwner.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst ReactCurrentOwner = {\r\n    current: null\r\n}\r\n  \r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ReactCurrentOwner);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3Qvc3JjL1JlYWN0Q3VycmVudE93bmVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3NyYy9SZWFjdEN1cnJlbnRPd25lci5qcz81YTE0Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlYWN0Q3VycmVudE93bmVyID0ge1xyXG4gICAgY3VycmVudDogbnVsbFxyXG59XHJcbiAgXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0Q3VycmVudE93bmVyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/react/src/ReactCurrentOwner.js\n");

/***/ }),

/***/ "./src/react/src/ReactElement.js":
/*!***************************************!*\
  !*** ./src/react/src/ReactElement.js ***!
  \***************************************/
/*! exports provided: createElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony import */ var _ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactCurrentOwner */ \"./src/react/src/ReactCurrentOwner.js\");\n/* harmony import */ var _shared_ReactSymbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/ReactSymbols */ \"./src/shared/ReactSymbols.js\");\n\r\n\r\n\r\nconst ReactElement = function(type, key, ref, owner, props) {\r\n    const element = {\r\n        $$typeof: _shared_ReactSymbols__WEBPACK_IMPORTED_MODULE_1__[\"REACT_ELEMENT_TYPE\"],\r\n        type: type,\r\n        key: key,\r\n        ref: ref,\r\n        props: props,\r\n        _owner: owner\r\n    }\r\n    \r\n    return element\r\n}\r\n\r\nfunction createElement(type, config, children) {\r\n    let propName\r\n\r\n    const props = {}\r\n\r\n    let key = null\r\n    let ref = null\r\n\r\n    if (config) {\r\n        ref = config.ref || null\r\n        key = config.key ? '' + config.key : null\r\n    }\r\n\r\n    const childrenLength = arguments.length - 2\r\n\r\n    if (childrenLength === 1) {\r\n        props.children = children\r\n    } else if (childrenLength > 1) {\r\n        const childArray = Array(childrenLength)\r\n        for (let i = 0; i < childrenLength; i++) {\r\n          childArray[i] = arguments[i + 2]\r\n        }\r\n        props.children = childArray\r\n    }\r\n\r\n    if (type && type.defaultProps) {\r\n        const defaultProps = type.defaultProps\r\n        for (propName in defaultProps) {\r\n          if (props[propName] === undefined) {\r\n            props[propName] = defaultProps[propName]\r\n          }\r\n        }\r\n    }\r\n\r\n    return ReactElement(\r\n        type,\r\n        key,\r\n        ref,\r\n        _ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_0__[\"default\"].current,\r\n        props\r\n    )\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3Qvc3JjL1JlYWN0RWxlbWVudC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9yZWFjdC9zcmMvUmVhY3RFbGVtZW50LmpzP2I4ZmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0Q3VycmVudE93bmVyIGZyb20gJy4vUmVhY3RDdXJyZW50T3duZXInXHJcbmltcG9ydCB7IFJFQUNUX0VMRU1FTlRfVFlQRSB9IGZyb20gJy4uLy4uL3NoYXJlZC9SZWFjdFN5bWJvbHMnXHJcblxyXG5jb25zdCBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbih0eXBlLCBrZXksIHJlZiwgb3duZXIsIHByb3BzKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0ge1xyXG4gICAgICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXHJcbiAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICByZWY6IHJlZixcclxuICAgICAgICBwcm9wczogcHJvcHMsXHJcbiAgICAgICAgX293bmVyOiBvd25lclxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gZWxlbWVudFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XHJcbiAgICBsZXQgcHJvcE5hbWVcclxuXHJcbiAgICBjb25zdCBwcm9wcyA9IHt9XHJcblxyXG4gICAgbGV0IGtleSA9IG51bGxcclxuICAgIGxldCByZWYgPSBudWxsXHJcblxyXG4gICAgaWYgKGNvbmZpZykge1xyXG4gICAgICAgIHJlZiA9IGNvbmZpZy5yZWYgfHwgbnVsbFxyXG4gICAgICAgIGtleSA9IGNvbmZpZy5rZXkgPyAnJyArIGNvbmZpZy5rZXkgOiBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMlxyXG5cclxuICAgIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW5cclxuICAgIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHMpIHtcclxuICAgICAgICBjb25zdCBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wc1xyXG4gICAgICAgIGZvciAocHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XHJcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gUmVhY3RFbGVtZW50KFxyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgICAga2V5LFxyXG4gICAgICAgIHJlZixcclxuICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LFxyXG4gICAgICAgIHByb3BzXHJcbiAgICApXHJcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/react/src/ReactElement.js\n");

/***/ }),

/***/ "./src/react/src/ReactHooks.js":
/*!*************************************!*\
  !*** ./src/react/src/ReactHooks.js ***!
  \*************************************/
/*! exports provided: useState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useState\", function() { return useState; });\n/* harmony import */ var _ReactCurrentDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactCurrentDispatcher */ \"./src/react/src/ReactCurrentDispatcher.js\");\n\r\n\r\nfunction resolveDispatcher() {\r\n    const dispatcher = _ReactCurrentDispatcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"].current\r\n\r\n    return dispatcher\r\n}\r\n\r\nfunction useState(initialState) {\r\n    const dispatcher = resolveDispatcher()\r\n    return dispatcher.useState(initialState)\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3Qvc3JjL1JlYWN0SG9va3MuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3Qvc3JjL1JlYWN0SG9va3MuanM/OWM5MyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciBmcm9tICcuL1JlYWN0Q3VycmVudERpc3BhdGNoZXInXHJcblxyXG5mdW5jdGlvbiByZXNvbHZlRGlzcGF0Y2hlcigpIHtcclxuICAgIGNvbnN0IGRpc3BhdGNoZXIgPSBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLmN1cnJlbnRcclxuXHJcbiAgICByZXR1cm4gZGlzcGF0Y2hlclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXNlU3RhdGUoaW5pdGlhbFN0YXRlKSB7XHJcbiAgICBjb25zdCBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKVxyXG4gICAgcmV0dXJuIGRpc3BhdGNoZXIudXNlU3RhdGUoaW5pdGlhbFN0YXRlKVxyXG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/react/src/ReactHooks.js\n");

/***/ }),

/***/ "./src/react/src/ReactSharedInternals.js":
/*!***********************************************!*\
  !*** ./src/react/src/ReactSharedInternals.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactCurrentOwner */ \"./src/react/src/ReactCurrentOwner.js\");\n/* harmony import */ var _ReactCurrentDispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactCurrentDispatcher */ \"./src/react/src/ReactCurrentDispatcher.js\");\n\r\n\r\n\r\nconst ReactSharedInternals = {\r\n    ReactCurrentDispatcher: _ReactCurrentDispatcher__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\r\n    ReactCurrentOwner: _ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ReactSharedInternals);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3Qvc3JjL1JlYWN0U2hhcmVkSW50ZXJuYWxzLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3NyYy9SZWFjdFNoYXJlZEludGVybmFscy5qcz8xNTA2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdEN1cnJlbnRPd25lciBmcm9tICcuL1JlYWN0Q3VycmVudE93bmVyJ1xyXG5pbXBvcnQgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciBmcm9tICcuL1JlYWN0Q3VycmVudERpc3BhdGNoZXInXHJcblxyXG5jb25zdCBSZWFjdFNoYXJlZEludGVybmFscyA9IHtcclxuICAgIFJlYWN0Q3VycmVudERpc3BhdGNoZXIsXHJcbiAgICBSZWFjdEN1cnJlbnRPd25lclxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdFNoYXJlZEludGVybmFscyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/react/src/ReactSharedInternals.js\n");

/***/ }),

/***/ "./src/shared/ReactSymbols.js":
/*!************************************!*\
  !*** ./src/shared/ReactSymbols.js ***!
  \************************************/
/*! exports provided: REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REACT_ELEMENT_TYPE\", function() { return REACT_ELEMENT_TYPE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REACT_FRAGMENT_TYPE\", function() { return REACT_FRAGMENT_TYPE; });\nconst hasSymbol = typeof Symbol === 'function' && Symbol.for\r\n\r\nconst REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7\r\nconst REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2hhcmVkL1JlYWN0U3ltYm9scy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvUmVhY3RTeW1ib2xzLmpzPzEwZTkiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yXHJcblxyXG5leHBvcnQgY29uc3QgUkVBQ1RfRUxFTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3XHJcbmV4cG9ydCBjb25zdCBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/shared/ReactSymbols.js\n");

/***/ })

/******/ });