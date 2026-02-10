/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/extensions/forms/wp-forms/app/src/wp-form.ts":
/*!**********************************************************!*\
  !*** ./src/extensions/forms/wp-forms/app/src/wp-form.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WpForm)
/* harmony export */ });
/* harmony import */ var _staticsnap_frontend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @staticsnap/frontend */ "@staticsnap/frontend");
/* harmony import */ var _staticsnap_frontend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_staticsnap_frontend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


class WpForm extends _staticsnap_frontend__WEBPACK_IMPORTED_MODULE_0__.FormBase {
  extensionMessagesClasses = {
    error: 'wpforms-error-alert',
    field_error: 'wpforms-error-alert',
    invalid_error: 'wpforms-error-alert',
    success: 'wpforms-confirmation-container-full'
  };
  constructor() {
    super('[data-static-snap-type="form"][data-static-snap-form-type="wp-forms"]');
  }
  onSubmit(_e, form, _submitData, responseData) {
    const settings = this.getFormSettings(responseData);
    this.setMessage(form, responseData.type === 'item' && responseData?.data?.saved ? 'success' : 'error', settings);

    // TODO: add webhook support
    const knowSubmitActions = ['redirect'];
    settings?.submit_actions?.some(action => {
      if (knowSubmitActions.includes(action)) {
        if (action === 'redirect') {
          this.onRedirect(settings);
        }
      }
    });
  }
  onRedirect(settings) {
    if (settings.redirect_to) {
      window.location.href = settings.redirect_to;
    }
  }
  onError(_e, form, _error) {
    //console.log('ElementorForms onError', e, form, error);
    this.setMessage(form, 'error', {
      messages: {
        error: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An error occurred, please try again later.', 'static-snap'),
        invalid: '',
        required: '',
        success: ''
      }
    });
  }
  setMessage(form, type, settings) {
    const matchTypeToMessage = {
      error: settings?.messages?.error,
      field_error: settings?.messages?.required,
      invalid_error: settings?.messages?.invalid,
      success: settings?.messages?.success
    };
    const noticeElement = this.getNoticeElement(form);
    const message = matchTypeToMessage[type] || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('<p>%s</p>', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An error occurred, please try again later.', 'static-snap'));
    noticeElement.innerHTML = message;
    const messageClass = this.extensionMessagesClasses[type];
    // remove other form classes
    Object.values(this.extensionMessagesClasses).forEach(messageClass => {
      form.classList.remove(messageClass);
    });
    noticeElement.classList.add(messageClass);
  }
  getNoticeElement(form) {
    let noticeElement = form.querySelector(' .wpforms-notice-container');
    if (!noticeElement) {
      noticeElement = document.createElement('div');
      noticeElement.classList.add('wpforms-notice-container');
      form.appendChild(noticeElement);
    }
    return noticeElement;
  }
}

/***/ }),

/***/ "@staticsnap/frontend":
/*!********************************************!*\
  !*** external "StaticSnapFrontendClasses" ***!
  \********************************************/
/***/ ((module) => {

module.exports = StaticSnapFrontendClasses;

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************************************!*\
  !*** ./src/extensions/forms/wp-forms/app/src/init.ts ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wp_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wp-form */ "./src/extensions/forms/wp-forms/app/src/wp-form.ts");

new _wp_form__WEBPACK_IMPORTED_MODULE_0__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=wp-forms.js.map