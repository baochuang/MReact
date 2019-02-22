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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_React__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/React */ \"./src/react/src/React.js\");\n\n\nwindow.React = _src_React__WEBPACK_IMPORTED_MODULE_0__[\"default\"]//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3QvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QvaW5kZXguanM/YTMxYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAnLi9zcmMvUmVhY3QnXG5cbndpbmRvdy5SZWFjdCA9IFJlYWN0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/react/index.js\n");

/***/ }),

/***/ "./src/react/src/React.js":
/*!********************************!*\
  !*** ./src/react/src/React.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ReactElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactElement */ \"./src/react/src/ReactElement.js\");\n/* harmony import */ var _ReactHooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactHooks */ \"./src/react/src/ReactHooks.js\");\n/* harmony import */ var _ReactSharedInternals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactSharedInternals */ \"./src/react/src/ReactSharedInternals.js\");\n\n\n\n\n\n\nconst React = {\n    useState: _ReactHooks__WEBPACK_IMPORTED_MODULE_1__[\"useState\"],\n    createElement: _ReactElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"],\n    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: _ReactSharedInternals__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (React);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3Qvc3JjL1JlYWN0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3NyYy9SZWFjdC5qcz8xMmM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgY3JlYXRlRWxlbWVudCBcbn0gZnJvbSAnLi9SZWFjdEVsZW1lbnQnXG5cbmltcG9ydCB7XG4gICAgdXNlU3RhdGVcbn0gZnJvbSAnLi9SZWFjdEhvb2tzJ1xuXG5pbXBvcnQgUmVhY3RTaGFyZWRJbnRlcm5hbHMgZnJvbSAnLi9SZWFjdFNoYXJlZEludGVybmFscydcblxuY29uc3QgUmVhY3QgPSB7XG4gICAgdXNlU3RhdGUsXG4gICAgY3JlYXRlRWxlbWVudCxcbiAgICBfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDogUmVhY3RTaGFyZWRJbnRlcm5hbHNcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/react/src/React.js\n");

/***/ }),

/***/ "./src/react/src/ReactCurrentDispatcher.js":
/*!*************************************************!*\
  !*** ./src/react/src/ReactCurrentDispatcher.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst ReactCurrentDispatcher = {\n    current: null\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ReactCurrentDispatcher);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3Qvc3JjL1JlYWN0Q3VycmVudERpc3BhdGNoZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3Qvc3JjL1JlYWN0Q3VycmVudERpc3BhdGNoZXIuanM/ODY3MiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBSZWFjdEN1cnJlbnREaXNwYXRjaGVyID0ge1xuICAgIGN1cnJlbnQ6IG51bGxcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/react/src/ReactCurrentDispatcher.js\n");

/***/ }),

/***/ "./src/react/src/ReactCurrentOwner.js":
/*!********************************************!*\
  !*** ./src/react/src/ReactCurrentOwner.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst ReactCurrentOwner = {\n    current: null\n}\n  \n/* harmony default export */ __webpack_exports__[\"default\"] = (ReactCurrentOwner);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3Qvc3JjL1JlYWN0Q3VycmVudE93bmVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3NyYy9SZWFjdEN1cnJlbnRPd25lci5qcz81YTE0Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlYWN0Q3VycmVudE93bmVyID0ge1xuICAgIGN1cnJlbnQ6IG51bGxcbn1cbiAgXG5leHBvcnQgZGVmYXVsdCBSZWFjdEN1cnJlbnRPd25lciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/react/src/ReactCurrentOwner.js\n");

/***/ }),

/***/ "./src/react/src/ReactElement.js":
/*!***************************************!*\
  !*** ./src/react/src/ReactElement.js ***!
  \***************************************/
/*! exports provided: createElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony import */ var _ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactCurrentOwner */ \"./src/react/src/ReactCurrentOwner.js\");\n/* harmony import */ var _shared_ReactSymbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/ReactSymbols */ \"./src/shared/ReactSymbols.js\");\n\n\n\nconst ReactElement = function(type, key, ref, owner, props) {\n    const element = {\n        $$typeof: _shared_ReactSymbols__WEBPACK_IMPORTED_MODULE_1__[\"REACT_ELEMENT_TYPE\"],\n        type: type,\n        key: key,\n        ref: ref,\n        props: props,\n        _owner: owner\n    }\n    \n    return element\n}\n\nfunction createElement(type, config, children) {\n    let propName\n\n    const props = {}\n\n    let key = null\n    let ref = null\n\n    if (config) {\n        ref = config.ref || null\n        key = config.key ? '' + config.key : null\n    }\n\n    const childrenLength = arguments.length - 2\n\n    if (childrenLength === 1) {\n        props.children = children\n    } else if (childrenLength > 1) {\n        const childArray = Array(childrenLength)\n        for (let i = 0; i < childrenLength; i++) {\n          childArray[i] = arguments[i + 2]\n        }\n        props.children = childArray\n    }\n\n    if (type && type.defaultProps) {\n        const defaultProps = type.defaultProps\n        for (propName in defaultProps) {\n          if (props[propName] === undefined) {\n            props[propName] = defaultProps[propName]\n          }\n        }\n    }\n\n    return ReactElement(\n        type,\n        key,\n        ref,\n        _ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_0__[\"default\"].current,\n        props\n    )\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3Qvc3JjL1JlYWN0RWxlbWVudC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9yZWFjdC9zcmMvUmVhY3RFbGVtZW50LmpzP2I4ZmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0Q3VycmVudE93bmVyIGZyb20gJy4vUmVhY3RDdXJyZW50T3duZXInXG5pbXBvcnQgeyBSRUFDVF9FTEVNRU5UX1RZUEUgfSBmcm9tICcuLi8uLi9zaGFyZWQvUmVhY3RTeW1ib2xzJ1xuXG5jb25zdCBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbih0eXBlLCBrZXksIHJlZiwgb3duZXIsIHByb3BzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IHtcbiAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAga2V5OiBrZXksXG4gICAgICAgIHJlZjogcmVmLFxuICAgICAgICBwcm9wczogcHJvcHMsXG4gICAgICAgIF9vd25lcjogb3duZXJcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGVsZW1lbnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgY29uZmlnLCBjaGlsZHJlbikge1xuICAgIGxldCBwcm9wTmFtZVxuXG4gICAgY29uc3QgcHJvcHMgPSB7fVxuXG4gICAgbGV0IGtleSA9IG51bGxcbiAgICBsZXQgcmVmID0gbnVsbFxuXG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgICByZWYgPSBjb25maWcucmVmIHx8IG51bGxcbiAgICAgICAga2V5ID0gY29uZmlnLmtleSA/ICcnICsgY29uZmlnLmtleSA6IG51bGxcbiAgICB9XG5cbiAgICBjb25zdCBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyXG5cbiAgICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlblxuICAgIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aClcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl1cbiAgICAgICAgfVxuICAgICAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXlcbiAgICB9XG5cbiAgICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcykge1xuICAgICAgICBjb25zdCBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wc1xuICAgICAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBSZWFjdEVsZW1lbnQoXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGtleSxcbiAgICAgICAgcmVmLFxuICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LFxuICAgICAgICBwcm9wc1xuICAgIClcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/react/src/ReactElement.js\n");

