/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/extensions/forms/elementor/app/src/elementor-forms.ts":
/*!*******************************************************************!*\
  !*** ./src/extensions/forms/elementor/app/src/elementor-forms.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ElementorForms)
/* harmony export */ });
/* harmony import */ var _staticsnap_frontend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @staticsnap/frontend */ "@staticsnap/frontend");
/* harmony import */ var _staticsnap_frontend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_staticsnap_frontend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


class ElementorForms extends _staticsnap_frontend__WEBPACK_IMPORTED_MODULE_0__.FormBase {
  elementorMessagesClasses = {
    error: 'elementor-message-danger',
    field_error: 'elementor-message-danger',
    invalid_error: 'elementor-message-danger',
    success: 'elementor-message-success'
  };
  constructor() {
    super('[data-static-snap-type="form"][data-static-snap-form-type="elementor"]');
  }
  onSubmit(_e, form, _submitData, responseData) {
    const settings = this.getFormSettings(responseData);
    const knowSubmitActions = ['redirect', 'popup', 'webhook'];
    this.setMessage(form, responseData.type === 'item' && responseData?.data?.saved ? 'success' : 'error', settings);
    settings?.submit_actions?.some(action => {
      if (knowSubmitActions.includes(action)) {
        if (action === 'redirect') {
          this.onRedirect(settings);
        }
        if (action === 'popup') {
          this.onPopup(settings);
        }
        if (action === 'webhook') {
          this.onWebhooks(settings, form);
        }
      }
    });
  }
  onRedirect(settings) {
    if (settings.redirect_to) {
      window.location.href = settings.redirect_to;
    }
  }
  onWebhooks(settings, form) {
    //get all form data
    const formData = new FormData(form);
    settings.webhooks?.forEach(webhook => {
      fetch(webhook.url, {
        body: JSON.stringify({
          ...Object.fromEntries(formData)
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
    });
  }
  onPopup(settings) {
    if (!settings.popup || !settings.popup.popup_id || !window.elementorProFrontend || !window.elementorProFrontend.modules || !window.elementorProFrontend.modules.popup) {
      return;
    }
    if (settings.popup?.action === 'close') {
      window.elementorProFrontend.modules.popup.closePopup({
        id: settings.popup.popup_id
      });
    } else {
      window.elementorProFrontend.modules.popup.showPopup({
        id: settings.popup.popup_id
      });
    }
  }
  onError(_e, form, _error) {
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
    const noticeElement = this.getNoticeElement(form);
    const matchTypeToMessage = {
      error: settings?.messages?.error,
      field_error: settings?.messages?.required,
      invalid_error: settings?.messages?.invalid,
      success: settings?.messages?.success
    };
    const message = matchTypeToMessage[type] || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An error occurred, please try again later.', 'static-snap');
    noticeElement.textContent = message;
    noticeElement.classList.remove('elementor-message-success', 'elementor-message-error');
    const messageClass = this.elementorMessagesClasses[type];
    noticeElement.classList.add(messageClass);
  }
  getNoticeElement(form) {
    let noticeElement = form.querySelector(' .elementor-message');
    if (!noticeElement) {
      noticeElement = document.createElement('div');
      noticeElement.classList.add('elementor-message');
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
/*!********************************************************!*\
  !*** ./src/extensions/forms/elementor/app/src/init.ts ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elementor_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elementor-forms */ "./src/extensions/forms/elementor/app/src/elementor-forms.ts");

new _elementor_forms__WEBPACK_IMPORTED_MODULE_0__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=elementor-forms.js.map