/***/ }),

/***/ "./src/react/src/ReactHooks.js":
/*!*************************************!*\
  !*** ./src/react/src/ReactHooks.js ***!
  \*************************************/
/*! exports provided: useState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useState\", function() { return useState; });\n/* harmony import */ var _ReactCurrentDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactCurrentDispatcher */ \"./src/react/src/ReactCurrentDispatcher.js\");\n\n\nfunction resolveDispatcher() {\n    const dispatcher = _ReactCurrentDispatcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"].current\n\n    return dispatcher\n}\n\nfunction useState(initialState) {\n    const dispatcher = resolveDispatcher()\n    return dispatcher.useState(initialState)\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3Qvc3JjL1JlYWN0SG9va3MuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3Qvc3JjL1JlYWN0SG9va3MuanM/OWM5MyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciBmcm9tICcuL1JlYWN0Q3VycmVudERpc3BhdGNoZXInXG5cbmZ1bmN0aW9uIHJlc29sdmVEaXNwYXRjaGVyKCkge1xuICAgIGNvbnN0IGRpc3BhdGNoZXIgPSBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLmN1cnJlbnRcblxuICAgIHJldHVybiBkaXNwYXRjaGVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VTdGF0ZShpbml0aWFsU3RhdGUpIHtcbiAgICBjb25zdCBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKVxuICAgIHJldHVybiBkaXNwYXRjaGVyLnVzZVN0YXRlKGluaXRpYWxTdGF0ZSlcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/react/src/ReactHooks.js\n");

/***/ }),

/***/ "./src/react/src/ReactSharedInternals.js":
/*!***********************************************!*\
  !*** ./src/react/src/ReactSharedInternals.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactCurrentOwner */ \"./src/react/src/ReactCurrentOwner.js\");\n/* harmony import */ var _ReactCurrentDispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReactCurrentDispatcher */ \"./src/react/src/ReactCurrentDispatcher.js\");\n\n\n\nconst ReactSharedInternals = {\n    ReactCurrentDispatcher: _ReactCurrentDispatcher__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    ReactCurrentOwner: _ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ReactSharedInternals);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVhY3Qvc3JjL1JlYWN0U2hhcmVkSW50ZXJuYWxzLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3NyYy9SZWFjdFNoYXJlZEludGVybmFscy5qcz8xNTA2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdEN1cnJlbnRPd25lciBmcm9tICcuL1JlYWN0Q3VycmVudE93bmVyJ1xuaW1wb3J0IFJlYWN0Q3VycmVudERpc3BhdGNoZXIgZnJvbSAnLi9SZWFjdEN1cnJlbnREaXNwYXRjaGVyJ1xuXG5jb25zdCBSZWFjdFNoYXJlZEludGVybmFscyA9IHtcbiAgICBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLFxuICAgIFJlYWN0Q3VycmVudE93bmVyXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0U2hhcmVkSW50ZXJuYWxzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/react/src/ReactSharedInternals.js\n");

/***/ }),

/***/ "./src/shared/ReactSymbols.js":
/*!************************************!*\
  !*** ./src/shared/ReactSymbols.js ***!
  \************************************/
/*! exports provided: REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REACT_ELEMENT_TYPE\", function() { return REACT_ELEMENT_TYPE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REACT_FRAGMENT_TYPE\", function() { return REACT_FRAGMENT_TYPE; });\nconst hasSymbol = typeof Symbol === 'function' && Symbol.for\n\nconst REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7\nconst REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2hhcmVkL1JlYWN0U3ltYm9scy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvUmVhY3RTeW1ib2xzLmpzPzEwZTkiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yXG5cbmV4cG9ydCBjb25zdCBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzdcbmV4cG9ydCBjb25zdCBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/shared/ReactSymbols.js\n");

/***/ })

/******/ });