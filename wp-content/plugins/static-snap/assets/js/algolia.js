/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/extensions/search/algolia/app/src/search/algolia.ts":
/*!*****************************************************************!*\
  !*** ./src/extensions/search/algolia/app/src/search/algolia.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var algoliasearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! algoliasearch */ "./node_modules/algoliasearch/dist/browser.js");
/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mustache */ "./node_modules/mustache/mustache.mjs");



class Algolia {
  constructor(frontend) {
    this.frontend = frontend;
    this.settings = this.frontend.config().options.search.settings;
    this.client = (0,algoliasearch__WEBPACK_IMPORTED_MODULE_1__.algoliasearch)(this.settings.algolia_application_id, this.settings.algolia_search_key);
  }
  getType() {
    return 'algolia';
  }
  async search(query) {
    const locale = this.frontend.config().locale || null;
    const has_translations = this.frontend.config().has_translations || false;
    const params = {};
    if (has_translations) {
      params.facetFilters = [`language:${locale}`];
    }
    const multipleQueries = [{
      indexName: this.settings.algolia_index_name,
      params: params,
      query
    }];
    try {
      return await this.client.search(multipleQueries);
    } catch (error) {
      if (this.frontend.config().is_admin_bar_showing) {
        const message = error.message;
        alert((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(`You must run a deployment to index the content for first time when you are using wordpress. Error: ${message}`));
      }
      return {
        results: []
      };
    }
  }
  renderResults(target, results) {
    if (!results.results) {
      return;
    }
    const template = document.getElementById('static-snap-search-result-template')?.innerHTML;
    if (!template) {
      return;
    }
    const rendered = mustache__WEBPACK_IMPORTED_MODULE_2__["default"];
    let html = '';
    for (const result of results.results) {
      const hits = result.hits;
      const itemHtml = hits.map(hit => {
        return rendered.render(template, hit);
      }).join('');
      html += '<li>' + itemHtml + '</li>';
    }
    target.innerHTML = '<ol>' + html + '</ol>';
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Algolia);

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@algolia/client-abtesting/dist/builds/browser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@algolia/client-abtesting/dist/builds/browser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abtestingClient: () => (/* binding */ abtestingClient),
/* harmony export */   apiClientVersion: () => (/* binding */ apiClientVersion)
/* harmony export */ });
/* harmony import */ var _algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/requester-browser-xhr */ "./node_modules/@algolia/requester-browser-xhr/dist/requester.xhr.js");
/* harmony import */ var _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/common.js");
// builds/browser.ts



// src/abtestingClient.ts

var apiClientVersion = "5.15.0";
var REGIONS = ["de", "us"];
function getDefaultHosts(region) {
  const url = !region ? "analytics.algolia.com" : "analytics.{region}.algolia.com".replace("{region}", region);
  return [{ url, accept: "readWrite", protocol: "https" }];
}
function createAbtestingClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  region: regionOption,
  ...options
}) {
  const auth = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createAuth)(appIdOption, apiKeyOption, authMode);
  const transporter = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createTransporter)({
    hosts: getDefaultHosts(regionOption),
    ...options,
    algoliaAgent: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.getAlgoliaAgent)({
      algoliaAgents,
      client: "Abtesting",
      version: apiClientVersion
    }),
    baseHeaders: {
      "content-type": "text/plain",
      ...auth.headers(),
      ...options.baseHeaders
    },
    baseQueryParameters: {
      ...auth.queryParameters(),
      ...options.baseQueryParameters
    }
  });
  return {
    transporter,
    /**
     * The `appId` currently in use.
     */
    appId: appIdOption,
    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache() {
      return Promise.all([transporter.requestsCache.clear(), transporter.responsesCache.clear()]).then(() => void 0);
    },
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return transporter.algoliaAgent.value;
    },
    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment, version) {
      transporter.algoliaAgent.add({ segment, version });
    },
    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }) {
      if (!authMode || authMode === "WithinHeaders") {
        transporter.baseHeaders["x-algolia-api-key"] = apiKey;
      } else {
        transporter.baseQueryParameters["x-algolia-api-key"] = apiKey;
      }
    },
    /**
     * Creates a new A/B test.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param addABTestsRequest - The addABTestsRequest object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    addABTests(addABTestsRequest, requestOptions) {
      if (!addABTestsRequest) {
        throw new Error("Parameter `addABTestsRequest` is required when calling `addABTests`.");
      }
      if (!addABTestsRequest.name) {
        throw new Error("Parameter `addABTestsRequest.name` is required when calling `addABTests`.");
      }
      if (!addABTestsRequest.variants) {
        throw new Error("Parameter `addABTestsRequest.variants` is required when calling `addABTests`.");
      }
      if (!addABTestsRequest.endAt) {
        throw new Error("Parameter `addABTestsRequest.endAt` is required when calling `addABTests`.");
      }
      const requestPath = "/2/abtests";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: addABTestsRequest
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customDelete({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customDelete`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customGet({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customGet`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPost`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPut({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPut`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes an A/B test by its ID.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteABTest - The deleteABTest object.
     * @param deleteABTest.id - Unique A/B test identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteABTest({ id }, requestOptions) {
      if (!id) {
        throw new Error("Parameter `id` is required when calling `deleteABTest`.");
      }
      const requestPath = "/2/abtests/{id}".replace("{id}", encodeURIComponent(id));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Given the traffic percentage and the expected effect size, this endpoint estimates the sample size and duration of an A/B test based on historical traffic.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param estimateABTestRequest - The estimateABTestRequest object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    estimateABTest(estimateABTestRequest, requestOptions) {
      if (!estimateABTestRequest) {
        throw new Error("Parameter `estimateABTestRequest` is required when calling `estimateABTest`.");
      }
      if (!estimateABTestRequest.configuration) {
        throw new Error("Parameter `estimateABTestRequest.configuration` is required when calling `estimateABTest`.");
      }
      if (!estimateABTestRequest.variants) {
        throw new Error("Parameter `estimateABTestRequest.variants` is required when calling `estimateABTest`.");
      }
      const requestPath = "/2/abtests/estimate";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: estimateABTestRequest
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the details for an A/B test by its ID.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getABTest - The getABTest object.
     * @param getABTest.id - Unique A/B test identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getABTest({ id }, requestOptions) {
      if (!id) {
        throw new Error("Parameter `id` is required when calling `getABTest`.");
      }
      const requestPath = "/2/abtests/{id}".replace("{id}", encodeURIComponent(id));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Lists all A/B tests you configured for this application.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param listABTests - The listABTests object.
     * @param listABTests.offset - Position of the first item to return.
     * @param listABTests.limit - Number of items to return.
     * @param listABTests.indexPrefix - Index name prefix. Only A/B tests for indices starting with this string are included in the response.
     * @param listABTests.indexSuffix - Index name suffix. Only A/B tests for indices ending with this string are included in the response.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listABTests({ offset, limit, indexPrefix, indexSuffix } = {}, requestOptions = void 0) {
      const requestPath = "/2/abtests";
      const headers = {};
      const queryParameters = {};
      if (offset !== void 0) {
        queryParameters["offset"] = offset.toString();
      }
      if (limit !== void 0) {
        queryParameters["limit"] = limit.toString();
      }
      if (indexPrefix !== void 0) {
        queryParameters["indexPrefix"] = indexPrefix.toString();
      }
      if (indexSuffix !== void 0) {
        queryParameters["indexSuffix"] = indexSuffix.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Schedule an A/B test to be started at a later time.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param scheduleABTestsRequest - The scheduleABTestsRequest object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    scheduleABTest(scheduleABTestsRequest, requestOptions) {
      if (!scheduleABTestsRequest) {
        throw new Error("Parameter `scheduleABTestsRequest` is required when calling `scheduleABTest`.");
      }
      if (!scheduleABTestsRequest.name) {
        throw new Error("Parameter `scheduleABTestsRequest.name` is required when calling `scheduleABTest`.");
      }
      if (!scheduleABTestsRequest.variants) {
        throw new Error("Parameter `scheduleABTestsRequest.variants` is required when calling `scheduleABTest`.");
      }
      if (!scheduleABTestsRequest.scheduledAt) {
        throw new Error("Parameter `scheduleABTestsRequest.scheduledAt` is required when calling `scheduleABTest`.");
      }
      if (!scheduleABTestsRequest.endAt) {
        throw new Error("Parameter `scheduleABTestsRequest.endAt` is required when calling `scheduleABTest`.");
      }
      const requestPath = "/2/abtests/schedule";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: scheduleABTestsRequest
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Stops an A/B test by its ID.  You can\'t restart stopped A/B tests.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param stopABTest - The stopABTest object.
     * @param stopABTest.id - Unique A/B test identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    stopABTest({ id }, requestOptions) {
      if (!id) {
        throw new Error("Parameter `id` is required when calling `stopABTest`.");
      }
      const requestPath = "/2/abtests/{id}/stop".replace("{id}", encodeURIComponent(id));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    }
  };
}

// builds/browser.ts
function abtestingClient(appId, apiKey, region, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  if (region && (typeof region !== "string" || !REGIONS.includes(region))) {
    throw new Error(`\`region\` must be one of the following: ${REGIONS.join(", ")}`);
  }
  return createAbtestingClient({
    appId,
    apiKey,
    region,
    timeouts: {
      connect: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_CONNECT_TIMEOUT_BROWSER,
      read: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_READ_TIMEOUT_BROWSER,
      write: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_WRITE_TIMEOUT_BROWSER
    },
    logger: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createNullLogger)(),
    requester: (0,_algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__.createXhrRequester)(),
    algoliaAgents: [{ segment: "Browser" }],
    authMode: "WithinQueryParameters",
    responsesCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)(),
    requestsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)({ serializable: false }),
    hostsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createFallbackableCache)({
      caches: [(0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createBrowserLocalStorageCache)({ key: `${apiClientVersion}-${appId}` }), (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)()]
    }),
    ...options
  });
}

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/@algolia/client-analytics/dist/builds/browser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@algolia/client-analytics/dist/builds/browser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   analyticsClient: () => (/* binding */ analyticsClient),
/* harmony export */   apiClientVersion: () => (/* binding */ apiClientVersion)
/* harmony export */ });
/* harmony import */ var _algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/requester-browser-xhr */ "./node_modules/@algolia/requester-browser-xhr/dist/requester.xhr.js");
/* harmony import */ var _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/common.js");
// builds/browser.ts



// src/analyticsClient.ts

var apiClientVersion = "5.15.0";
var REGIONS = ["de", "us"];
function getDefaultHosts(region) {
  const url = !region ? "analytics.algolia.com" : "analytics.{region}.algolia.com".replace("{region}", region);
  return [{ url, accept: "readWrite", protocol: "https" }];
}
function createAnalyticsClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  region: regionOption,
  ...options
}) {
  const auth = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createAuth)(appIdOption, apiKeyOption, authMode);
  const transporter = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createTransporter)({
    hosts: getDefaultHosts(regionOption),
    ...options,
    algoliaAgent: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.getAlgoliaAgent)({
      algoliaAgents,
      client: "Analytics",
      version: apiClientVersion
    }),
    baseHeaders: {
      "content-type": "text/plain",
      ...auth.headers(),
      ...options.baseHeaders
    },
    baseQueryParameters: {
      ...auth.queryParameters(),
      ...options.baseQueryParameters
    }
  });
  return {
    transporter,
    /**
     * The `appId` currently in use.
     */
    appId: appIdOption,
    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache() {
      return Promise.all([transporter.requestsCache.clear(), transporter.responsesCache.clear()]).then(() => void 0);
    },
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return transporter.algoliaAgent.value;
    },
    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment, version) {
      transporter.algoliaAgent.add({ segment, version });
    },
    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }) {
      if (!authMode || authMode === "WithinHeaders") {
        transporter.baseHeaders["x-algolia-api-key"] = apiKey;
      } else {
        transporter.baseQueryParameters["x-algolia-api-key"] = apiKey;
      }
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customDelete({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customDelete`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customGet({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customGet`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPost`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPut({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPut`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the add-to-cart rate for all of your searches with at least one add-to-cart event, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getAddToCartRate - The getAddToCartRate object.
     * @param getAddToCartRate.index - Index name.
     * @param getAddToCartRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getAddToCartRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getAddToCartRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getAddToCartRate({ index, startDate, endDate, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getAddToCartRate`.");
      }
      const requestPath = "/2/conversions/addToCartRate";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the average click position of your search results, including a daily breakdown.  The average click position is the average of all clicked search results\' positions. For example, if users only ever click on the first result for any search, the average click position is 1. By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getAverageClickPosition - The getAverageClickPosition object.
     * @param getAverageClickPosition.index - Index name.
     * @param getAverageClickPosition.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getAverageClickPosition.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getAverageClickPosition.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getAverageClickPosition({ index, startDate, endDate, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getAverageClickPosition`.");
      }
      const requestPath = "/2/clicks/averageClickPosition";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the positions in the search results and their associated number of clicks.  This lets you check how many clicks the first, second, or tenth search results receive.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getClickPositions - The getClickPositions object.
     * @param getClickPositions.index - Index name.
     * @param getClickPositions.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getClickPositions.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getClickPositions.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getClickPositions({ index, startDate, endDate, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getClickPositions`.");
      }
      const requestPath = "/2/clicks/positions";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the click-through rate for all of your searches with at least one click event, including a daily breakdown  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getClickThroughRate - The getClickThroughRate object.
     * @param getClickThroughRate.index - Index name.
     * @param getClickThroughRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getClickThroughRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getClickThroughRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getClickThroughRate({ index, startDate, endDate, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getClickThroughRate`.");
      }
      const requestPath = "/2/clicks/clickThroughRate";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the conversion rate for all of your searches with at least one conversion event, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getConversionRate - The getConversionRate object.
     * @param getConversionRate.index - Index name.
     * @param getConversionRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getConversionRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getConversionRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getConversionRate({ index, startDate, endDate, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getConversionRate`.");
      }
      const requestPath = "/2/conversions/conversionRate";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the fraction of searches that didn\'t lead to any click within a time range, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getNoClickRate - The getNoClickRate object.
     * @param getNoClickRate.index - Index name.
     * @param getNoClickRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getNoClickRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getNoClickRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getNoClickRate({ index, startDate, endDate, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getNoClickRate`.");
      }
      const requestPath = "/2/searches/noClickRate";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the fraction of searches that didn\'t return any results within a time range, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getNoResultsRate - The getNoResultsRate object.
     * @param getNoResultsRate.index - Index name.
     * @param getNoResultsRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getNoResultsRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getNoResultsRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getNoResultsRate({ index, startDate, endDate, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getNoResultsRate`.");
      }
      const requestPath = "/2/searches/noResultRate";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the purchase rate for all of your searches with at least one purchase event, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getPurchaseRate - The getPurchaseRate object.
     * @param getPurchaseRate.index - Index name.
     * @param getPurchaseRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getPurchaseRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getPurchaseRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getPurchaseRate({ index, startDate, endDate, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getPurchaseRate`.");
      }
      const requestPath = "/2/conversions/purchaseRate";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves revenue-related metrics, such as the total revenue or the average order value.  To retrieve revenue-related metrics, sent purchase events. By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getRevenue - The getRevenue object.
     * @param getRevenue.index - Index name.
     * @param getRevenue.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getRevenue.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getRevenue.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getRevenue({ index, startDate, endDate, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getRevenue`.");
      }
      const requestPath = "/2/conversions/revenue";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the number of searches within a time range, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getSearchesCount - The getSearchesCount object.
     * @param getSearchesCount.index - Index name.
     * @param getSearchesCount.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getSearchesCount.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getSearchesCount.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSearchesCount({ index, startDate, endDate, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getSearchesCount`.");
      }
      const requestPath = "/2/searches/count";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the most popular searches that didn\'t lead to any clicks, from the 1,000 most frequent searches.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getSearchesNoClicks - The getSearchesNoClicks object.
     * @param getSearchesNoClicks.index - Index name.
     * @param getSearchesNoClicks.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getSearchesNoClicks.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getSearchesNoClicks.limit - Number of items to return.
     * @param getSearchesNoClicks.offset - Position of the first item to return.
     * @param getSearchesNoClicks.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSearchesNoClicks({ index, startDate, endDate, limit, offset, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getSearchesNoClicks`.");
      }
      const requestPath = "/2/searches/noClicks";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (limit !== void 0) {
        queryParameters["limit"] = limit.toString();
      }
      if (offset !== void 0) {
        queryParameters["offset"] = offset.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the most popular searches that didn\'t return any results.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getSearchesNoResults - The getSearchesNoResults object.
     * @param getSearchesNoResults.index - Index name.
     * @param getSearchesNoResults.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getSearchesNoResults.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getSearchesNoResults.limit - Number of items to return.
     * @param getSearchesNoResults.offset - Position of the first item to return.
     * @param getSearchesNoResults.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSearchesNoResults({ index, startDate, endDate, limit, offset, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getSearchesNoResults`.");
      }
      const requestPath = "/2/searches/noResults";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (limit !== void 0) {
        queryParameters["limit"] = limit.toString();
      }
      if (offset !== void 0) {
        queryParameters["offset"] = offset.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the time when the Analytics data for the specified index was last updated.  The Analytics data is updated every 5 minutes.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getStatus - The getStatus object.
     * @param getStatus.index - Index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getStatus({ index }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getStatus`.");
      }
      const requestPath = "/2/status";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the countries with the most searches to your index.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getTopCountries - The getTopCountries object.
     * @param getTopCountries.index - Index name.
     * @param getTopCountries.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopCountries.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopCountries.limit - Number of items to return.
     * @param getTopCountries.offset - Position of the first item to return.
     * @param getTopCountries.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTopCountries({ index, startDate, endDate, limit, offset, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getTopCountries`.");
      }
      const requestPath = "/2/countries";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (limit !== void 0) {
        queryParameters["limit"] = limit.toString();
      }
      if (offset !== void 0) {
        queryParameters["offset"] = offset.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the most frequently used filter attributes.  These are attributes of your records that you included in the `attributesForFaceting` setting.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getTopFilterAttributes - The getTopFilterAttributes object.
     * @param getTopFilterAttributes.index - Index name.
     * @param getTopFilterAttributes.search - Search query.
     * @param getTopFilterAttributes.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopFilterAttributes.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopFilterAttributes.limit - Number of items to return.
     * @param getTopFilterAttributes.offset - Position of the first item to return.
     * @param getTopFilterAttributes.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTopFilterAttributes({ index, search, startDate, endDate, limit, offset, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getTopFilterAttributes`.");
      }
      const requestPath = "/2/filters";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (search !== void 0) {
        queryParameters["search"] = search.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (limit !== void 0) {
        queryParameters["limit"] = limit.toString();
      }
      if (offset !== void 0) {
        queryParameters["offset"] = offset.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the most frequent filter (facet) values for a filter attribute.  These are attributes of your records that you included in the `attributesForFaceting` setting.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getTopFilterForAttribute - The getTopFilterForAttribute object.
     * @param getTopFilterForAttribute.attribute - Attribute name.
     * @param getTopFilterForAttribute.index - Index name.
     * @param getTopFilterForAttribute.search - Search query.
     * @param getTopFilterForAttribute.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopFilterForAttribute.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopFilterForAttribute.limit - Number of items to return.
     * @param getTopFilterForAttribute.offset - Position of the first item to return.
     * @param getTopFilterForAttribute.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTopFilterForAttribute({ attribute, index, search, startDate, endDate, limit, offset, tags }, requestOptions) {
      if (!attribute) {
        throw new Error("Parameter `attribute` is required when calling `getTopFilterForAttribute`.");
      }
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getTopFilterForAttribute`.");
      }
      const requestPath = "/2/filters/{attribute}".replace("{attribute}", encodeURIComponent(attribute));
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (search !== void 0) {
        queryParameters["search"] = search.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (limit !== void 0) {
        queryParameters["limit"] = limit.toString();
      }
      if (offset !== void 0) {
        queryParameters["offset"] = offset.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the most frequently used filters for a search that didn\'t return any results.  To get the most frequent searches without results, use the [Retrieve searches without results](#tag/search/operation/getSearchesNoResults) operation.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getTopFiltersNoResults - The getTopFiltersNoResults object.
     * @param getTopFiltersNoResults.index - Index name.
     * @param getTopFiltersNoResults.search - Search query.
     * @param getTopFiltersNoResults.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopFiltersNoResults.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopFiltersNoResults.limit - Number of items to return.
     * @param getTopFiltersNoResults.offset - Position of the first item to return.
     * @param getTopFiltersNoResults.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTopFiltersNoResults({ index, search, startDate, endDate, limit, offset, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getTopFiltersNoResults`.");
      }
      const requestPath = "/2/filters/noResults";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (search !== void 0) {
        queryParameters["search"] = search.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (limit !== void 0) {
        queryParameters["limit"] = limit.toString();
      }
      if (offset !== void 0) {
        queryParameters["offset"] = offset.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the object IDs of the most frequent search results.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getTopHits - The getTopHits object.
     * @param getTopHits.index - Index name.
     * @param getTopHits.search - Search query.
     * @param getTopHits.clickAnalytics - Whether to include metrics related to click and conversion events in the response.
     * @param getTopHits.revenueAnalytics - Whether to include revenue-related metrics in the response.  If true, metrics related to click and conversion events are also included in the response.
     * @param getTopHits.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopHits.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopHits.limit - Number of items to return.
     * @param getTopHits.offset - Position of the first item to return.
     * @param getTopHits.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTopHits({ index, search, clickAnalytics, revenueAnalytics, startDate, endDate, limit, offset, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getTopHits`.");
      }
      const requestPath = "/2/hits";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (search !== void 0) {
        queryParameters["search"] = search.toString();
      }
      if (clickAnalytics !== void 0) {
        queryParameters["clickAnalytics"] = clickAnalytics.toString();
      }
      if (revenueAnalytics !== void 0) {
        queryParameters["revenueAnalytics"] = revenueAnalytics.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (limit !== void 0) {
        queryParameters["limit"] = limit.toString();
      }
      if (offset !== void 0) {
        queryParameters["offset"] = offset.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Returns the most popular search terms.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getTopSearches - The getTopSearches object.
     * @param getTopSearches.index - Index name.
     * @param getTopSearches.clickAnalytics - Whether to include metrics related to click and conversion events in the response.
     * @param getTopSearches.revenueAnalytics - Whether to include revenue-related metrics in the response.  If true, metrics related to click and conversion events are also included in the response.
     * @param getTopSearches.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopSearches.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopSearches.orderBy - Attribute by which to order the response items.  If the `clickAnalytics` parameter is false, only `searchCount` is available.
     * @param getTopSearches.direction - Sorting direction of the results: ascending or descending.
     * @param getTopSearches.limit - Number of items to return.
     * @param getTopSearches.offset - Position of the first item to return.
     * @param getTopSearches.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTopSearches({
      index,
      clickAnalytics,
      revenueAnalytics,
      startDate,
      endDate,
      orderBy,
      direction,
      limit,
      offset,
      tags
    }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getTopSearches`.");
      }
      const requestPath = "/2/searches";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (clickAnalytics !== void 0) {
        queryParameters["clickAnalytics"] = clickAnalytics.toString();
      }
      if (revenueAnalytics !== void 0) {
        queryParameters["revenueAnalytics"] = revenueAnalytics.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (orderBy !== void 0) {
        queryParameters["orderBy"] = orderBy.toString();
      }
      if (direction !== void 0) {
        queryParameters["direction"] = direction.toString();
      }
      if (limit !== void 0) {
        queryParameters["limit"] = limit.toString();
      }
      if (offset !== void 0) {
        queryParameters["offset"] = offset.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the number of unique users within a time range, including a daily breakdown.  Since this endpoint returns the number of unique users, the sum of the daily values might be different from the total number.  By default, Algolia distinguishes search users by their IP address, _unless_ you include a pseudonymous user identifier in your search requests with the `userToken` API parameter or `x-algolia-usertoken` request header. By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getUsersCount - The getUsersCount object.
     * @param getUsersCount.index - Index name.
     * @param getUsersCount.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getUsersCount.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getUsersCount.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getUsersCount({ index, startDate, endDate, tags }, requestOptions) {
      if (!index) {
        throw new Error("Parameter `index` is required when calling `getUsersCount`.");
      }
      const requestPath = "/2/users/count";
      const headers = {};
      const queryParameters = {};
      if (index !== void 0) {
        queryParameters["index"] = index.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      if (tags !== void 0) {
        queryParameters["tags"] = tags.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    }
  };
}

// builds/browser.ts
function analyticsClient(appId, apiKey, region, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  if (region && (typeof region !== "string" || !REGIONS.includes(region))) {
    throw new Error(`\`region\` must be one of the following: ${REGIONS.join(", ")}`);
  }
  return createAnalyticsClient({
    appId,
    apiKey,
    region,
    timeouts: {
      connect: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_CONNECT_TIMEOUT_BROWSER,
      read: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_READ_TIMEOUT_BROWSER,
      write: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_WRITE_TIMEOUT_BROWSER
    },
    logger: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createNullLogger)(),
    requester: (0,_algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__.createXhrRequester)(),
    algoliaAgents: [{ segment: "Browser" }],
    authMode: "WithinQueryParameters",
    responsesCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)(),
    requestsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)({ serializable: false }),
    hostsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createFallbackableCache)({
      caches: [(0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createBrowserLocalStorageCache)({ key: `${apiClientVersion}-${appId}` }), (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)()]
    }),
    ...options
  });
}

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/@algolia/client-common/dist/common.js":
/*!************************************************************!*\
  !*** ./node_modules/@algolia/client-common/dist/common.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlgoliaError: () => (/* binding */ AlgoliaError),
/* harmony export */   ApiError: () => (/* binding */ ApiError),
/* harmony export */   DEFAULT_CONNECT_TIMEOUT_BROWSER: () => (/* binding */ DEFAULT_CONNECT_TIMEOUT_BROWSER),
/* harmony export */   DEFAULT_CONNECT_TIMEOUT_NODE: () => (/* binding */ DEFAULT_CONNECT_TIMEOUT_NODE),
/* harmony export */   DEFAULT_READ_TIMEOUT_BROWSER: () => (/* binding */ DEFAULT_READ_TIMEOUT_BROWSER),
/* harmony export */   DEFAULT_READ_TIMEOUT_NODE: () => (/* binding */ DEFAULT_READ_TIMEOUT_NODE),
/* harmony export */   DEFAULT_WRITE_TIMEOUT_BROWSER: () => (/* binding */ DEFAULT_WRITE_TIMEOUT_BROWSER),
/* harmony export */   DEFAULT_WRITE_TIMEOUT_NODE: () => (/* binding */ DEFAULT_WRITE_TIMEOUT_NODE),
/* harmony export */   DeserializationError: () => (/* binding */ DeserializationError),
/* harmony export */   DetailedApiError: () => (/* binding */ DetailedApiError),
/* harmony export */   ErrorWithStackTrace: () => (/* binding */ ErrorWithStackTrace),
/* harmony export */   LogLevelEnum: () => (/* binding */ LogLevelEnum),
/* harmony export */   RetryError: () => (/* binding */ RetryError),
/* harmony export */   createAlgoliaAgent: () => (/* binding */ createAlgoliaAgent),
/* harmony export */   createAuth: () => (/* binding */ createAuth),
/* harmony export */   createBrowserLocalStorageCache: () => (/* binding */ createBrowserLocalStorageCache),
/* harmony export */   createFallbackableCache: () => (/* binding */ createFallbackableCache),
/* harmony export */   createIterablePromise: () => (/* binding */ createIterablePromise),
/* harmony export */   createMemoryCache: () => (/* binding */ createMemoryCache),
/* harmony export */   createNullCache: () => (/* binding */ createNullCache),
/* harmony export */   createNullLogger: () => (/* binding */ createNullLogger),
/* harmony export */   createStatefulHost: () => (/* binding */ createStatefulHost),
/* harmony export */   createTransporter: () => (/* binding */ createTransporter),
/* harmony export */   deserializeFailure: () => (/* binding */ deserializeFailure),
/* harmony export */   deserializeSuccess: () => (/* binding */ deserializeSuccess),
/* harmony export */   getAlgoliaAgent: () => (/* binding */ getAlgoliaAgent),
/* harmony export */   isNetworkError: () => (/* binding */ isNetworkError),
/* harmony export */   isRetryable: () => (/* binding */ isRetryable),
/* harmony export */   isSuccess: () => (/* binding */ isSuccess),
/* harmony export */   serializeData: () => (/* binding */ serializeData),
/* harmony export */   serializeHeaders: () => (/* binding */ serializeHeaders),
/* harmony export */   serializeQueryParameters: () => (/* binding */ serializeQueryParameters),
/* harmony export */   serializeUrl: () => (/* binding */ serializeUrl),
/* harmony export */   shuffle: () => (/* binding */ shuffle),
/* harmony export */   stackFrameWithoutCredentials: () => (/* binding */ stackFrameWithoutCredentials),
/* harmony export */   stackTraceWithoutCredentials: () => (/* binding */ stackTraceWithoutCredentials)
/* harmony export */ });
// src/cache/createBrowserLocalStorageCache.ts
function createBrowserLocalStorageCache(options) {
  let storage;
  const namespaceKey = `algolia-client-js-${options.key}`;
  function getStorage() {
    if (storage === void 0) {
      storage = options.localStorage || window.localStorage;
    }
    return storage;
  }
  function getNamespace() {
    return JSON.parse(getStorage().getItem(namespaceKey) || "{}");
  }
  function setNamespace(namespace) {
    getStorage().setItem(namespaceKey, JSON.stringify(namespace));
  }
  function removeOutdatedCacheItems() {
    const timeToLive = options.timeToLive ? options.timeToLive * 1e3 : null;
    const namespace = getNamespace();
    const filteredNamespaceWithoutOldFormattedCacheItems = Object.fromEntries(
      Object.entries(namespace).filter(([, cacheItem]) => {
        return cacheItem.timestamp !== void 0;
      })
    );
    setNamespace(filteredNamespaceWithoutOldFormattedCacheItems);
    if (!timeToLive) {
      return;
    }
    const filteredNamespaceWithoutExpiredItems = Object.fromEntries(
      Object.entries(filteredNamespaceWithoutOldFormattedCacheItems).filter(([, cacheItem]) => {
        const currentTimestamp = (/* @__PURE__ */ new Date()).getTime();
        const isExpired = cacheItem.timestamp + timeToLive < currentTimestamp;
        return !isExpired;
      })
    );
    setNamespace(filteredNamespaceWithoutExpiredItems);
  }
  return {
    get(key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      return Promise.resolve().then(() => {
        removeOutdatedCacheItems();
        return getNamespace()[JSON.stringify(key)];
      }).then((value) => {
        return Promise.all([value ? value.value : defaultValue(), value !== void 0]);
      }).then(([value, exists]) => {
        return Promise.all([value, exists || events.miss(value)]);
      }).then(([value]) => value);
    },
    set(key, value) {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();
        namespace[JSON.stringify(key)] = {
          timestamp: (/* @__PURE__ */ new Date()).getTime(),
          value
        };
        getStorage().setItem(namespaceKey, JSON.stringify(namespace));
        return value;
      });
    },
    delete(key) {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();
        delete namespace[JSON.stringify(key)];
        getStorage().setItem(namespaceKey, JSON.stringify(namespace));
      });
    },
    clear() {
      return Promise.resolve().then(() => {
        getStorage().removeItem(namespaceKey);
      });
    }
  };
}

// src/cache/createNullCache.ts
function createNullCache() {
  return {
    get(_key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      const value = defaultValue();
      return value.then((result) => Promise.all([result, events.miss(result)])).then(([result]) => result);
    },
    set(_key, value) {
      return Promise.resolve(value);
    },
    delete(_key) {
      return Promise.resolve();
    },
    clear() {
      return Promise.resolve();
    }
  };
}

// src/cache/createFallbackableCache.ts
function createFallbackableCache(options) {
  const caches = [...options.caches];
  const current = caches.shift();
  if (current === void 0) {
    return createNullCache();
  }
  return {
    get(key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      return current.get(key, defaultValue, events).catch(() => {
        return createFallbackableCache({ caches }).get(key, defaultValue, events);
      });
    },
    set(key, value) {
      return current.set(key, value).catch(() => {
        return createFallbackableCache({ caches }).set(key, value);
      });
    },
    delete(key) {
      return current.delete(key).catch(() => {
        return createFallbackableCache({ caches }).delete(key);
      });
    },
    clear() {
      return current.clear().catch(() => {
        return createFallbackableCache({ caches }).clear();
      });
    }
  };
}

// src/cache/createMemoryCache.ts
function createMemoryCache(options = { serializable: true }) {
  let cache = {};
  return {
    get(key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      const keyAsString = JSON.stringify(key);
      if (keyAsString in cache) {
        return Promise.resolve(options.serializable ? JSON.parse(cache[keyAsString]) : cache[keyAsString]);
      }
      const promise = defaultValue();
      return promise.then((value) => events.miss(value)).then(() => promise);
    },
    set(key, value) {
      cache[JSON.stringify(key)] = options.serializable ? JSON.stringify(value) : value;
      return Promise.resolve(value);
    },
    delete(key) {
      delete cache[JSON.stringify(key)];
      return Promise.resolve();
    },
    clear() {
      cache = {};
      return Promise.resolve();
    }
  };
}

// src/constants.ts
var DEFAULT_CONNECT_TIMEOUT_BROWSER = 1e3;
var DEFAULT_READ_TIMEOUT_BROWSER = 2e3;
var DEFAULT_WRITE_TIMEOUT_BROWSER = 3e4;
var DEFAULT_CONNECT_TIMEOUT_NODE = 2e3;
var DEFAULT_READ_TIMEOUT_NODE = 5e3;
var DEFAULT_WRITE_TIMEOUT_NODE = 3e4;

// src/createAlgoliaAgent.ts
function createAlgoliaAgent(version) {
  const algoliaAgent = {
    value: `Algolia for JavaScript (${version})`,
    add(options) {
      const addedAlgoliaAgent = `; ${options.segment}${options.version !== void 0 ? ` (${options.version})` : ""}`;
      if (algoliaAgent.value.indexOf(addedAlgoliaAgent) === -1) {
        algoliaAgent.value = `${algoliaAgent.value}${addedAlgoliaAgent}`;
      }
      return algoliaAgent;
    }
  };
  return algoliaAgent;
}

// src/createAuth.ts
function createAuth(appId, apiKey, authMode = "WithinHeaders") {
  const credentials = {
    "x-algolia-api-key": apiKey,
    "x-algolia-application-id": appId
  };
  return {
    headers() {
      return authMode === "WithinHeaders" ? credentials : {};
    },
    queryParameters() {
      return authMode === "WithinQueryParameters" ? credentials : {};
    }
  };
}

// src/createIterablePromise.ts
function createIterablePromise({
  func,
  validate,
  aggregator,
  error,
  timeout = () => 0
}) {
  const retry = (previousResponse) => {
    return new Promise((resolve, reject) => {
      func(previousResponse).then((response) => {
        if (aggregator) {
          aggregator(response);
        }
        if (validate(response)) {
          return resolve(response);
        }
        if (error && error.validate(response)) {
          return reject(new Error(error.message(response)));
        }
        return setTimeout(() => {
          retry(response).then(resolve).catch(reject);
        }, timeout());
      }).catch((err) => {
        reject(err);
      });
    });
  };
  return retry();
}

// src/getAlgoliaAgent.ts
function getAlgoliaAgent({ algoliaAgents, client, version }) {
  const defaultAlgoliaAgent = createAlgoliaAgent(version).add({
    segment: client,
    version
  });
  algoliaAgents.forEach((algoliaAgent) => defaultAlgoliaAgent.add(algoliaAgent));
  return defaultAlgoliaAgent;
}

// src/logger/createNullLogger.ts
function createNullLogger() {
  return {
    debug(_message, _args) {
      return Promise.resolve();
    },
    info(_message, _args) {
      return Promise.resolve();
    },
    error(_message, _args) {
      return Promise.resolve();
    }
  };
}

// src/transporter/createStatefulHost.ts
var EXPIRATION_DELAY = 2 * 60 * 1e3;
function createStatefulHost(host, status = "up") {
  const lastUpdate = Date.now();
  function isUp() {
    return status === "up" || Date.now() - lastUpdate > EXPIRATION_DELAY;
  }
  function isTimedOut() {
    return status === "timed out" && Date.now() - lastUpdate <= EXPIRATION_DELAY;
  }
  return { ...host, status, lastUpdate, isUp, isTimedOut };
}

// src/transporter/errors.ts
var AlgoliaError = class extends Error {
  name = "AlgoliaError";
  constructor(message, name) {
    super(message);
    if (name) {
      this.name = name;
    }
  }
};
var ErrorWithStackTrace = class extends AlgoliaError {
  stackTrace;
  constructor(message, stackTrace, name) {
    super(message, name);
    this.stackTrace = stackTrace;
  }
};
var RetryError = class extends ErrorWithStackTrace {
  constructor(stackTrace) {
    super(
      "Unreachable hosts - your application id may be incorrect. If the error persists, please reach out to the Algolia Support team: https://alg.li/support.",
      stackTrace,
      "RetryError"
    );
  }
};
var ApiError = class extends ErrorWithStackTrace {
  status;
  constructor(message, status, stackTrace, name = "ApiError") {
    super(message, stackTrace, name);
    this.status = status;
  }
};
var DeserializationError = class extends AlgoliaError {
  response;
  constructor(message, response) {
    super(message, "DeserializationError");
    this.response = response;
  }
};
var DetailedApiError = class extends ApiError {
  error;
  constructor(message, status, error, stackTrace) {
    super(message, status, stackTrace, "DetailedApiError");
    this.error = error;
  }
};

// src/transporter/helpers.ts
function shuffle(array) {
  const shuffledArray = array;
  for (let c = array.length - 1; c > 0; c--) {
    const b = Math.floor(Math.random() * (c + 1));
    const a = array[c];
    shuffledArray[c] = array[b];
    shuffledArray[b] = a;
  }
  return shuffledArray;
}
function serializeUrl(host, path, queryParameters) {
  const queryParametersAsString = serializeQueryParameters(queryParameters);
  let url = `${host.protocol}://${host.url}${host.port ? `:${host.port}` : ""}/${path.charAt(0) === "/" ? path.substring(1) : path}`;
  if (queryParametersAsString.length) {
    url += `?${queryParametersAsString}`;
  }
  return url;
}
function serializeQueryParameters(parameters) {
  return Object.keys(parameters).filter((key) => parameters[key] !== void 0).sort().map(
    (key) => `${key}=${encodeURIComponent(
      Object.prototype.toString.call(parameters[key]) === "[object Array]" ? parameters[key].join(",") : parameters[key]
    ).replace(/\+/g, "%20")}`
  ).join("&");
}
function serializeData(request, requestOptions) {
  if (request.method === "GET" || request.data === void 0 && requestOptions.data === void 0) {
    return void 0;
  }
  const data = Array.isArray(request.data) ? request.data : { ...request.data, ...requestOptions.data };
  return JSON.stringify(data);
}
function serializeHeaders(baseHeaders, requestHeaders, requestOptionsHeaders) {
  const headers = {
    Accept: "application/json",
    ...baseHeaders,
    ...requestHeaders,
    ...requestOptionsHeaders
  };
  const serializedHeaders = {};
  Object.keys(headers).forEach((header) => {
    const value = headers[header];
    serializedHeaders[header.toLowerCase()] = value;
  });
  return serializedHeaders;
}
function deserializeSuccess(response) {
  try {
    return JSON.parse(response.content);
  } catch (e) {
    throw new DeserializationError(e.message, response);
  }
}
function deserializeFailure({ content, status }, stackFrame) {
  try {
    const parsed = JSON.parse(content);
    if ("error" in parsed) {
      return new DetailedApiError(parsed.message, status, parsed.error, stackFrame);
    }
    return new ApiError(parsed.message, status, stackFrame);
  } catch {
  }
  return new ApiError(content, status, stackFrame);
}

// src/transporter/responses.ts
function isNetworkError({ isTimedOut, status }) {
  return !isTimedOut && ~~status === 0;
}
function isRetryable({ isTimedOut, status }) {
  return isTimedOut || isNetworkError({ isTimedOut, status }) || ~~(status / 100) !== 2 && ~~(status / 100) !== 4;
}
function isSuccess({ status }) {
  return ~~(status / 100) === 2;
}

// src/transporter/stackTrace.ts
function stackTraceWithoutCredentials(stackTrace) {
  return stackTrace.map((stackFrame) => stackFrameWithoutCredentials(stackFrame));
}
function stackFrameWithoutCredentials(stackFrame) {
  const modifiedHeaders = stackFrame.request.headers["x-algolia-api-key"] ? { "x-algolia-api-key": "*****" } : {};
  return {
    ...stackFrame,
    request: {
      ...stackFrame.request,
      headers: {
        ...stackFrame.request.headers,
        ...modifiedHeaders
      }
    }
  };
}

// src/transporter/createTransporter.ts
function createTransporter({
  hosts,
  hostsCache,
  baseHeaders,
  logger,
  baseQueryParameters,
  algoliaAgent,
  timeouts,
  requester,
  requestsCache,
  responsesCache
}) {
  async function createRetryableOptions(compatibleHosts) {
    const statefulHosts = await Promise.all(
      compatibleHosts.map((compatibleHost) => {
        return hostsCache.get(compatibleHost, () => {
          return Promise.resolve(createStatefulHost(compatibleHost));
        });
      })
    );
    const hostsUp = statefulHosts.filter((host) => host.isUp());
    const hostsTimedOut = statefulHosts.filter((host) => host.isTimedOut());
    const hostsAvailable = [...hostsUp, ...hostsTimedOut];
    const compatibleHostsAvailable = hostsAvailable.length > 0 ? hostsAvailable : compatibleHosts;
    return {
      hosts: compatibleHostsAvailable,
      getTimeout(timeoutsCount, baseTimeout) {
        const timeoutMultiplier = hostsTimedOut.length === 0 && timeoutsCount === 0 ? 1 : hostsTimedOut.length + 3 + timeoutsCount;
        return timeoutMultiplier * baseTimeout;
      }
    };
  }
  async function retryableRequest(request, requestOptions, isRead = true) {
    const stackTrace = [];
    const data = serializeData(request, requestOptions);
    const headers = serializeHeaders(baseHeaders, request.headers, requestOptions.headers);
    const dataQueryParameters = request.method === "GET" ? {
      ...request.data,
      ...requestOptions.data
    } : {};
    const queryParameters = {
      ...baseQueryParameters,
      ...request.queryParameters,
      ...dataQueryParameters
    };
    if (algoliaAgent.value) {
      queryParameters["x-algolia-agent"] = algoliaAgent.value;
    }
    if (requestOptions && requestOptions.queryParameters) {
      for (const key of Object.keys(requestOptions.queryParameters)) {
        if (!requestOptions.queryParameters[key] || Object.prototype.toString.call(requestOptions.queryParameters[key]) === "[object Object]") {
          queryParameters[key] = requestOptions.queryParameters[key];
        } else {
          queryParameters[key] = requestOptions.queryParameters[key].toString();
        }
      }
    }
    let timeoutsCount = 0;
    const retry = async (retryableHosts, getTimeout) => {
      const host = retryableHosts.pop();
      if (host === void 0) {
        throw new RetryError(stackTraceWithoutCredentials(stackTrace));
      }
      const timeout = { ...timeouts, ...requestOptions.timeouts };
      const payload = {
        data,
        headers,
        method: request.method,
        url: serializeUrl(host, request.path, queryParameters),
        connectTimeout: getTimeout(timeoutsCount, timeout.connect),
        responseTimeout: getTimeout(timeoutsCount, isRead ? timeout.read : timeout.write)
      };
      const pushToStackTrace = (response2) => {
        const stackFrame = {
          request: payload,
          response: response2,
          host,
          triesLeft: retryableHosts.length
        };
        stackTrace.push(stackFrame);
        return stackFrame;
      };
      const response = await requester.send(payload);
      if (isRetryable(response)) {
        const stackFrame = pushToStackTrace(response);
        if (response.isTimedOut) {
          timeoutsCount++;
        }
        logger.info("Retryable failure", stackFrameWithoutCredentials(stackFrame));
        await hostsCache.set(host, createStatefulHost(host, response.isTimedOut ? "timed out" : "down"));
        return retry(retryableHosts, getTimeout);
      }
      if (isSuccess(response)) {
        return deserializeSuccess(response);
      }
      pushToStackTrace(response);
      throw deserializeFailure(response, stackTrace);
    };
    const compatibleHosts = hosts.filter(
      (host) => host.accept === "readWrite" || (isRead ? host.accept === "read" : host.accept === "write")
    );
    const options = await createRetryableOptions(compatibleHosts);
    return retry([...options.hosts].reverse(), options.getTimeout);
  }
  function createRequest(request, requestOptions = {}) {
    const isRead = request.useReadTransporter || request.method === "GET";
    if (!isRead) {
      return retryableRequest(request, requestOptions, isRead);
    }
    const createRetryableRequest = () => {
      return retryableRequest(request, requestOptions);
    };
    const cacheable = requestOptions.cacheable || request.cacheable;
    if (cacheable !== true) {
      return createRetryableRequest();
    }
    const key = {
      request,
      requestOptions,
      transporter: {
        queryParameters: baseQueryParameters,
        headers: baseHeaders
      }
    };
    return responsesCache.get(
      key,
      () => {
        return requestsCache.get(
          key,
          () => (
            /**
             * Finally, if there is no request in progress with the same key,
             * this `createRetryableRequest()` will actually trigger the
             * retryable request.
             */
            requestsCache.set(key, createRetryableRequest()).then(
              (response) => Promise.all([requestsCache.delete(key), response]),
              (err) => Promise.all([requestsCache.delete(key), Promise.reject(err)])
            ).then(([_, response]) => response)
          )
        );
      },
      {
        /**
         * Of course, once we get this response back from the server, we
         * tell response cache to actually store the received response
         * to be used later.
         */
        miss: (response) => responsesCache.set(key, response)
      }
    );
  }
  return {
    hostsCache,
    requester,
    timeouts,
    logger,
    algoliaAgent,
    baseHeaders,
    baseQueryParameters,
    hosts,
    request: createRequest,
    requestsCache,
    responsesCache
  };
}

// src/types/logger.ts
var LogLevelEnum = {
  Debug: 1,
  Info: 2,
  Error: 3
};

//# sourceMappingURL=common.js.map

/***/ }),

/***/ "./node_modules/@algolia/client-insights/dist/builds/browser.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@algolia/client-insights/dist/builds/browser.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiClientVersion: () => (/* binding */ apiClientVersion),
/* harmony export */   insightsClient: () => (/* binding */ insightsClient)
/* harmony export */ });
/* harmony import */ var _algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/requester-browser-xhr */ "./node_modules/@algolia/requester-browser-xhr/dist/requester.xhr.js");
/* harmony import */ var _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/common.js");
// builds/browser.ts



// src/insightsClient.ts

var apiClientVersion = "5.15.0";
var REGIONS = ["de", "us"];
function getDefaultHosts(region) {
  const url = !region ? "insights.algolia.io" : "insights.{region}.algolia.io".replace("{region}", region);
  return [{ url, accept: "readWrite", protocol: "https" }];
}
function createInsightsClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  region: regionOption,
  ...options
}) {
  const auth = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createAuth)(appIdOption, apiKeyOption, authMode);
  const transporter = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createTransporter)({
    hosts: getDefaultHosts(regionOption),
    ...options,
    algoliaAgent: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.getAlgoliaAgent)({
      algoliaAgents,
      client: "Insights",
      version: apiClientVersion
    }),
    baseHeaders: {
      "content-type": "text/plain",
      ...auth.headers(),
      ...options.baseHeaders
    },
    baseQueryParameters: {
      ...auth.queryParameters(),
      ...options.baseQueryParameters
    }
  });
  return {
    transporter,
    /**
     * The `appId` currently in use.
     */
    appId: appIdOption,
    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache() {
      return Promise.all([transporter.requestsCache.clear(), transporter.responsesCache.clear()]).then(() => void 0);
    },
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return transporter.algoliaAgent.value;
    },
    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment, version) {
      transporter.algoliaAgent.add({ segment, version });
    },
    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }) {
      if (!authMode || authMode === "WithinHeaders") {
        transporter.baseHeaders["x-algolia-api-key"] = apiKey;
      } else {
        transporter.baseQueryParameters["x-algolia-api-key"] = apiKey;
      }
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customDelete({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customDelete`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customGet({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customGet`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPost`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPut({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPut`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes all events related to the specified user token from events metrics and analytics. The deletion is asynchronous, and processed within 48 hours. To delete a personalization user profile, see `Delete a user profile` in the Personalization API.
     * @param deleteUserToken - The deleteUserToken object.
     * @param deleteUserToken.userToken - User token for which to delete all associated events.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteUserToken({ userToken }, requestOptions) {
      if (!userToken) {
        throw new Error("Parameter `userToken` is required when calling `deleteUserToken`.");
      }
      const requestPath = "/1/usertokens/{userToken}".replace("{userToken}", encodeURIComponent(userToken));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Sends a list of events to the Insights API.  You can include up to 1,000 events in a single request, but the request body must be smaller than 2&nbsp;MB.
     * @param insightsEvents - The insightsEvents object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    pushEvents(insightsEvents, requestOptions) {
      if (!insightsEvents) {
        throw new Error("Parameter `insightsEvents` is required when calling `pushEvents`.");
      }
      if (!insightsEvents.events) {
        throw new Error("Parameter `insightsEvents.events` is required when calling `pushEvents`.");
      }
      const requestPath = "/1/events";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: insightsEvents
      };
      return transporter.request(request, requestOptions);
    }
  };
}

// builds/browser.ts
function insightsClient(appId, apiKey, region, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  if (region && (typeof region !== "string" || !REGIONS.includes(region))) {
    throw new Error(`\`region\` must be one of the following: ${REGIONS.join(", ")}`);
  }
  return createInsightsClient({
    appId,
    apiKey,
    region,
    timeouts: {
      connect: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_CONNECT_TIMEOUT_BROWSER,
      read: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_READ_TIMEOUT_BROWSER,
      write: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_WRITE_TIMEOUT_BROWSER
    },
    logger: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createNullLogger)(),
    requester: (0,_algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__.createXhrRequester)(),
    algoliaAgents: [{ segment: "Browser" }],
    authMode: "WithinQueryParameters",
    responsesCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)(),
    requestsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)({ serializable: false }),
    hostsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createFallbackableCache)({
      caches: [(0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createBrowserLocalStorageCache)({ key: `${apiClientVersion}-${appId}` }), (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)()]
    }),
    ...options
  });
}

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/@algolia/client-personalization/dist/builds/browser.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@algolia/client-personalization/dist/builds/browser.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiClientVersion: () => (/* binding */ apiClientVersion),
/* harmony export */   personalizationClient: () => (/* binding */ personalizationClient)
/* harmony export */ });
/* harmony import */ var _algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/requester-browser-xhr */ "./node_modules/@algolia/requester-browser-xhr/dist/requester.xhr.js");
/* harmony import */ var _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/common.js");
// builds/browser.ts



// src/personalizationClient.ts

var apiClientVersion = "5.15.0";
var REGIONS = ["eu", "us"];
function getDefaultHosts(region) {
  const url = "personalization.{region}.algolia.com".replace("{region}", region);
  return [{ url, accept: "readWrite", protocol: "https" }];
}
function createPersonalizationClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  region: regionOption,
  ...options
}) {
  const auth = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createAuth)(appIdOption, apiKeyOption, authMode);
  const transporter = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createTransporter)({
    hosts: getDefaultHosts(regionOption),
    ...options,
    algoliaAgent: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.getAlgoliaAgent)({
      algoliaAgents,
      client: "Personalization",
      version: apiClientVersion
    }),
    baseHeaders: {
      "content-type": "text/plain",
      ...auth.headers(),
      ...options.baseHeaders
    },
    baseQueryParameters: {
      ...auth.queryParameters(),
      ...options.baseQueryParameters
    }
  });
  return {
    transporter,
    /**
     * The `appId` currently in use.
     */
    appId: appIdOption,
    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache() {
      return Promise.all([transporter.requestsCache.clear(), transporter.responsesCache.clear()]).then(() => void 0);
    },
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return transporter.algoliaAgent.value;
    },
    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment, version) {
      transporter.algoliaAgent.add({ segment, version });
    },
    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }) {
      if (!authMode || authMode === "WithinHeaders") {
        transporter.baseHeaders["x-algolia-api-key"] = apiKey;
      } else {
        transporter.baseQueryParameters["x-algolia-api-key"] = apiKey;
      }
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customDelete({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customDelete`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customGet({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customGet`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPost`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPut({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPut`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a user profile.  The response includes a date and time when the user profile can safely be considered deleted.
     *
     * Required API Key ACLs:
     *  - recommendation
     * @param deleteUserProfile - The deleteUserProfile object.
     * @param deleteUserProfile.userToken - Unique identifier representing a user for which to fetch the personalization profile.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteUserProfile({ userToken }, requestOptions) {
      if (!userToken) {
        throw new Error("Parameter `userToken` is required when calling `deleteUserProfile`.");
      }
      const requestPath = "/1/profiles/{userToken}".replace("{userToken}", encodeURIComponent(userToken));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the current personalization strategy.
     *
     * Required API Key ACLs:
     *  - recommendation
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getPersonalizationStrategy(requestOptions) {
      const requestPath = "/1/strategies/personalization";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a user profile and their affinities for different facets.
     *
     * Required API Key ACLs:
     *  - recommendation
     * @param getUserTokenProfile - The getUserTokenProfile object.
     * @param getUserTokenProfile.userToken - Unique identifier representing a user for which to fetch the personalization profile.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getUserTokenProfile({ userToken }, requestOptions) {
      if (!userToken) {
        throw new Error("Parameter `userToken` is required when calling `getUserTokenProfile`.");
      }
      const requestPath = "/1/profiles/personalization/{userToken}".replace(
        "{userToken}",
        encodeURIComponent(userToken)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Creates a new personalization strategy.
     *
     * Required API Key ACLs:
     *  - recommendation
     * @param personalizationStrategyParams - The personalizationStrategyParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    setPersonalizationStrategy(personalizationStrategyParams, requestOptions) {
      if (!personalizationStrategyParams) {
        throw new Error(
          "Parameter `personalizationStrategyParams` is required when calling `setPersonalizationStrategy`."
        );
      }
      if (!personalizationStrategyParams.eventScoring) {
        throw new Error(
          "Parameter `personalizationStrategyParams.eventScoring` is required when calling `setPersonalizationStrategy`."
        );
      }
      if (!personalizationStrategyParams.facetScoring) {
        throw new Error(
          "Parameter `personalizationStrategyParams.facetScoring` is required when calling `setPersonalizationStrategy`."
        );
      }
      if (!personalizationStrategyParams.personalizationImpact) {
        throw new Error(
          "Parameter `personalizationStrategyParams.personalizationImpact` is required when calling `setPersonalizationStrategy`."
        );
      }
      const requestPath = "/1/strategies/personalization";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: personalizationStrategyParams
      };
      return transporter.request(request, requestOptions);
    }
  };
}

// builds/browser.ts
function personalizationClient(appId, apiKey, region, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  if (!region || region && (typeof region !== "string" || !REGIONS.includes(region))) {
    throw new Error(`\`region\` is required and must be one of the following: ${REGIONS.join(", ")}`);
  }
  return createPersonalizationClient({
    appId,
    apiKey,
    region,
    timeouts: {
      connect: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_CONNECT_TIMEOUT_BROWSER,
      read: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_READ_TIMEOUT_BROWSER,
      write: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_WRITE_TIMEOUT_BROWSER
    },
    logger: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createNullLogger)(),
    requester: (0,_algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__.createXhrRequester)(),
    algoliaAgents: [{ segment: "Browser" }],
    authMode: "WithinQueryParameters",
    responsesCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)(),
    requestsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)({ serializable: false }),
    hostsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createFallbackableCache)({
      caches: [(0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createBrowserLocalStorageCache)({ key: `${apiClientVersion}-${appId}` }), (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)()]
    }),
    ...options
  });
}

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/@algolia/client-query-suggestions/dist/builds/browser.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@algolia/client-query-suggestions/dist/builds/browser.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiClientVersion: () => (/* binding */ apiClientVersion),
/* harmony export */   querySuggestionsClient: () => (/* binding */ querySuggestionsClient)
/* harmony export */ });
/* harmony import */ var _algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/requester-browser-xhr */ "./node_modules/@algolia/requester-browser-xhr/dist/requester.xhr.js");
/* harmony import */ var _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/common.js");
// builds/browser.ts



// src/querySuggestionsClient.ts

var apiClientVersion = "5.15.0";
var REGIONS = ["eu", "us"];
function getDefaultHosts(region) {
  const url = "query-suggestions.{region}.algolia.com".replace("{region}", region);
  return [{ url, accept: "readWrite", protocol: "https" }];
}
function createQuerySuggestionsClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  region: regionOption,
  ...options
}) {
  const auth = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createAuth)(appIdOption, apiKeyOption, authMode);
  const transporter = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createTransporter)({
    hosts: getDefaultHosts(regionOption),
    ...options,
    algoliaAgent: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.getAlgoliaAgent)({
      algoliaAgents,
      client: "QuerySuggestions",
      version: apiClientVersion
    }),
    baseHeaders: {
      "content-type": "text/plain",
      ...auth.headers(),
      ...options.baseHeaders
    },
    baseQueryParameters: {
      ...auth.queryParameters(),
      ...options.baseQueryParameters
    }
  });
  return {
    transporter,
    /**
     * The `appId` currently in use.
     */
    appId: appIdOption,
    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache() {
      return Promise.all([transporter.requestsCache.clear(), transporter.responsesCache.clear()]).then(() => void 0);
    },
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return transporter.algoliaAgent.value;
    },
    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment, version) {
      transporter.algoliaAgent.add({ segment, version });
    },
    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }) {
      if (!authMode || authMode === "WithinHeaders") {
        transporter.baseHeaders["x-algolia-api-key"] = apiKey;
      } else {
        transporter.baseQueryParameters["x-algolia-api-key"] = apiKey;
      }
    },
    /**
     * Creates a new Query Suggestions configuration.  You can have up to 100 configurations per Algolia application.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param configurationWithIndex - The configurationWithIndex object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    createConfig(configurationWithIndex, requestOptions) {
      if (!configurationWithIndex) {
        throw new Error("Parameter `configurationWithIndex` is required when calling `createConfig`.");
      }
      const requestPath = "/1/configs";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: configurationWithIndex
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customDelete({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customDelete`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customGet({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customGet`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPost`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPut({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPut`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a Query Suggestions configuration.  Deleting only removes the configuration and stops updates to the Query Suggestions index. To delete the Query Suggestions index itself, use the Search API and the `Delete an index` operation.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteConfig - The deleteConfig object.
     * @param deleteConfig.indexName - Query Suggestions index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteConfig({ indexName }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `deleteConfig`.");
      }
      const requestPath = "/1/configs/{indexName}".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves all Query Suggestions configurations of your Algolia application.
     *
     * Required API Key ACLs:
     *  - settings
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getAllConfigs(requestOptions) {
      const requestPath = "/1/configs";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a single Query Suggestions configuration by its index name.
     *
     * Required API Key ACLs:
     *  - settings
     * @param getConfig - The getConfig object.
     * @param getConfig.indexName - Query Suggestions index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getConfig({ indexName }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `getConfig`.");
      }
      const requestPath = "/1/configs/{indexName}".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Reports the status of a Query Suggestions index.
     *
     * Required API Key ACLs:
     *  - settings
     * @param getConfigStatus - The getConfigStatus object.
     * @param getConfigStatus.indexName - Query Suggestions index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getConfigStatus({ indexName }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `getConfigStatus`.");
      }
      const requestPath = "/1/configs/{indexName}/status".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the logs for a single Query Suggestions index.
     *
     * Required API Key ACLs:
     *  - settings
     * @param getLogFile - The getLogFile object.
     * @param getLogFile.indexName - Query Suggestions index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getLogFile({ indexName }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `getLogFile`.");
      }
      const requestPath = "/1/logs/{indexName}".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Updates a QuerySuggestions configuration.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param updateConfig - The updateConfig object.
     * @param updateConfig.indexName - Query Suggestions index name.
     * @param updateConfig.configuration - The configuration object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    updateConfig({ indexName, configuration }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `updateConfig`.");
      }
      if (!configuration) {
        throw new Error("Parameter `configuration` is required when calling `updateConfig`.");
      }
      if (!configuration.sourceIndices) {
        throw new Error("Parameter `configuration.sourceIndices` is required when calling `updateConfig`.");
      }
      const requestPath = "/1/configs/{indexName}".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: configuration
      };
      return transporter.request(request, requestOptions);
    }
  };
}

// builds/browser.ts
function querySuggestionsClient(appId, apiKey, region, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  if (!region || region && (typeof region !== "string" || !REGIONS.includes(region))) {
    throw new Error(`\`region\` is required and must be one of the following: ${REGIONS.join(", ")}`);
  }
  return createQuerySuggestionsClient({
    appId,
    apiKey,
    region,
    timeouts: {
      connect: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_CONNECT_TIMEOUT_BROWSER,
      read: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_READ_TIMEOUT_BROWSER,
      write: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_WRITE_TIMEOUT_BROWSER
    },
    logger: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createNullLogger)(),
    requester: (0,_algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__.createXhrRequester)(),
    algoliaAgents: [{ segment: "Browser" }],
    authMode: "WithinQueryParameters",
    responsesCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)(),
    requestsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)({ serializable: false }),
    hostsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createFallbackableCache)({
      caches: [(0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createBrowserLocalStorageCache)({ key: `${apiClientVersion}-${appId}` }), (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)()]
    }),
    ...options
  });
}

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/@algolia/client-search/dist/builds/browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/@algolia/client-search/dist/builds/browser.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiClientVersion: () => (/* binding */ apiClientVersion),
/* harmony export */   searchClient: () => (/* binding */ searchClient)
/* harmony export */ });
/* harmony import */ var _algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/requester-browser-xhr */ "./node_modules/@algolia/requester-browser-xhr/dist/requester.xhr.js");
/* harmony import */ var _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/common.js");
// builds/browser.ts



// src/searchClient.ts

var apiClientVersion = "5.15.0";
function getDefaultHosts(appId) {
  return [
    {
      url: `${appId}-dsn.algolia.net`,
      accept: "read",
      protocol: "https"
    },
    {
      url: `${appId}.algolia.net`,
      accept: "write",
      protocol: "https"
    }
  ].concat(
    (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.shuffle)([
      {
        url: `${appId}-1.algolianet.com`,
        accept: "readWrite",
        protocol: "https"
      },
      {
        url: `${appId}-2.algolianet.com`,
        accept: "readWrite",
        protocol: "https"
      },
      {
        url: `${appId}-3.algolianet.com`,
        accept: "readWrite",
        protocol: "https"
      }
    ])
  );
}
function createSearchClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  ...options
}) {
  const auth = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createAuth)(appIdOption, apiKeyOption, authMode);
  const transporter = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createTransporter)({
    hosts: getDefaultHosts(appIdOption),
    ...options,
    algoliaAgent: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.getAlgoliaAgent)({
      algoliaAgents,
      client: "Search",
      version: apiClientVersion
    }),
    baseHeaders: {
      "content-type": "text/plain",
      ...auth.headers(),
      ...options.baseHeaders
    },
    baseQueryParameters: {
      ...auth.queryParameters(),
      ...options.baseQueryParameters
    }
  });
  return {
    transporter,
    /**
     * The `appId` currently in use.
     */
    appId: appIdOption,
    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache() {
      return Promise.all([transporter.requestsCache.clear(), transporter.responsesCache.clear()]).then(() => void 0);
    },
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return transporter.algoliaAgent.value;
    },
    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment, version) {
      transporter.algoliaAgent.add({ segment, version });
    },
    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }) {
      if (!authMode || authMode === "WithinHeaders") {
        transporter.baseHeaders["x-algolia-api-key"] = apiKey;
      } else {
        transporter.baseQueryParameters["x-algolia-api-key"] = apiKey;
      }
    },
    /**
     * Helper: Wait for a task to be published (completed) for a given `indexName` and `taskID`.
     *
     * @summary Helper method that waits for a task to be published (completed).
     * @param waitForTaskOptions - The `waitForTaskOptions` object.
     * @param waitForTaskOptions.indexName - The `indexName` where the operation was performed.
     * @param waitForTaskOptions.taskID - The `taskID` returned in the method response.
     * @param waitForTaskOptions.maxRetries - The maximum number of retries. 50 by default.
     * @param waitForTaskOptions.timeout - The function to decide how long to wait between retries.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
     */
    waitForTask({
      indexName,
      taskID,
      maxRetries = 50,
      timeout = (retryCount) => Math.min(retryCount * 200, 5e3)
    }, requestOptions) {
      let retryCount = 0;
      return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createIterablePromise)({
        func: () => this.getTask({ indexName, taskID }, requestOptions),
        validate: (response) => response.status === "published",
        aggregator: () => retryCount += 1,
        error: {
          validate: () => retryCount >= maxRetries,
          message: () => `The maximum number of retries exceeded. (${retryCount}/${maxRetries})`
        },
        timeout: () => timeout(retryCount)
      });
    },
    /**
     * Helper: Wait for an application-level task to complete for a given `taskID`.
     *
     * @summary Helper method that waits for a task to be published (completed).
     * @param waitForAppTaskOptions - The `waitForTaskOptions` object.
     * @param waitForAppTaskOptions.taskID - The `taskID` returned in the method response.
     * @param waitForAppTaskOptions.maxRetries - The maximum number of retries. 50 by default.
     * @param waitForAppTaskOptions.timeout - The function to decide how long to wait between retries.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
     */
    waitForAppTask({
      taskID,
      maxRetries = 50,
      timeout = (retryCount) => Math.min(retryCount * 200, 5e3)
    }, requestOptions) {
      let retryCount = 0;
      return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createIterablePromise)({
        func: () => this.getAppTask({ taskID }, requestOptions),
        validate: (response) => response.status === "published",
        aggregator: () => retryCount += 1,
        error: {
          validate: () => retryCount >= maxRetries,
          message: () => `The maximum number of retries exceeded. (${retryCount}/${maxRetries})`
        },
        timeout: () => timeout(retryCount)
      });
    },
    /**
     * Helper: Wait for an API key to be added, updated or deleted based on a given `operation`.
     *
     * @summary Helper method that waits for an API key task to be processed.
     * @param waitForApiKeyOptions - The `waitForApiKeyOptions` object.
     * @param waitForApiKeyOptions.operation - The `operation` that was done on a `key`.
     * @param waitForApiKeyOptions.key - The `key` that has been added, deleted or updated.
     * @param waitForApiKeyOptions.apiKey - Necessary to know if an `update` operation has been processed, compare fields of the response with it.
     * @param waitForApiKeyOptions.maxRetries - The maximum number of retries. 50 by default.
     * @param waitForApiKeyOptions.timeout - The function to decide how long to wait between retries.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getApikey` method and merged with the transporter requestOptions.
     */
    waitForApiKey({
      operation,
      key,
      apiKey,
      maxRetries = 50,
      timeout = (retryCount) => Math.min(retryCount * 200, 5e3)
    }, requestOptions) {
      let retryCount = 0;
      const baseIteratorOptions = {
        aggregator: () => retryCount += 1,
        error: {
          validate: () => retryCount >= maxRetries,
          message: () => `The maximum number of retries exceeded. (${retryCount}/${maxRetries})`
        },
        timeout: () => timeout(retryCount)
      };
      if (operation === "update") {
        if (!apiKey) {
          throw new Error("`apiKey` is required when waiting for an `update` operation.");
        }
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createIterablePromise)({
          ...baseIteratorOptions,
          func: () => this.getApiKey({ key }, requestOptions),
          validate: (response) => {
            for (const field of Object.keys(apiKey)) {
              const value = apiKey[field];
              const resValue = response[field];
              if (Array.isArray(value) && Array.isArray(resValue)) {
                if (value.length !== resValue.length || value.some((v, index) => v !== resValue[index])) {
                  return false;
                }
              } else if (value !== resValue) {
                return false;
              }
            }
            return true;
          }
        });
      }
      return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createIterablePromise)({
        ...baseIteratorOptions,
        func: () => this.getApiKey({ key }, requestOptions).catch((error) => {
          if (error.status === 404) {
            return void 0;
          }
          throw error;
        }),
        validate: (response) => operation === "add" ? response !== void 0 : response === void 0
      });
    },
    /**
     * Helper: Iterate on the `browse` method of the client to allow aggregating objects of an index.
     *
     * @summary Helper method that iterates on the `browse` method.
     * @param browseObjects - The `browseObjects` object.
     * @param browseObjects.indexName - The index in which to perform the request.
     * @param browseObjects.browseParams - The `browse` parameters.
     * @param browseObjects.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is no `cursor` in the response.
     * @param browseObjects.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `browse` method and merged with the transporter requestOptions.
     */
    browseObjects({ indexName, browseParams, ...browseObjectsOptions }, requestOptions) {
      return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createIterablePromise)({
        func: (previousResponse) => {
          return this.browse(
            {
              indexName,
              browseParams: {
                cursor: previousResponse ? previousResponse.cursor : void 0,
                hitsPerPage: 1e3,
                ...browseParams
              }
            },
            requestOptions
          );
        },
        validate: (response) => response.cursor === void 0,
        ...browseObjectsOptions
      });
    },
    /**
     * Helper: Iterate on the `searchRules` method of the client to allow aggregating rules of an index.
     *
     * @summary Helper method that iterates on the `searchRules` method.
     * @param browseRules - The `browseRules` object.
     * @param browseRules.indexName - The index in which to perform the request.
     * @param browseRules.searchRulesParams - The `searchRules` method parameters.
     * @param browseRules.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is less hits returned than the number of maximum hits (1000).
     * @param browseRules.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `searchRules` method and merged with the transporter requestOptions.
     */
    browseRules({ indexName, searchRulesParams, ...browseRulesOptions }, requestOptions) {
      const params = {
        hitsPerPage: 1e3,
        ...searchRulesParams
      };
      return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createIterablePromise)({
        func: (previousResponse) => {
          return this.searchRules(
            {
              indexName,
              searchRulesParams: {
                ...params,
                page: previousResponse ? previousResponse.page + 1 : params.page || 0
              }
            },
            requestOptions
          );
        },
        validate: (response) => response.hits.length < params.hitsPerPage,
        ...browseRulesOptions
      });
    },
    /**
     * Helper: Iterate on the `searchSynonyms` method of the client to allow aggregating rules of an index.
     *
     * @summary Helper method that iterates on the `searchSynonyms` method.
     * @param browseSynonyms - The `browseSynonyms` object.
     * @param browseSynonyms.indexName - The index in which to perform the request.
     * @param browseSynonyms.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is less hits returned than the number of maximum hits (1000).
     * @param browseSynonyms.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
     * @param browseSynonyms.searchSynonymsParams - The `searchSynonyms` method parameters.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `searchSynonyms` method and merged with the transporter requestOptions.
     */
    browseSynonyms({
      indexName,
      searchSynonymsParams,
      ...browseSynonymsOptions
    }, requestOptions) {
      const params = {
        page: 0,
        ...searchSynonymsParams,
        hitsPerPage: 1e3
      };
      return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createIterablePromise)({
        func: (_) => {
          const resp = this.searchSynonyms(
            {
              indexName,
              searchSynonymsParams: {
                ...params,
                page: params.page
              }
            },
            requestOptions
          );
          params.page += 1;
          return resp;
        },
        validate: (response) => response.hits.length < params.hitsPerPage,
        ...browseSynonymsOptions
      });
    },
    /**
     * Helper: Chunks the given `objects` list in subset of 1000 elements max in order to make it fit in `batch` requests.
     *
     * @summary Helper: Chunks the given `objects` list in subset of 1000 elements max in order to make it fit in `batch` requests.
     * @param chunkedBatch - The `chunkedBatch` object.
     * @param chunkedBatch.indexName - The `indexName` to replace `objects` in.
     * @param chunkedBatch.objects - The array of `objects` to store in the given Algolia `indexName`.
     * @param chunkedBatch.action - The `batch` `action` to perform on the given array of `objects`, defaults to `addObject`.
     * @param chunkedBatch.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     * @param chunkedBatch.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
     */
    async chunkedBatch({ indexName, objects, action = "addObject", waitForTasks, batchSize = 1e3 }, requestOptions) {
      let requests = [];
      const responses = [];
      const objectEntries = objects.entries();
      for (const [i, obj] of objectEntries) {
        requests.push({ action, body: obj });
        if (requests.length === batchSize || i === objects.length - 1) {
          responses.push(await this.batch({ indexName, batchWriteParams: { requests } }, requestOptions));
          requests = [];
        }
      }
      if (waitForTasks) {
        for (const resp of responses) {
          await this.waitForTask({ indexName, taskID: resp.taskID });
        }
      }
      return responses;
    },
    /**
     * Helper: Saves the given array of objects in the given index. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
     *
     * @summary Helper: Saves the given array of objects in the given index. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
     * @param saveObjects - The `saveObjects` object.
     * @param saveObjects.indexName - The `indexName` to save `objects` in.
     * @param saveObjects.objects - The array of `objects` to store in the given Algolia `indexName`.
     * @param saveObjects.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch` method and merged with the transporter requestOptions.
     */
    async saveObjects({ indexName, objects, waitForTasks }, requestOptions) {
      return await this.chunkedBatch({ indexName, objects, action: "addObject", waitForTasks }, requestOptions);
    },
    /**
     * Helper: Deletes every records for the given objectIDs. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objectIDs in it.
     *
     * @summary Helper: Deletes every records for the given objectIDs. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objectIDs in it.
     * @param deleteObjects - The `deleteObjects` object.
     * @param deleteObjects.indexName - The `indexName` to delete `objectIDs` from.
     * @param deleteObjects.objectIDs - The objectIDs to delete.
     * @param deleteObjects.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch` method and merged with the transporter requestOptions.
     */
    async deleteObjects({ indexName, objectIDs, waitForTasks }, requestOptions) {
      return await this.chunkedBatch(
        {
          indexName,
          objects: objectIDs.map((objectID) => ({ objectID })),
          action: "deleteObject",
          waitForTasks
        },
        requestOptions
      );
    },
    /**
     * Helper: Replaces object content of all the given objects according to their respective `objectID` field. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
     *
     * @summary Helper: Replaces object content of all the given objects according to their respective `objectID` field. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
     * @param partialUpdateObjects - The `partialUpdateObjects` object.
     * @param partialUpdateObjects.indexName - The `indexName` to update `objects` in.
     * @param partialUpdateObjects.objects - The array of `objects` to update in the given Algolia `indexName`.
     * @param partialUpdateObjects.createIfNotExists - To be provided if non-existing objects are passed, otherwise, the call will fail..
     * @param partialUpdateObjects.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
     */
    async partialUpdateObjects({ indexName, objects, createIfNotExists, waitForTasks }, requestOptions) {
      return await this.chunkedBatch(
        {
          indexName,
          objects,
          action: createIfNotExists ? "partialUpdateObject" : "partialUpdateObjectNoCreate",
          waitForTasks
        },
        requestOptions
      );
    },
    /**
     * Helper: Replaces all objects (records) in the given `index_name` with the given `objects`. A temporary index is created during this process in order to backup your data.
     * See https://api-clients-automation.netlify.app/docs/add-new-api-client#5-helpers for implementation details.
     *
     * @summary Helper: Replaces all objects (records) in the given `index_name` with the given `objects`. A temporary index is created during this process in order to backup your data.
     * @param replaceAllObjects - The `replaceAllObjects` object.
     * @param replaceAllObjects.indexName - The `indexName` to replace `objects` in.
     * @param replaceAllObjects.objects - The array of `objects` to store in the given Algolia `indexName`.
     * @param replaceAllObjects.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `objects.length / batchSize`. Defaults to 1000.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch`, `operationIndex` and `getTask` method and merged with the transporter requestOptions.
     */
    async replaceAllObjects({ indexName, objects, batchSize }, requestOptions) {
      const randomSuffix = Math.floor(Math.random() * 1e6) + 1e5;
      const tmpIndexName = `${indexName}_tmp_${randomSuffix}`;
      let copyOperationResponse = await this.operationIndex(
        {
          indexName,
          operationIndexParams: {
            operation: "copy",
            destination: tmpIndexName,
            scope: ["settings", "rules", "synonyms"]
          }
        },
        requestOptions
      );
      const batchResponses = await this.chunkedBatch(
        { indexName: tmpIndexName, objects, waitForTasks: true, batchSize },
        requestOptions
      );
      await this.waitForTask({
        indexName: tmpIndexName,
        taskID: copyOperationResponse.taskID
      });
      copyOperationResponse = await this.operationIndex(
        {
          indexName,
          operationIndexParams: {
            operation: "copy",
            destination: tmpIndexName,
            scope: ["settings", "rules", "synonyms"]
          }
        },
        requestOptions
      );
      await this.waitForTask({
        indexName: tmpIndexName,
        taskID: copyOperationResponse.taskID
      });
      const moveOperationResponse = await this.operationIndex(
        {
          indexName: tmpIndexName,
          operationIndexParams: { operation: "move", destination: indexName }
        },
        requestOptions
      );
      await this.waitForTask({
        indexName: tmpIndexName,
        taskID: moveOperationResponse.taskID
      });
      return { copyOperationResponse, batchResponses, moveOperationResponse };
    },
    async indexExists({ indexName }) {
      try {
        await this.getSettings({ indexName });
      } catch (error) {
        if (error instanceof _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.ApiError && error.status === 404) {
          return false;
        }
        throw error;
      }
      return true;
    },
    /**
     * Helper: calls the `search` method but with certainty that we will only request Algolia records (hits) and not facets.
     * Disclaimer: We don't assert that the parameters you pass to this method only contains `hits` requests to prevent impacting search performances, this helper is purely for typing purposes.
     *
     * @summary Search multiple indices for `hits`.
     * @param searchMethodParams - Query requests and strategies. Results will be received in the same order as the queries.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchForHits(searchMethodParams, requestOptions) {
      return this.search(searchMethodParams, requestOptions);
    },
    /**
     * Helper: calls the `search` method but with certainty that we will only request Algolia facets and not records (hits).
     * Disclaimer: We don't assert that the parameters you pass to this method only contains `facets` requests to prevent impacting search performances, this helper is purely for typing purposes.
     *
     * @summary Search multiple indices for `facets`.
     * @param searchMethodParams - Query requests and strategies. Results will be received in the same order as the queries.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchForFacets(searchMethodParams, requestOptions) {
      return this.search(searchMethodParams, requestOptions);
    },
    /**
     * Creates a new API key with specific permissions and restrictions.
     *
     * Required API Key ACLs:
     *  - admin
     * @param apiKey - The apiKey object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    addApiKey(apiKey, requestOptions) {
      if (!apiKey) {
        throw new Error("Parameter `apiKey` is required when calling `addApiKey`.");
      }
      if (!apiKey.acl) {
        throw new Error("Parameter `apiKey.acl` is required when calling `addApiKey`.");
      }
      const requestPath = "/1/keys";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: apiKey
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * If a record with the specified object ID exists, the existing record is replaced. Otherwise, a new record is added to the index.  To update _some_ attributes of an existing record, use the [`partial` operation](#tag/Records/operation/partialUpdateObject) instead. To add, update, or replace multiple records, use the [`batch` operation](#tag/Records/operation/batch).
     *
     * Required API Key ACLs:
     *  - addObject
     * @param addOrUpdateObject - The addOrUpdateObject object.
     * @param addOrUpdateObject.indexName - Name of the index on which to perform the operation.
     * @param addOrUpdateObject.objectID - Unique record identifier.
     * @param addOrUpdateObject.body - The record. A schemaless object with attributes that are useful in the context of search and discovery.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    addOrUpdateObject({ indexName, objectID, body }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `addOrUpdateObject`.");
      }
      if (!objectID) {
        throw new Error("Parameter `objectID` is required when calling `addOrUpdateObject`.");
      }
      if (!body) {
        throw new Error("Parameter `body` is required when calling `addOrUpdateObject`.");
      }
      const requestPath = "/1/indexes/{indexName}/{objectID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{objectID}", encodeURIComponent(objectID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: body
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Adds a source to the list of allowed sources.
     *
     * Required API Key ACLs:
     *  - admin
     * @param source - Source to add.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    appendSource(source, requestOptions) {
      if (!source) {
        throw new Error("Parameter `source` is required when calling `appendSource`.");
      }
      if (!source.source) {
        throw new Error("Parameter `source.source` is required when calling `appendSource`.");
      }
      const requestPath = "/1/security/sources/append";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: source
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Assigns or moves a user ID to a cluster.  The time it takes to move a user is proportional to the amount of data linked to the user ID.
     *
     * Required API Key ACLs:
     *  - admin
     * @param assignUserId - The assignUserId object.
     * @param assignUserId.xAlgoliaUserID - Unique identifier of the user who makes the search request.
     * @param assignUserId.assignUserIdParams - The assignUserIdParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    assignUserId({ xAlgoliaUserID, assignUserIdParams }, requestOptions) {
      if (!xAlgoliaUserID) {
        throw new Error("Parameter `xAlgoliaUserID` is required when calling `assignUserId`.");
      }
      if (!assignUserIdParams) {
        throw new Error("Parameter `assignUserIdParams` is required when calling `assignUserId`.");
      }
      if (!assignUserIdParams.cluster) {
        throw new Error("Parameter `assignUserIdParams.cluster` is required when calling `assignUserId`.");
      }
      const requestPath = "/1/clusters/mapping";
      const headers = {};
      const queryParameters = {};
      if (xAlgoliaUserID !== void 0) {
        headers["X-Algolia-User-ID"] = xAlgoliaUserID.toString();
      }
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: assignUserIdParams
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Adds, updates, or deletes records in one index with a single API request.  Batching index updates reduces latency and increases data integrity.  - Actions are applied in the order they\'re specified. - Actions are equivalent to the individual API requests of the same name.
     * @param batch - The batch object.
     * @param batch.indexName - Name of the index on which to perform the operation.
     * @param batch.batchWriteParams - The batchWriteParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    batch({ indexName, batchWriteParams }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `batch`.");
      }
      if (!batchWriteParams) {
        throw new Error("Parameter `batchWriteParams` is required when calling `batch`.");
      }
      if (!batchWriteParams.requests) {
        throw new Error("Parameter `batchWriteParams.requests` is required when calling `batch`.");
      }
      const requestPath = "/1/indexes/{indexName}/batch".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: batchWriteParams
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Assigns multiple user IDs to a cluster.  **You can\'t move users with this operation**.
     *
     * Required API Key ACLs:
     *  - admin
     * @param batchAssignUserIds - The batchAssignUserIds object.
     * @param batchAssignUserIds.xAlgoliaUserID - Unique identifier of the user who makes the search request.
     * @param batchAssignUserIds.batchAssignUserIdsParams - The batchAssignUserIdsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    batchAssignUserIds({ xAlgoliaUserID, batchAssignUserIdsParams }, requestOptions) {
      if (!xAlgoliaUserID) {
        throw new Error("Parameter `xAlgoliaUserID` is required when calling `batchAssignUserIds`.");
      }
      if (!batchAssignUserIdsParams) {
        throw new Error("Parameter `batchAssignUserIdsParams` is required when calling `batchAssignUserIds`.");
      }
      if (!batchAssignUserIdsParams.cluster) {
        throw new Error("Parameter `batchAssignUserIdsParams.cluster` is required when calling `batchAssignUserIds`.");
      }
      if (!batchAssignUserIdsParams.users) {
        throw new Error("Parameter `batchAssignUserIdsParams.users` is required when calling `batchAssignUserIds`.");
      }
      const requestPath = "/1/clusters/mapping/batch";
      const headers = {};
      const queryParameters = {};
      if (xAlgoliaUserID !== void 0) {
        headers["X-Algolia-User-ID"] = xAlgoliaUserID.toString();
      }
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: batchAssignUserIdsParams
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Adds or deletes multiple entries from your plurals, segmentation, or stop word dictionaries.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param batchDictionaryEntries - The batchDictionaryEntries object.
     * @param batchDictionaryEntries.dictionaryName - Dictionary type in which to search.
     * @param batchDictionaryEntries.batchDictionaryEntriesParams - The batchDictionaryEntriesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    batchDictionaryEntries({ dictionaryName, batchDictionaryEntriesParams }, requestOptions) {
      if (!dictionaryName) {
        throw new Error("Parameter `dictionaryName` is required when calling `batchDictionaryEntries`.");
      }
      if (!batchDictionaryEntriesParams) {
        throw new Error("Parameter `batchDictionaryEntriesParams` is required when calling `batchDictionaryEntries`.");
      }
      if (!batchDictionaryEntriesParams.requests) {
        throw new Error(
          "Parameter `batchDictionaryEntriesParams.requests` is required when calling `batchDictionaryEntries`."
        );
      }
      const requestPath = "/1/dictionaries/{dictionaryName}/batch".replace(
        "{dictionaryName}",
        encodeURIComponent(dictionaryName)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: batchDictionaryEntriesParams
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves records from an index, up to 1,000 per request.  While searching retrieves _hits_ (records augmented with attributes for highlighting and ranking details), browsing _just_ returns matching records. This can be useful if you want to export your indices.  - The Analytics API doesn\'t collect data when using `browse`. - Records are ranked by attributes and custom ranking. - There\'s no ranking for: typo-tolerance, number of matched words, proximity, geo distance.  Browse requests automatically apply these settings:  - `advancedSyntax`: `false` - `attributesToHighlight`: `[]` - `attributesToSnippet`: `[]` - `distinct`: `false` - `enablePersonalization`: `false` - `enableRules`: `false` - `facets`: `[]` - `getRankingInfo`: `false` - `ignorePlurals`: `false` - `optionalFilters`: `[]` - `typoTolerance`: `true` or `false` (`min` and `strict` evaluate to `true`)  If you send these parameters with your browse requests, they\'ll be ignored.
     *
     * Required API Key ACLs:
     *  - browse
     * @param browse - The browse object.
     * @param browse.indexName - Name of the index on which to perform the operation.
     * @param browse.browseParams - The browseParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    browse({ indexName, browseParams }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `browse`.");
      }
      const requestPath = "/1/indexes/{indexName}/browse".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: browseParams ? browseParams : {},
        useReadTransporter: true
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes only the records from an index while keeping settings, synonyms, and rules.
     *
     * Required API Key ACLs:
     *  - deleteIndex
     * @param clearObjects - The clearObjects object.
     * @param clearObjects.indexName - Name of the index on which to perform the operation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    clearObjects({ indexName }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `clearObjects`.");
      }
      const requestPath = "/1/indexes/{indexName}/clear".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes all rules from the index.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param clearRules - The clearRules object.
     * @param clearRules.indexName - Name of the index on which to perform the operation.
     * @param clearRules.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    clearRules({ indexName, forwardToReplicas }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `clearRules`.");
      }
      const requestPath = "/1/indexes/{indexName}/rules/clear".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      if (forwardToReplicas !== void 0) {
        queryParameters["forwardToReplicas"] = forwardToReplicas.toString();
      }
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes all synonyms from the index.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param clearSynonyms - The clearSynonyms object.
     * @param clearSynonyms.indexName - Name of the index on which to perform the operation.
     * @param clearSynonyms.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    clearSynonyms({ indexName, forwardToReplicas }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `clearSynonyms`.");
      }
      const requestPath = "/1/indexes/{indexName}/synonyms/clear".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      if (forwardToReplicas !== void 0) {
        queryParameters["forwardToReplicas"] = forwardToReplicas.toString();
      }
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customDelete({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customDelete`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customGet({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customGet`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPost`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPut({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPut`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes the API key.
     *
     * Required API Key ACLs:
     *  - admin
     * @param deleteApiKey - The deleteApiKey object.
     * @param deleteApiKey.key - API key.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteApiKey({ key }, requestOptions) {
      if (!key) {
        throw new Error("Parameter `key` is required when calling `deleteApiKey`.");
      }
      const requestPath = "/1/keys/{key}".replace("{key}", encodeURIComponent(key));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This operation doesn\'t accept empty queries or filters.  It\'s more efficient to get a list of object IDs with the [`browse` operation](#tag/Search/operation/browse), and then delete the records using the [`batch` operation](#tag/Records/operation/batch).
     *
     * Required API Key ACLs:
     *  - deleteIndex
     * @param deleteBy - The deleteBy object.
     * @param deleteBy.indexName - Name of the index on which to perform the operation.
     * @param deleteBy.deleteByParams - The deleteByParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteBy({ indexName, deleteByParams }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `deleteBy`.");
      }
      if (!deleteByParams) {
        throw new Error("Parameter `deleteByParams` is required when calling `deleteBy`.");
      }
      const requestPath = "/1/indexes/{indexName}/deleteByQuery".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: deleteByParams
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes an index and all its settings.  - Deleting an index doesn\'t delete its analytics data. - If you try to delete a non-existing index, the operation is ignored without warning. - If the index you want to delete has replica indices, the replicas become independent indices. - If the index you want to delete is a replica index, you must first unlink it from its primary index before you can delete it.   For more information, see [Delete replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/deleting-replicas/).
     *
     * Required API Key ACLs:
     *  - deleteIndex
     * @param deleteIndex - The deleteIndex object.
     * @param deleteIndex.indexName - Name of the index on which to perform the operation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteIndex({ indexName }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `deleteIndex`.");
      }
      const requestPath = "/1/indexes/{indexName}".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a record by its object ID.  To delete more than one record, use the [`batch` operation](#tag/Records/operation/batch). To delete records matching a query, use the [`deleteByQuery` operation](#tag/Records/operation/deleteBy).
     *
     * Required API Key ACLs:
     *  - deleteObject
     * @param deleteObject - The deleteObject object.
     * @param deleteObject.indexName - Name of the index on which to perform the operation.
     * @param deleteObject.objectID - Unique record identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteObject({ indexName, objectID }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `deleteObject`.");
      }
      if (!objectID) {
        throw new Error("Parameter `objectID` is required when calling `deleteObject`.");
      }
      const requestPath = "/1/indexes/{indexName}/{objectID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{objectID}", encodeURIComponent(objectID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a rule by its ID. To find the object ID for rules, use the [`search` operation](#tag/Rules/operation/searchRules).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteRule - The deleteRule object.
     * @param deleteRule.indexName - Name of the index on which to perform the operation.
     * @param deleteRule.objectID - Unique identifier of a rule object.
     * @param deleteRule.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteRule({ indexName, objectID, forwardToReplicas }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `deleteRule`.");
      }
      if (!objectID) {
        throw new Error("Parameter `objectID` is required when calling `deleteRule`.");
      }
      const requestPath = "/1/indexes/{indexName}/rules/{objectID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{objectID}", encodeURIComponent(objectID));
      const headers = {};
      const queryParameters = {};
      if (forwardToReplicas !== void 0) {
        queryParameters["forwardToReplicas"] = forwardToReplicas.toString();
      }
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a source from the list of allowed sources.
     *
     * Required API Key ACLs:
     *  - admin
     * @param deleteSource - The deleteSource object.
     * @param deleteSource.source - IP address range of the source.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteSource({ source }, requestOptions) {
      if (!source) {
        throw new Error("Parameter `source` is required when calling `deleteSource`.");
      }
      const requestPath = "/1/security/sources/{source}".replace("{source}", encodeURIComponent(source));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a synonym by its ID. To find the object IDs of your synonyms, use the [`search` operation](#tag/Synonyms/operation/searchSynonyms).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteSynonym - The deleteSynonym object.
     * @param deleteSynonym.indexName - Name of the index on which to perform the operation.
     * @param deleteSynonym.objectID - Unique identifier of a synonym object.
     * @param deleteSynonym.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteSynonym({ indexName, objectID, forwardToReplicas }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `deleteSynonym`.");
      }
      if (!objectID) {
        throw new Error("Parameter `objectID` is required when calling `deleteSynonym`.");
      }
      const requestPath = "/1/indexes/{indexName}/synonyms/{objectID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{objectID}", encodeURIComponent(objectID));
      const headers = {};
      const queryParameters = {};
      if (forwardToReplicas !== void 0) {
        queryParameters["forwardToReplicas"] = forwardToReplicas.toString();
      }
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Gets the permissions and restrictions of an API key.  When authenticating with the admin API key, you can request information for any of your application\'s keys. When authenticating with other API keys, you can only retrieve information for that key, with the description replaced by `<redacted>`.
     * @param getApiKey - The getApiKey object.
     * @param getApiKey.key - API key.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getApiKey({ key }, requestOptions) {
      if (!key) {
        throw new Error("Parameter `key` is required when calling `getApiKey`.");
      }
      const requestPath = "/1/keys/{key}".replace("{key}", encodeURIComponent(key));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Checks the status of a given application task.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param getAppTask - The getAppTask object.
     * @param getAppTask.taskID - Unique task identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getAppTask({ taskID }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `getAppTask`.");
      }
      const requestPath = "/1/task/{taskID}".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Lists supported languages with their supported dictionary types and number of custom entries.
     *
     * Required API Key ACLs:
     *  - settings
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getDictionaryLanguages(requestOptions) {
      const requestPath = "/1/dictionaries/*/languages";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the languages for which standard dictionary entries are turned off.
     *
     * Required API Key ACLs:
     *  - settings
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getDictionarySettings(requestOptions) {
      const requestPath = "/1/dictionaries/*/settings";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * The request must be authenticated by an API key with the [`logs` ACL](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).  - Logs are held for the last seven days. - Up to 1,000 API requests per server are logged. - This request counts towards your [operations quota](https://support.algolia.com/hc/en-us/articles/4406981829777-How-does-Algolia-count-records-and-operations-) but doesn\'t appear in the logs itself.
     *
     * Required API Key ACLs:
     *  - logs
     * @param getLogs - The getLogs object.
     * @param getLogs.offset - First log entry to retrieve. The most recent entries are listed first.
     * @param getLogs.length - Maximum number of entries to retrieve.
     * @param getLogs.indexName - Index for which to retrieve log entries. By default, log entries are retrieved for all indices.
     * @param getLogs.type - Type of log entries to retrieve. By default, all log entries are retrieved.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getLogs({ offset, length, indexName, type } = {}, requestOptions = void 0) {
      const requestPath = "/1/logs";
      const headers = {};
      const queryParameters = {};
      if (offset !== void 0) {
        queryParameters["offset"] = offset.toString();
      }
      if (length !== void 0) {
        queryParameters["length"] = length.toString();
      }
      if (indexName !== void 0) {
        queryParameters["indexName"] = indexName.toString();
      }
      if (type !== void 0) {
        queryParameters["type"] = type.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves one record by its object ID.  To retrieve more than one record, use the [`objects` operation](#tag/Records/operation/getObjects).
     *
     * Required API Key ACLs:
     *  - search
     * @param getObject - The getObject object.
     * @param getObject.indexName - Name of the index on which to perform the operation.
     * @param getObject.objectID - Unique record identifier.
     * @param getObject.attributesToRetrieve - Attributes to include with the records in the response. This is useful to reduce the size of the API response. By default, all retrievable attributes are returned.  `objectID` is always retrieved.  Attributes included in `unretrievableAttributes` won\'t be retrieved unless the request is authenticated with the admin API key.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getObject({ indexName, objectID, attributesToRetrieve }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `getObject`.");
      }
      if (!objectID) {
        throw new Error("Parameter `objectID` is required when calling `getObject`.");
      }
      const requestPath = "/1/indexes/{indexName}/{objectID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{objectID}", encodeURIComponent(objectID));
      const headers = {};
      const queryParameters = {};
      if (attributesToRetrieve !== void 0) {
        queryParameters["attributesToRetrieve"] = attributesToRetrieve.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves one or more records, potentially from different indices.  Records are returned in the same order as the requests.
     *
     * Required API Key ACLs:
     *  - search
     * @param getObjectsParams - Request object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getObjects(getObjectsParams, requestOptions) {
      if (!getObjectsParams) {
        throw new Error("Parameter `getObjectsParams` is required when calling `getObjects`.");
      }
      if (!getObjectsParams.requests) {
        throw new Error("Parameter `getObjectsParams.requests` is required when calling `getObjects`.");
      }
      const requestPath = "/1/indexes/*/objects";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: getObjectsParams,
        useReadTransporter: true,
        cacheable: true
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a rule by its ID. To find the object ID of rules, use the [`search` operation](#tag/Rules/operation/searchRules).
     *
     * Required API Key ACLs:
     *  - settings
     * @param getRule - The getRule object.
     * @param getRule.indexName - Name of the index on which to perform the operation.
     * @param getRule.objectID - Unique identifier of a rule object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getRule({ indexName, objectID }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `getRule`.");
      }
      if (!objectID) {
        throw new Error("Parameter `objectID` is required when calling `getRule`.");
      }
      const requestPath = "/1/indexes/{indexName}/rules/{objectID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{objectID}", encodeURIComponent(objectID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves an object with non-null index settings.
     *
     * Required API Key ACLs:
     *  - search
     * @param getSettings - The getSettings object.
     * @param getSettings.indexName - Name of the index on which to perform the operation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSettings({ indexName }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `getSettings`.");
      }
      const requestPath = "/1/indexes/{indexName}/settings".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves all allowed IP addresses with access to your application.
     *
     * Required API Key ACLs:
     *  - admin
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSources(requestOptions) {
      const requestPath = "/1/security/sources";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a synonym by its ID. To find the object IDs for your synonyms, use the [`search` operation](#tag/Synonyms/operation/searchSynonyms).
     *
     * Required API Key ACLs:
     *  - settings
     * @param getSynonym - The getSynonym object.
     * @param getSynonym.indexName - Name of the index on which to perform the operation.
     * @param getSynonym.objectID - Unique identifier of a synonym object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSynonym({ indexName, objectID }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `getSynonym`.");
      }
      if (!objectID) {
        throw new Error("Parameter `objectID` is required when calling `getSynonym`.");
      }
      const requestPath = "/1/indexes/{indexName}/synonyms/{objectID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{objectID}", encodeURIComponent(objectID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Checks the status of a given task.  Indexing tasks are asynchronous. When you add, update, or delete records or indices, a task is created on a queue and completed depending on the load on the server.  The indexing tasks\' responses include a task ID that you can use to check the status.
     *
     * Required API Key ACLs:
     *  - addObject
     * @param getTask - The getTask object.
     * @param getTask.indexName - Name of the index on which to perform the operation.
     * @param getTask.taskID - Unique task identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTask({ indexName, taskID }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `getTask`.");
      }
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `getTask`.");
      }
      const requestPath = "/1/indexes/{indexName}/task/{taskID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Get the IDs of the 10 users with the highest number of records per cluster.  Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.
     *
     * Required API Key ACLs:
     *  - admin
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTopUserIds(requestOptions) {
      const requestPath = "/1/clusters/mapping/top";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Returns the user ID data stored in the mapping.  Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.
     *
     * Required API Key ACLs:
     *  - admin
     * @param getUserId - The getUserId object.
     * @param getUserId.userID - Unique identifier of the user who makes the search request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getUserId({ userID }, requestOptions) {
      if (!userID) {
        throw new Error("Parameter `userID` is required when calling `getUserId`.");
      }
      const requestPath = "/1/clusters/mapping/{userID}".replace("{userID}", encodeURIComponent(userID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * To determine when the time-consuming process of creating a large batch of users or migrating users from one cluster to another is complete, this operation retrieves the status of the process.
     *
     * Required API Key ACLs:
     *  - admin
     * @param hasPendingMappings - The hasPendingMappings object.
     * @param hasPendingMappings.getClusters - Whether to include the cluster\'s pending mapping state in the response.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    hasPendingMappings({ getClusters } = {}, requestOptions = void 0) {
      const requestPath = "/1/clusters/mapping/pending";
      const headers = {};
      const queryParameters = {};
      if (getClusters !== void 0) {
        queryParameters["getClusters"] = getClusters.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Lists all API keys associated with your Algolia application, including their permissions and restrictions.
     *
     * Required API Key ACLs:
     *  - admin
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listApiKeys(requestOptions) {
      const requestPath = "/1/keys";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Lists the available clusters in a multi-cluster setup.
     *
     * Required API Key ACLs:
     *  - admin
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listClusters(requestOptions) {
      const requestPath = "/1/clusters";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Lists all indices in the current Algolia application.  The request follows any index restrictions of the API key you use to make the request.
     *
     * Required API Key ACLs:
     *  - listIndexes
     * @param listIndices - The listIndices object.
     * @param listIndices.page - Requested page of the API response. If `null`, the API response is not paginated.
     * @param listIndices.hitsPerPage - Number of hits per page.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listIndices({ page, hitsPerPage } = {}, requestOptions = void 0) {
      const requestPath = "/1/indexes";
      const headers = {};
      const queryParameters = {};
      if (page !== void 0) {
        queryParameters["page"] = page.toString();
      }
      if (hitsPerPage !== void 0) {
        queryParameters["hitsPerPage"] = hitsPerPage.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Lists the userIDs assigned to a multi-cluster application.  Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.
     *
     * Required API Key ACLs:
     *  - admin
     * @param listUserIds - The listUserIds object.
     * @param listUserIds.page - Requested page of the API response. If `null`, the API response is not paginated.
     * @param listUserIds.hitsPerPage - Number of hits per page.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listUserIds({ page, hitsPerPage } = {}, requestOptions = void 0) {
      const requestPath = "/1/clusters/mapping";
      const headers = {};
      const queryParameters = {};
      if (page !== void 0) {
        queryParameters["page"] = page.toString();
      }
      if (hitsPerPage !== void 0) {
        queryParameters["hitsPerPage"] = hitsPerPage.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Adds, updates, or deletes records in multiple indices with a single API request.  - Actions are applied in the order they are specified. - Actions are equivalent to the individual API requests of the same name.
     * @param batchParams - The batchParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    multipleBatch(batchParams, requestOptions) {
      if (!batchParams) {
        throw new Error("Parameter `batchParams` is required when calling `multipleBatch`.");
      }
      if (!batchParams.requests) {
        throw new Error("Parameter `batchParams.requests` is required when calling `multipleBatch`.");
      }
      const requestPath = "/1/indexes/*/batch";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: batchParams
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Copies or moves (renames) an index within the same Algolia application.  - Existing destination indices are overwritten, except for their analytics data. - If the destination index doesn\'t exist yet, it\'ll be created.  **Copy**  - Copying a source index that doesn\'t exist creates a new index with 0 records and default settings. - The API keys of the source index are merged with the existing keys in the destination index. - You can\'t copy the `enableReRanking`, `mode`, and `replicas` settings. - You can\'t copy to a destination index that already has replicas. - Be aware of the [size limits](https://www.algolia.com/doc/guides/scaling/algolia-service-limits/#application-record-and-index-limits). - Related guide: [Copy indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/copy-indices/)  **Move**  - Moving a source index that doesn\'t exist is ignored without returning an error. - When moving an index, the analytics data keeps its original name, and a new set of analytics data is started for the new name.   To access the original analytics in the dashboard, create an index with the original name. - If the destination index has replicas, moving will overwrite the existing index and copy the data to the replica indices. - Related guide: [Move indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/move-indices/).
     *
     * Required API Key ACLs:
     *  - addObject
     * @param operationIndex - The operationIndex object.
     * @param operationIndex.indexName - Name of the index on which to perform the operation.
     * @param operationIndex.operationIndexParams - The operationIndexParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    operationIndex({ indexName, operationIndexParams }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `operationIndex`.");
      }
      if (!operationIndexParams) {
        throw new Error("Parameter `operationIndexParams` is required when calling `operationIndex`.");
      }
      if (!operationIndexParams.operation) {
        throw new Error("Parameter `operationIndexParams.operation` is required when calling `operationIndex`.");
      }
      if (!operationIndexParams.destination) {
        throw new Error("Parameter `operationIndexParams.destination` is required when calling `operationIndex`.");
      }
      const requestPath = "/1/indexes/{indexName}/operation".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: operationIndexParams
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Adds new attributes to a record, or updates existing ones.  - If a record with the specified object ID doesn\'t exist,   a new record is added to the index **if** `createIfNotExists` is true. - If the index doesn\'t exist yet, this method creates a new index. - You can use any first-level attribute but not nested attributes.   If you specify a nested attribute, the engine treats it as a replacement for its first-level ancestor.  To update an attribute without pushing the entire record, you can use these built-in operations. These operations can be helpful if you don\'t have access to your initial data.  - Increment: increment a numeric attribute - Decrement: decrement a numeric attribute - Add: append a number or string element to an array attribute - Remove: remove all matching number or string elements from an array attribute made of numbers or strings - AddUnique: add a number or string element to an array attribute made of numbers or strings only if it\'s not already present - IncrementFrom: increment a numeric integer attribute only if the provided value matches the current value, and otherwise ignore the whole object update. For example, if you pass an IncrementFrom value of 2 for the version attribute, but the current value of the attribute is 1, the engine ignores the update. If the object doesn\'t exist, the engine only creates it if you pass an IncrementFrom value of 0. - IncrementSet: increment a numeric integer attribute only if the provided value is greater than the current value, and otherwise ignore the whole object update. For example, if you pass an IncrementSet value of 2 for the version attribute, and the current value of the attribute is 1, the engine updates the object. If the object doesn\'t exist yet, the engine only creates it if you pass an IncrementSet value greater than 0.  You can specify an operation by providing an object with the attribute to update as the key and its value being an object with the following properties:  - _operation: the operation to apply on the attribute - value: the right-hand side argument to the operation, for example, increment or decrement step, value to add or remove.
     *
     * Required API Key ACLs:
     *  - addObject
     * @param partialUpdateObject - The partialUpdateObject object.
     * @param partialUpdateObject.indexName - Name of the index on which to perform the operation.
     * @param partialUpdateObject.objectID - Unique record identifier.
     * @param partialUpdateObject.attributesToUpdate - Attributes with their values.
     * @param partialUpdateObject.createIfNotExists - Whether to create a new record if it doesn\'t exist.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    partialUpdateObject({ indexName, objectID, attributesToUpdate, createIfNotExists }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `partialUpdateObject`.");
      }
      if (!objectID) {
        throw new Error("Parameter `objectID` is required when calling `partialUpdateObject`.");
      }
      if (!attributesToUpdate) {
        throw new Error("Parameter `attributesToUpdate` is required when calling `partialUpdateObject`.");
      }
      const requestPath = "/1/indexes/{indexName}/{objectID}/partial".replace("{indexName}", encodeURIComponent(indexName)).replace("{objectID}", encodeURIComponent(objectID));
      const headers = {};
      const queryParameters = {};
      if (createIfNotExists !== void 0) {
        queryParameters["createIfNotExists"] = createIfNotExists.toString();
      }
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: attributesToUpdate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a user ID and its associated data from the clusters.
     *
     * Required API Key ACLs:
     *  - admin
     * @param removeUserId - The removeUserId object.
     * @param removeUserId.userID - Unique identifier of the user who makes the search request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    removeUserId({ userID }, requestOptions) {
      if (!userID) {
        throw new Error("Parameter `userID` is required when calling `removeUserId`.");
      }
      const requestPath = "/1/clusters/mapping/{userID}".replace("{userID}", encodeURIComponent(userID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Replaces the list of allowed sources.
     *
     * Required API Key ACLs:
     *  - admin
     * @param replaceSources - The replaceSources object.
     * @param replaceSources.source - Allowed sources.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    replaceSources({ source }, requestOptions) {
      if (!source) {
        throw new Error("Parameter `source` is required when calling `replaceSources`.");
      }
      const requestPath = "/1/security/sources";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: source
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Restores a deleted API key.  Restoring resets the `validity` attribute to `0`.  Algolia stores up to 1,000 API keys per application. If you create more, the oldest API keys are deleted and can\'t be restored.
     *
     * Required API Key ACLs:
     *  - admin
     * @param restoreApiKey - The restoreApiKey object.
     * @param restoreApiKey.key - API key.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    restoreApiKey({ key }, requestOptions) {
      if (!key) {
        throw new Error("Parameter `key` is required when calling `restoreApiKey`.");
      }
      const requestPath = "/1/keys/{key}/restore".replace("{key}", encodeURIComponent(key));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Adds a record to an index or replace it.  - If the record doesn\'t have an object ID, a new record with an auto-generated object ID is added to your index. - If a record with the specified object ID exists, the existing record is replaced. - If a record with the specified object ID doesn\'t exist, a new record is added to your index. - If you add a record to an index that doesn\'t exist yet, a new index is created.  To update _some_ attributes of a record, use the [`partial` operation](#tag/Records/operation/partialUpdateObject). To add, update, or replace multiple records, use the [`batch` operation](#tag/Records/operation/batch).
     *
     * Required API Key ACLs:
     *  - addObject
     * @param saveObject - The saveObject object.
     * @param saveObject.indexName - Name of the index on which to perform the operation.
     * @param saveObject.body - The record. A schemaless object with attributes that are useful in the context of search and discovery.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveObject({ indexName, body }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `saveObject`.");
      }
      if (!body) {
        throw new Error("Parameter `body` is required when calling `saveObject`.");
      }
      const requestPath = "/1/indexes/{indexName}".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: body
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * If a rule with the specified object ID doesn\'t exist, it\'s created. Otherwise, the existing rule is replaced.  To create or update more than one rule, use the [`batch` operation](#tag/Rules/operation/saveRules).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param saveRule - The saveRule object.
     * @param saveRule.indexName - Name of the index on which to perform the operation.
     * @param saveRule.objectID - Unique identifier of a rule object.
     * @param saveRule.rule - The rule object.
     * @param saveRule.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveRule({ indexName, objectID, rule, forwardToReplicas }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `saveRule`.");
      }
      if (!objectID) {
        throw new Error("Parameter `objectID` is required when calling `saveRule`.");
      }
      if (!rule) {
        throw new Error("Parameter `rule` is required when calling `saveRule`.");
      }
      if (!rule.objectID) {
        throw new Error("Parameter `rule.objectID` is required when calling `saveRule`.");
      }
      const requestPath = "/1/indexes/{indexName}/rules/{objectID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{objectID}", encodeURIComponent(objectID));
      const headers = {};
      const queryParameters = {};
      if (forwardToReplicas !== void 0) {
        queryParameters["forwardToReplicas"] = forwardToReplicas.toString();
      }
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: rule
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Create or update multiple rules.  If a rule with the specified object ID doesn\'t exist, Algolia creates a new one. Otherwise, existing rules are replaced.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param saveRules - The saveRules object.
     * @param saveRules.indexName - Name of the index on which to perform the operation.
     * @param saveRules.rules - The rules object.
     * @param saveRules.forwardToReplicas - Whether changes are applied to replica indices.
     * @param saveRules.clearExistingRules - Whether existing rules should be deleted before adding this batch.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveRules({ indexName, rules, forwardToReplicas, clearExistingRules }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `saveRules`.");
      }
      if (!rules) {
        throw new Error("Parameter `rules` is required when calling `saveRules`.");
      }
      const requestPath = "/1/indexes/{indexName}/rules/batch".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      if (forwardToReplicas !== void 0) {
        queryParameters["forwardToReplicas"] = forwardToReplicas.toString();
      }
      if (clearExistingRules !== void 0) {
        queryParameters["clearExistingRules"] = clearExistingRules.toString();
      }
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: rules
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * If a synonym with the specified object ID doesn\'t exist, Algolia adds a new one. Otherwise, the existing synonym is replaced. To add multiple synonyms in a single API request, use the [`batch` operation](#tag/Synonyms/operation/saveSynonyms).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param saveSynonym - The saveSynonym object.
     * @param saveSynonym.indexName - Name of the index on which to perform the operation.
     * @param saveSynonym.objectID - Unique identifier of a synonym object.
     * @param saveSynonym.synonymHit - The synonymHit object.
     * @param saveSynonym.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveSynonym({ indexName, objectID, synonymHit, forwardToReplicas }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `saveSynonym`.");
      }
      if (!objectID) {
        throw new Error("Parameter `objectID` is required when calling `saveSynonym`.");
      }
      if (!synonymHit) {
        throw new Error("Parameter `synonymHit` is required when calling `saveSynonym`.");
      }
      if (!synonymHit.objectID) {
        throw new Error("Parameter `synonymHit.objectID` is required when calling `saveSynonym`.");
      }
      if (!synonymHit.type) {
        throw new Error("Parameter `synonymHit.type` is required when calling `saveSynonym`.");
      }
      const requestPath = "/1/indexes/{indexName}/synonyms/{objectID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{objectID}", encodeURIComponent(objectID));
      const headers = {};
      const queryParameters = {};
      if (forwardToReplicas !== void 0) {
        queryParameters["forwardToReplicas"] = forwardToReplicas.toString();
      }
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: synonymHit
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * If a synonym with the `objectID` doesn\'t exist, Algolia adds a new one. Otherwise, existing synonyms are replaced.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param saveSynonyms - The saveSynonyms object.
     * @param saveSynonyms.indexName - Name of the index on which to perform the operation.
     * @param saveSynonyms.synonymHit - The synonymHit object.
     * @param saveSynonyms.forwardToReplicas - Whether changes are applied to replica indices.
     * @param saveSynonyms.replaceExistingSynonyms - Whether to replace all synonyms in the index with the ones sent with this request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    saveSynonyms({ indexName, synonymHit, forwardToReplicas, replaceExistingSynonyms }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `saveSynonyms`.");
      }
      if (!synonymHit) {
        throw new Error("Parameter `synonymHit` is required when calling `saveSynonyms`.");
      }
      const requestPath = "/1/indexes/{indexName}/synonyms/batch".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      if (forwardToReplicas !== void 0) {
        queryParameters["forwardToReplicas"] = forwardToReplicas.toString();
      }
      if (replaceExistingSynonyms !== void 0) {
        queryParameters["replaceExistingSynonyms"] = replaceExistingSynonyms.toString();
      }
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: synonymHit
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Sends multiple search requests to one or more indices.  This can be useful in these cases:  - Different indices for different purposes, such as, one index for products, another one for marketing content. - Multiple searches to the same index—for example, with different filters.
     *
     * Required API Key ACLs:
     *  - search
     * @param searchMethodParams - Muli-search request body. Results are returned in the same order as the requests.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    search(searchMethodParams, requestOptions) {
      if (searchMethodParams && Array.isArray(searchMethodParams)) {
        const newSignatureRequest = {
          requests: searchMethodParams.map(({ params, ...legacyRequest }) => {
            if (legacyRequest.type === "facet") {
              return {
                ...legacyRequest,
                ...params,
                type: "facet"
              };
            }
            return {
              ...legacyRequest,
              ...params,
              facet: void 0,
              maxFacetHits: void 0,
              facetQuery: void 0
            };
          })
        };
        searchMethodParams = newSignatureRequest;
      }
      if (!searchMethodParams) {
        throw new Error("Parameter `searchMethodParams` is required when calling `search`.");
      }
      if (!searchMethodParams.requests) {
        throw new Error("Parameter `searchMethodParams.requests` is required when calling `search`.");
      }
      const requestPath = "/1/indexes/*/queries";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: searchMethodParams,
        useReadTransporter: true,
        cacheable: true
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Searches for standard and custom dictionary entries.
     *
     * Required API Key ACLs:
     *  - settings
     * @param searchDictionaryEntries - The searchDictionaryEntries object.
     * @param searchDictionaryEntries.dictionaryName - Dictionary type in which to search.
     * @param searchDictionaryEntries.searchDictionaryEntriesParams - The searchDictionaryEntriesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchDictionaryEntries({ dictionaryName, searchDictionaryEntriesParams }, requestOptions) {
      if (!dictionaryName) {
        throw new Error("Parameter `dictionaryName` is required when calling `searchDictionaryEntries`.");
      }
      if (!searchDictionaryEntriesParams) {
        throw new Error(
          "Parameter `searchDictionaryEntriesParams` is required when calling `searchDictionaryEntries`."
        );
      }
      if (!searchDictionaryEntriesParams.query) {
        throw new Error(
          "Parameter `searchDictionaryEntriesParams.query` is required when calling `searchDictionaryEntries`."
        );
      }
      const requestPath = "/1/dictionaries/{dictionaryName}/search".replace(
        "{dictionaryName}",
        encodeURIComponent(dictionaryName)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: searchDictionaryEntriesParams,
        useReadTransporter: true,
        cacheable: true
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Searches for values of a specified facet attribute.  - By default, facet values are sorted by decreasing count.   You can adjust this with the `sortFacetValueBy` parameter. - Searching for facet values doesn\'t work if you have **more than 65 searchable facets and searchable attributes combined**.
     *
     * Required API Key ACLs:
     *  - search
     * @param searchForFacetValues - The searchForFacetValues object.
     * @param searchForFacetValues.indexName - Name of the index on which to perform the operation.
     * @param searchForFacetValues.facetName - Facet attribute in which to search for values.  This attribute must be included in the `attributesForFaceting` index setting with the `searchable()` modifier.
     * @param searchForFacetValues.searchForFacetValuesRequest - The searchForFacetValuesRequest object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchForFacetValues({ indexName, facetName, searchForFacetValuesRequest }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `searchForFacetValues`.");
      }
      if (!facetName) {
        throw new Error("Parameter `facetName` is required when calling `searchForFacetValues`.");
      }
      const requestPath = "/1/indexes/{indexName}/facets/{facetName}/query".replace("{indexName}", encodeURIComponent(indexName)).replace("{facetName}", encodeURIComponent(facetName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: searchForFacetValuesRequest ? searchForFacetValuesRequest : {},
        useReadTransporter: true,
        cacheable: true
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Searches for rules in your index.
     *
     * Required API Key ACLs:
     *  - settings
     * @param searchRules - The searchRules object.
     * @param searchRules.indexName - Name of the index on which to perform the operation.
     * @param searchRules.searchRulesParams - The searchRulesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchRules({ indexName, searchRulesParams }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `searchRules`.");
      }
      const requestPath = "/1/indexes/{indexName}/rules/search".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: searchRulesParams ? searchRulesParams : {},
        useReadTransporter: true,
        cacheable: true
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Searches a single index and returns matching search results (_hits_).  This method lets you retrieve up to 1,000 hits. If you need more, use the [`browse` operation](#tag/Search/operation/browse) or increase the `paginatedLimitedTo` index setting.
     *
     * Required API Key ACLs:
     *  - search
     * @param searchSingleIndex - The searchSingleIndex object.
     * @param searchSingleIndex.indexName - Name of the index on which to perform the operation.
     * @param searchSingleIndex.searchParams - The searchParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchSingleIndex({ indexName, searchParams }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `searchSingleIndex`.");
      }
      const requestPath = "/1/indexes/{indexName}/query".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: searchParams ? searchParams : {},
        useReadTransporter: true,
        cacheable: true
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Searches for synonyms in your index.
     *
     * Required API Key ACLs:
     *  - settings
     * @param searchSynonyms - The searchSynonyms object.
     * @param searchSynonyms.indexName - Name of the index on which to perform the operation.
     * @param searchSynonyms.searchSynonymsParams - Body of the `searchSynonyms` operation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchSynonyms({ indexName, searchSynonymsParams }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `searchSynonyms`.");
      }
      const requestPath = "/1/indexes/{indexName}/synonyms/search".replace(
        "{indexName}",
        encodeURIComponent(indexName)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: searchSynonymsParams ? searchSynonymsParams : {},
        useReadTransporter: true,
        cacheable: true
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.  To ensure rapid updates, the user IDs index isn\'t built at the same time as the mapping. Instead, it\'s built every 12 hours, at the same time as the update of user ID usage. For example, if you add or move a user ID, the search will show an old value until the next time the mapping is rebuilt (every 12 hours).
     *
     * Required API Key ACLs:
     *  - admin
     * @param searchUserIdsParams - The searchUserIdsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchUserIds(searchUserIdsParams, requestOptions) {
      if (!searchUserIdsParams) {
        throw new Error("Parameter `searchUserIdsParams` is required when calling `searchUserIds`.");
      }
      if (!searchUserIdsParams.query) {
        throw new Error("Parameter `searchUserIdsParams.query` is required when calling `searchUserIds`.");
      }
      const requestPath = "/1/clusters/mapping/search";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: searchUserIdsParams,
        useReadTransporter: true,
        cacheable: true
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Turns standard stop word dictionary entries on or off for a given language.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param dictionarySettingsParams - The dictionarySettingsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    setDictionarySettings(dictionarySettingsParams, requestOptions) {
      if (!dictionarySettingsParams) {
        throw new Error("Parameter `dictionarySettingsParams` is required when calling `setDictionarySettings`.");
      }
      if (!dictionarySettingsParams.disableStandardEntries) {
        throw new Error(
          "Parameter `dictionarySettingsParams.disableStandardEntries` is required when calling `setDictionarySettings`."
        );
      }
      const requestPath = "/1/dictionaries/*/settings";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: dictionarySettingsParams
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Update the specified index settings.  Index settings that you don\'t specify are left unchanged. Specify `null` to reset a setting to its default value.  For best performance, update the index settings before you add new records to your index.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param setSettings - The setSettings object.
     * @param setSettings.indexName - Name of the index on which to perform the operation.
     * @param setSettings.indexSettings - The indexSettings object.
     * @param setSettings.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    setSettings({ indexName, indexSettings, forwardToReplicas }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `setSettings`.");
      }
      if (!indexSettings) {
        throw new Error("Parameter `indexSettings` is required when calling `setSettings`.");
      }
      const requestPath = "/1/indexes/{indexName}/settings".replace("{indexName}", encodeURIComponent(indexName));
      const headers = {};
      const queryParameters = {};
      if (forwardToReplicas !== void 0) {
        queryParameters["forwardToReplicas"] = forwardToReplicas.toString();
      }
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: indexSettings
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Replaces the permissions of an existing API key.  Any unspecified attribute resets that attribute to its default value.
     *
     * Required API Key ACLs:
     *  - admin
     * @param updateApiKey - The updateApiKey object.
     * @param updateApiKey.key - API key.
     * @param updateApiKey.apiKey - The apiKey object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    updateApiKey({ key, apiKey }, requestOptions) {
      if (!key) {
        throw new Error("Parameter `key` is required when calling `updateApiKey`.");
      }
      if (!apiKey) {
        throw new Error("Parameter `apiKey` is required when calling `updateApiKey`.");
      }
      if (!apiKey.acl) {
        throw new Error("Parameter `apiKey.acl` is required when calling `updateApiKey`.");
      }
      const requestPath = "/1/keys/{key}".replace("{key}", encodeURIComponent(key));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: apiKey
      };
      return transporter.request(request, requestOptions);
    }
  };
}

// builds/browser.ts
function searchClient(appId, apiKey, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  return createSearchClient({
    appId,
    apiKey,
    timeouts: {
      connect: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_CONNECT_TIMEOUT_BROWSER,
      read: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_READ_TIMEOUT_BROWSER,
      write: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_WRITE_TIMEOUT_BROWSER
    },
    logger: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createNullLogger)(),
    requester: (0,_algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__.createXhrRequester)(),
    algoliaAgents: [{ segment: "Browser" }],
    authMode: "WithinQueryParameters",
    responsesCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)(),
    requestsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)({ serializable: false }),
    hostsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createFallbackableCache)({
      caches: [(0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createBrowserLocalStorageCache)({ key: `${apiClientVersion}-${appId}` }), (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)()]
    }),
    ...options
  });
}

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/@algolia/ingestion/dist/builds/browser.js":
/*!****************************************************************!*\
  !*** ./node_modules/@algolia/ingestion/dist/builds/browser.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiClientVersion: () => (/* binding */ apiClientVersion),
/* harmony export */   ingestionClient: () => (/* binding */ ingestionClient),
/* harmony export */   isOnDemandTrigger: () => (/* binding */ isOnDemandTrigger),
/* harmony export */   isScheduleTrigger: () => (/* binding */ isScheduleTrigger),
/* harmony export */   isSubscriptionTrigger: () => (/* binding */ isSubscriptionTrigger)
/* harmony export */ });
/* harmony import */ var _algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/requester-browser-xhr */ "./node_modules/@algolia/requester-browser-xhr/dist/requester.xhr.js");
/* harmony import */ var _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/common.js");
// builds/browser.ts



// src/ingestionClient.ts

var apiClientVersion = "1.15.0";
var REGIONS = ["eu", "us"];
function getDefaultHosts(region) {
  const url = "data.{region}.algolia.com".replace("{region}", region);
  return [{ url, accept: "readWrite", protocol: "https" }];
}
function isOnDemandTrigger(trigger) {
  return trigger.type === "onDemand";
}
function isScheduleTrigger(trigger) {
  return trigger.type === "schedule";
}
function isSubscriptionTrigger(trigger) {
  return trigger.type === "subscription";
}
function createIngestionClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  region: regionOption,
  ...options
}) {
  const auth = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createAuth)(appIdOption, apiKeyOption, authMode);
  const transporter = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createTransporter)({
    hosts: getDefaultHosts(regionOption),
    ...options,
    algoliaAgent: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.getAlgoliaAgent)({
      algoliaAgents,
      client: "Ingestion",
      version: apiClientVersion
    }),
    baseHeaders: {
      "content-type": "text/plain",
      ...auth.headers(),
      ...options.baseHeaders
    },
    baseQueryParameters: {
      ...auth.queryParameters(),
      ...options.baseQueryParameters
    }
  });
  return {
    transporter,
    /**
     * The `appId` currently in use.
     */
    appId: appIdOption,
    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache() {
      return Promise.all([transporter.requestsCache.clear(), transporter.responsesCache.clear()]).then(() => void 0);
    },
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return transporter.algoliaAgent.value;
    },
    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment, version) {
      transporter.algoliaAgent.add({ segment, version });
    },
    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }) {
      if (!authMode || authMode === "WithinHeaders") {
        transporter.baseHeaders["x-algolia-api-key"] = apiKey;
      } else {
        transporter.baseQueryParameters["x-algolia-api-key"] = apiKey;
      }
    },
    /**
     * Creates a new authentication resource.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param authenticationCreate -
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    createAuthentication(authenticationCreate, requestOptions) {
      if (!authenticationCreate) {
        throw new Error("Parameter `authenticationCreate` is required when calling `createAuthentication`.");
      }
      if (!authenticationCreate.type) {
        throw new Error("Parameter `authenticationCreate.type` is required when calling `createAuthentication`.");
      }
      if (!authenticationCreate.name) {
        throw new Error("Parameter `authenticationCreate.name` is required when calling `createAuthentication`.");
      }
      if (!authenticationCreate.input) {
        throw new Error("Parameter `authenticationCreate.input` is required when calling `createAuthentication`.");
      }
      const requestPath = "/1/authentications";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: authenticationCreate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Creates a new destination.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param destinationCreate -
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    createDestination(destinationCreate, requestOptions) {
      if (!destinationCreate) {
        throw new Error("Parameter `destinationCreate` is required when calling `createDestination`.");
      }
      if (!destinationCreate.type) {
        throw new Error("Parameter `destinationCreate.type` is required when calling `createDestination`.");
      }
      if (!destinationCreate.name) {
        throw new Error("Parameter `destinationCreate.name` is required when calling `createDestination`.");
      }
      if (!destinationCreate.input) {
        throw new Error("Parameter `destinationCreate.input` is required when calling `createDestination`.");
      }
      const requestPath = "/1/destinations";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: destinationCreate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Creates a new source.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param sourceCreate -
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    createSource(sourceCreate, requestOptions) {
      if (!sourceCreate) {
        throw new Error("Parameter `sourceCreate` is required when calling `createSource`.");
      }
      if (!sourceCreate.type) {
        throw new Error("Parameter `sourceCreate.type` is required when calling `createSource`.");
      }
      if (!sourceCreate.name) {
        throw new Error("Parameter `sourceCreate.name` is required when calling `createSource`.");
      }
      const requestPath = "/1/sources";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: sourceCreate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Creates a new task.
     * @param taskCreate - Request body for creating a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    createTask(taskCreate, requestOptions) {
      if (!taskCreate) {
        throw new Error("Parameter `taskCreate` is required when calling `createTask`.");
      }
      if (!taskCreate.sourceID) {
        throw new Error("Parameter `taskCreate.sourceID` is required when calling `createTask`.");
      }
      if (!taskCreate.destinationID) {
        throw new Error("Parameter `taskCreate.destinationID` is required when calling `createTask`.");
      }
      if (!taskCreate.action) {
        throw new Error("Parameter `taskCreate.action` is required when calling `createTask`.");
      }
      const requestPath = "/2/tasks";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: taskCreate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Creates a new task using the v1 endpoint, please use `createTask` instead.
     * @param taskCreate - Request body for creating a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    createTaskV1(taskCreate, requestOptions) {
      if (!taskCreate) {
        throw new Error("Parameter `taskCreate` is required when calling `createTaskV1`.");
      }
      if (!taskCreate.sourceID) {
        throw new Error("Parameter `taskCreate.sourceID` is required when calling `createTaskV1`.");
      }
      if (!taskCreate.destinationID) {
        throw new Error("Parameter `taskCreate.destinationID` is required when calling `createTaskV1`.");
      }
      if (!taskCreate.trigger) {
        throw new Error("Parameter `taskCreate.trigger` is required when calling `createTaskV1`.");
      }
      if (!taskCreate.action) {
        throw new Error("Parameter `taskCreate.action` is required when calling `createTaskV1`.");
      }
      const requestPath = "/1/tasks";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: taskCreate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Creates a new transformation.
     * @param transformationCreate - Request body for creating a transformation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    createTransformation(transformationCreate, requestOptions) {
      if (!transformationCreate) {
        throw new Error("Parameter `transformationCreate` is required when calling `createTransformation`.");
      }
      if (!transformationCreate.code) {
        throw new Error("Parameter `transformationCreate.code` is required when calling `createTransformation`.");
      }
      if (!transformationCreate.name) {
        throw new Error("Parameter `transformationCreate.name` is required when calling `createTransformation`.");
      }
      const requestPath = "/1/transformations";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: transformationCreate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customDelete({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customDelete`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customGet({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customGet`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPost`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPut({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPut`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes an authentication resource. You can\'t delete authentication resources that are used by a source or a destination.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param deleteAuthentication - The deleteAuthentication object.
     * @param deleteAuthentication.authenticationID - Unique identifier of an authentication resource.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteAuthentication({ authenticationID }, requestOptions) {
      if (!authenticationID) {
        throw new Error("Parameter `authenticationID` is required when calling `deleteAuthentication`.");
      }
      const requestPath = "/1/authentications/{authenticationID}".replace(
        "{authenticationID}",
        encodeURIComponent(authenticationID)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a destination by its ID. You can\'t delete destinations that are referenced in tasks.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param deleteDestination - The deleteDestination object.
     * @param deleteDestination.destinationID - Unique identifier of a destination.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteDestination({ destinationID }, requestOptions) {
      if (!destinationID) {
        throw new Error("Parameter `destinationID` is required when calling `deleteDestination`.");
      }
      const requestPath = "/1/destinations/{destinationID}".replace(
        "{destinationID}",
        encodeURIComponent(destinationID)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a source by its ID. You can\'t delete sources that are referenced in tasks.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param deleteSource - The deleteSource object.
     * @param deleteSource.sourceID - Unique identifier of a source.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteSource({ sourceID }, requestOptions) {
      if (!sourceID) {
        throw new Error("Parameter `sourceID` is required when calling `deleteSource`.");
      }
      const requestPath = "/1/sources/{sourceID}".replace("{sourceID}", encodeURIComponent(sourceID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a task by its ID.
     * @param deleteTask - The deleteTask object.
     * @param deleteTask.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteTask({ taskID }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `deleteTask`.");
      }
      const requestPath = "/2/tasks/{taskID}".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a task by its ID using the v1 endpoint, please use `deleteTask` instead.
     * @param deleteTaskV1 - The deleteTaskV1 object.
     * @param deleteTaskV1.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteTaskV1({ taskID }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `deleteTaskV1`.");
      }
      const requestPath = "/1/tasks/{taskID}".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a transformation by its ID.
     * @param deleteTransformation - The deleteTransformation object.
     * @param deleteTransformation.transformationID - Unique identifier of a transformation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteTransformation({ transformationID }, requestOptions) {
      if (!transformationID) {
        throw new Error("Parameter `transformationID` is required when calling `deleteTransformation`.");
      }
      const requestPath = "/1/transformations/{transformationID}".replace(
        "{transformationID}",
        encodeURIComponent(transformationID)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Disables a task.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param disableTask - The disableTask object.
     * @param disableTask.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    disableTask({ taskID }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `disableTask`.");
      }
      const requestPath = "/2/tasks/{taskID}/disable".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Disables a task using the v1 endpoint, please use `disableTask` instead.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param disableTaskV1 - The disableTaskV1 object.
     * @param disableTaskV1.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    disableTaskV1({ taskID }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `disableTaskV1`.");
      }
      const requestPath = "/1/tasks/{taskID}/disable".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Enables a task.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param enableTask - The enableTask object.
     * @param enableTask.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    enableTask({ taskID }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `enableTask`.");
      }
      const requestPath = "/2/tasks/{taskID}/enable".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Enables a task using the v1 endpoint, please use `enableTask` instead.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param enableTaskV1 - The enableTaskV1 object.
     * @param enableTaskV1.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    enableTaskV1({ taskID }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `enableTaskV1`.");
      }
      const requestPath = "/1/tasks/{taskID}/enable".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves an authentication resource by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getAuthentication - The getAuthentication object.
     * @param getAuthentication.authenticationID - Unique identifier of an authentication resource.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getAuthentication({ authenticationID }, requestOptions) {
      if (!authenticationID) {
        throw new Error("Parameter `authenticationID` is required when calling `getAuthentication`.");
      }
      const requestPath = "/1/authentications/{authenticationID}".replace(
        "{authenticationID}",
        encodeURIComponent(authenticationID)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a destination by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getDestination - The getDestination object.
     * @param getDestination.destinationID - Unique identifier of a destination.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getDestination({ destinationID }, requestOptions) {
      if (!destinationID) {
        throw new Error("Parameter `destinationID` is required when calling `getDestination`.");
      }
      const requestPath = "/1/destinations/{destinationID}".replace(
        "{destinationID}",
        encodeURIComponent(destinationID)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a single task run event by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getEvent - The getEvent object.
     * @param getEvent.runID - Unique identifier of a task run.
     * @param getEvent.eventID - Unique identifier of an event.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getEvent({ runID, eventID }, requestOptions) {
      if (!runID) {
        throw new Error("Parameter `runID` is required when calling `getEvent`.");
      }
      if (!eventID) {
        throw new Error("Parameter `eventID` is required when calling `getEvent`.");
      }
      const requestPath = "/1/runs/{runID}/events/{eventID}".replace("{runID}", encodeURIComponent(runID)).replace("{eventID}", encodeURIComponent(eventID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieve a single task run by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getRun - The getRun object.
     * @param getRun.runID - Unique identifier of a task run.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getRun({ runID }, requestOptions) {
      if (!runID) {
        throw new Error("Parameter `runID` is required when calling `getRun`.");
      }
      const requestPath = "/1/runs/{runID}".replace("{runID}", encodeURIComponent(runID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieve a source by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getSource - The getSource object.
     * @param getSource.sourceID - Unique identifier of a source.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getSource({ sourceID }, requestOptions) {
      if (!sourceID) {
        throw new Error("Parameter `sourceID` is required when calling `getSource`.");
      }
      const requestPath = "/1/sources/{sourceID}".replace("{sourceID}", encodeURIComponent(sourceID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a task by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getTask - The getTask object.
     * @param getTask.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTask({ taskID }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `getTask`.");
      }
      const requestPath = "/2/tasks/{taskID}".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a task by its ID using the v1 endpoint, please use `getTask` instead.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getTaskV1 - The getTaskV1 object.
     * @param getTaskV1.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTaskV1({ taskID }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `getTaskV1`.");
      }
      const requestPath = "/1/tasks/{taskID}".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a transformation by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getTransformation - The getTransformation object.
     * @param getTransformation.transformationID - Unique identifier of a transformation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getTransformation({ transformationID }, requestOptions) {
      if (!transformationID) {
        throw new Error("Parameter `transformationID` is required when calling `getTransformation`.");
      }
      const requestPath = "/1/transformations/{transformationID}".replace(
        "{transformationID}",
        encodeURIComponent(transformationID)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a list of all authentication resources.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listAuthentications - The listAuthentications object.
     * @param listAuthentications.itemsPerPage - Number of items per page.
     * @param listAuthentications.page - Page number of the paginated API response.
     * @param listAuthentications.type - Type of authentication resource to retrieve.
     * @param listAuthentications.platform - Ecommerce platform for which to retrieve authentications.
     * @param listAuthentications.sort - Property by which to sort the list of authentications.
     * @param listAuthentications.order - Sort order of the response, ascending or descending.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listAuthentications({ itemsPerPage, page, type, platform, sort, order } = {}, requestOptions = void 0) {
      const requestPath = "/1/authentications";
      const headers = {};
      const queryParameters = {};
      if (itemsPerPage !== void 0) {
        queryParameters["itemsPerPage"] = itemsPerPage.toString();
      }
      if (page !== void 0) {
        queryParameters["page"] = page.toString();
      }
      if (type !== void 0) {
        queryParameters["type"] = type.toString();
      }
      if (platform !== void 0) {
        queryParameters["platform"] = platform.toString();
      }
      if (sort !== void 0) {
        queryParameters["sort"] = sort.toString();
      }
      if (order !== void 0) {
        queryParameters["order"] = order.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a list of destinations.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listDestinations - The listDestinations object.
     * @param listDestinations.itemsPerPage - Number of items per page.
     * @param listDestinations.page - Page number of the paginated API response.
     * @param listDestinations.type - Destination type.
     * @param listDestinations.authenticationID - Authentication ID used by destinations.
     * @param listDestinations.transformationID - Get the list of destinations used by a transformation.
     * @param listDestinations.sort - Property by which to sort the destinations.
     * @param listDestinations.order - Sort order of the response, ascending or descending.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listDestinations({ itemsPerPage, page, type, authenticationID, transformationID, sort, order } = {}, requestOptions = void 0) {
      const requestPath = "/1/destinations";
      const headers = {};
      const queryParameters = {};
      if (itemsPerPage !== void 0) {
        queryParameters["itemsPerPage"] = itemsPerPage.toString();
      }
      if (page !== void 0) {
        queryParameters["page"] = page.toString();
      }
      if (type !== void 0) {
        queryParameters["type"] = type.toString();
      }
      if (authenticationID !== void 0) {
        queryParameters["authenticationID"] = authenticationID.toString();
      }
      if (transformationID !== void 0) {
        queryParameters["transformationID"] = transformationID.toString();
      }
      if (sort !== void 0) {
        queryParameters["sort"] = sort.toString();
      }
      if (order !== void 0) {
        queryParameters["order"] = order.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a list of events for a task run, identified by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listEvents - The listEvents object.
     * @param listEvents.runID - Unique identifier of a task run.
     * @param listEvents.itemsPerPage - Number of items per page.
     * @param listEvents.page - Page number of the paginated API response.
     * @param listEvents.status - Event status for filtering the list of task runs.
     * @param listEvents.type - Event type for filtering the list of task runs.
     * @param listEvents.sort - Property by which to sort the list of task run events.
     * @param listEvents.order - Sort order of the response, ascending or descending.
     * @param listEvents.startDate - Date and time in RFC 3339 format for the earliest events to retrieve. By default, the current time minus three hours is used.
     * @param listEvents.endDate - Date and time in RFC 3339 format for the latest events to retrieve. By default, the current time is used.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listEvents({ runID, itemsPerPage, page, status, type, sort, order, startDate, endDate }, requestOptions) {
      if (!runID) {
        throw new Error("Parameter `runID` is required when calling `listEvents`.");
      }
      const requestPath = "/1/runs/{runID}/events".replace("{runID}", encodeURIComponent(runID));
      const headers = {};
      const queryParameters = {};
      if (itemsPerPage !== void 0) {
        queryParameters["itemsPerPage"] = itemsPerPage.toString();
      }
      if (page !== void 0) {
        queryParameters["page"] = page.toString();
      }
      if (status !== void 0) {
        queryParameters["status"] = status.toString();
      }
      if (type !== void 0) {
        queryParameters["type"] = type.toString();
      }
      if (sort !== void 0) {
        queryParameters["sort"] = sort.toString();
      }
      if (order !== void 0) {
        queryParameters["order"] = order.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieve a list of task runs.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listRuns - The listRuns object.
     * @param listRuns.itemsPerPage - Number of items per page.
     * @param listRuns.page - Page number of the paginated API response.
     * @param listRuns.status - Run status for filtering the list of task runs.
     * @param listRuns.type - Run type for filtering the list of task runs.
     * @param listRuns.taskID - Task ID for filtering the list of task runs.
     * @param listRuns.sort - Property by which to sort the list of task runs.
     * @param listRuns.order - Sort order of the response, ascending or descending.
     * @param listRuns.startDate - Date in RFC 3339 format for the earliest run to retrieve. By default, the current day minus seven days is used.
     * @param listRuns.endDate - Date in RFC 3339 format for the latest run to retrieve. By default, the current day is used.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listRuns({ itemsPerPage, page, status, type, taskID, sort, order, startDate, endDate } = {}, requestOptions = void 0) {
      const requestPath = "/1/runs";
      const headers = {};
      const queryParameters = {};
      if (itemsPerPage !== void 0) {
        queryParameters["itemsPerPage"] = itemsPerPage.toString();
      }
      if (page !== void 0) {
        queryParameters["page"] = page.toString();
      }
      if (status !== void 0) {
        queryParameters["status"] = status.toString();
      }
      if (type !== void 0) {
        queryParameters["type"] = type.toString();
      }
      if (taskID !== void 0) {
        queryParameters["taskID"] = taskID.toString();
      }
      if (sort !== void 0) {
        queryParameters["sort"] = sort.toString();
      }
      if (order !== void 0) {
        queryParameters["order"] = order.toString();
      }
      if (startDate !== void 0) {
        queryParameters["startDate"] = startDate.toString();
      }
      if (endDate !== void 0) {
        queryParameters["endDate"] = endDate.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a list of sources.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listSources - The listSources object.
     * @param listSources.itemsPerPage - Number of items per page.
     * @param listSources.page - Page number of the paginated API response.
     * @param listSources.type - Source type. Some sources require authentication.
     * @param listSources.authenticationID - Authentication IDs of the sources to retrieve. \'none\' returns sources that doesn\'t have an authentication.
     * @param listSources.sort - Property by which to sort the list of sources.
     * @param listSources.order - Sort order of the response, ascending or descending.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listSources({ itemsPerPage, page, type, authenticationID, sort, order } = {}, requestOptions = void 0) {
      const requestPath = "/1/sources";
      const headers = {};
      const queryParameters = {};
      if (itemsPerPage !== void 0) {
        queryParameters["itemsPerPage"] = itemsPerPage.toString();
      }
      if (page !== void 0) {
        queryParameters["page"] = page.toString();
      }
      if (type !== void 0) {
        queryParameters["type"] = type.toString();
      }
      if (authenticationID !== void 0) {
        queryParameters["authenticationID"] = authenticationID.toString();
      }
      if (sort !== void 0) {
        queryParameters["sort"] = sort.toString();
      }
      if (order !== void 0) {
        queryParameters["order"] = order.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a list of tasks.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listTasks - The listTasks object.
     * @param listTasks.itemsPerPage - Number of items per page.
     * @param listTasks.page - Page number of the paginated API response.
     * @param listTasks.action - Actions for filtering the list of tasks.
     * @param listTasks.enabled - Whether to filter the list of tasks by the `enabled` status.
     * @param listTasks.sourceID - Source IDs for filtering the list of tasks.
     * @param listTasks.destinationID - Destination IDs for filtering the list of tasks.
     * @param listTasks.triggerType - Type of task trigger for filtering the list of tasks.
     * @param listTasks.sort - Property by which to sort the list of tasks.
     * @param listTasks.order - Sort order of the response, ascending or descending.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listTasks({ itemsPerPage, page, action, enabled, sourceID, destinationID, triggerType, sort, order } = {}, requestOptions = void 0) {
      const requestPath = "/2/tasks";
      const headers = {};
      const queryParameters = {};
      if (itemsPerPage !== void 0) {
        queryParameters["itemsPerPage"] = itemsPerPage.toString();
      }
      if (page !== void 0) {
        queryParameters["page"] = page.toString();
      }
      if (action !== void 0) {
        queryParameters["action"] = action.toString();
      }
      if (enabled !== void 0) {
        queryParameters["enabled"] = enabled.toString();
      }
      if (sourceID !== void 0) {
        queryParameters["sourceID"] = sourceID.toString();
      }
      if (destinationID !== void 0) {
        queryParameters["destinationID"] = destinationID.toString();
      }
      if (triggerType !== void 0) {
        queryParameters["triggerType"] = triggerType.toString();
      }
      if (sort !== void 0) {
        queryParameters["sort"] = sort.toString();
      }
      if (order !== void 0) {
        queryParameters["order"] = order.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a list of tasks using the v1 endpoint, please use `getTasks` instead.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listTasksV1 - The listTasksV1 object.
     * @param listTasksV1.itemsPerPage - Number of items per page.
     * @param listTasksV1.page - Page number of the paginated API response.
     * @param listTasksV1.action - Actions for filtering the list of tasks.
     * @param listTasksV1.enabled - Whether to filter the list of tasks by the `enabled` status.
     * @param listTasksV1.sourceID - Source IDs for filtering the list of tasks.
     * @param listTasksV1.destinationID - Destination IDs for filtering the list of tasks.
     * @param listTasksV1.triggerType - Type of task trigger for filtering the list of tasks.
     * @param listTasksV1.sort - Property by which to sort the list of tasks.
     * @param listTasksV1.order - Sort order of the response, ascending or descending.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listTasksV1({ itemsPerPage, page, action, enabled, sourceID, destinationID, triggerType, sort, order } = {}, requestOptions = void 0) {
      const requestPath = "/1/tasks";
      const headers = {};
      const queryParameters = {};
      if (itemsPerPage !== void 0) {
        queryParameters["itemsPerPage"] = itemsPerPage.toString();
      }
      if (page !== void 0) {
        queryParameters["page"] = page.toString();
      }
      if (action !== void 0) {
        queryParameters["action"] = action.toString();
      }
      if (enabled !== void 0) {
        queryParameters["enabled"] = enabled.toString();
      }
      if (sourceID !== void 0) {
        queryParameters["sourceID"] = sourceID.toString();
      }
      if (destinationID !== void 0) {
        queryParameters["destinationID"] = destinationID.toString();
      }
      if (triggerType !== void 0) {
        queryParameters["triggerType"] = triggerType.toString();
      }
      if (sort !== void 0) {
        queryParameters["sort"] = sort.toString();
      }
      if (order !== void 0) {
        queryParameters["order"] = order.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a list of transformations.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listTransformations - The listTransformations object.
     * @param listTransformations.itemsPerPage - Number of items per page.
     * @param listTransformations.page - Page number of the paginated API response.
     * @param listTransformations.sort - Property by which to sort the list of transformations.
     * @param listTransformations.order - Sort order of the response, ascending or descending.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    listTransformations({ itemsPerPage, page, sort, order } = {}, requestOptions = void 0) {
      const requestPath = "/1/transformations";
      const headers = {};
      const queryParameters = {};
      if (itemsPerPage !== void 0) {
        queryParameters["itemsPerPage"] = itemsPerPage.toString();
      }
      if (page !== void 0) {
        queryParameters["page"] = page.toString();
      }
      if (sort !== void 0) {
        queryParameters["sort"] = sort.toString();
      }
      if (order !== void 0) {
        queryParameters["order"] = order.toString();
      }
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Push a `batch` request payload through the Pipeline. You can check the status of task pushes with the observability endpoints.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param pushTask - The pushTask object.
     * @param pushTask.taskID - Unique identifier of a task.
     * @param pushTask.pushTaskPayload - Request body of a Search API `batch` request that will be pushed in the Connectors pipeline.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    pushTask({ taskID, pushTaskPayload }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `pushTask`.");
      }
      if (!pushTaskPayload) {
        throw new Error("Parameter `pushTaskPayload` is required when calling `pushTask`.");
      }
      if (!pushTaskPayload.action) {
        throw new Error("Parameter `pushTaskPayload.action` is required when calling `pushTask`.");
      }
      if (!pushTaskPayload.records) {
        throw new Error("Parameter `pushTaskPayload.records` is required when calling `pushTask`.");
      }
      const requestPath = "/2/tasks/{taskID}/push".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: pushTaskPayload
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Runs all tasks linked to a source, only available for Shopify sources. It will create 1 run per task.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param runSource - The runSource object.
     * @param runSource.sourceID - Unique identifier of a source.
     * @param runSource.runSourcePayload -
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    runSource({ sourceID, runSourcePayload }, requestOptions) {
      if (!sourceID) {
        throw new Error("Parameter `sourceID` is required when calling `runSource`.");
      }
      const requestPath = "/1/sources/{sourceID}/run".replace("{sourceID}", encodeURIComponent(sourceID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: runSourcePayload ? runSourcePayload : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Runs a task. You can check the status of task runs with the observability endpoints.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param runTask - The runTask object.
     * @param runTask.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    runTask({ taskID }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `runTask`.");
      }
      const requestPath = "/2/tasks/{taskID}/run".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Runs a task using the v1 endpoint, please use `runTask` instead. You can check the status of task runs with the observability endpoints.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param runTaskV1 - The runTaskV1 object.
     * @param runTaskV1.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    runTaskV1({ taskID }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `runTaskV1`.");
      }
      const requestPath = "/1/tasks/{taskID}/run".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Searches for authentication resources.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param authenticationSearch - The authenticationSearch object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchAuthentications(authenticationSearch, requestOptions) {
      if (!authenticationSearch) {
        throw new Error("Parameter `authenticationSearch` is required when calling `searchAuthentications`.");
      }
      if (!authenticationSearch.authenticationIDs) {
        throw new Error(
          "Parameter `authenticationSearch.authenticationIDs` is required when calling `searchAuthentications`."
        );
      }
      const requestPath = "/1/authentications/search";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: authenticationSearch
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Searches for destinations.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param destinationSearch - The destinationSearch object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchDestinations(destinationSearch, requestOptions) {
      if (!destinationSearch) {
        throw new Error("Parameter `destinationSearch` is required when calling `searchDestinations`.");
      }
      if (!destinationSearch.destinationIDs) {
        throw new Error("Parameter `destinationSearch.destinationIDs` is required when calling `searchDestinations`.");
      }
      const requestPath = "/1/destinations/search";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: destinationSearch
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Searches for sources.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param sourceSearch - The sourceSearch object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchSources(sourceSearch, requestOptions) {
      if (!sourceSearch) {
        throw new Error("Parameter `sourceSearch` is required when calling `searchSources`.");
      }
      if (!sourceSearch.sourceIDs) {
        throw new Error("Parameter `sourceSearch.sourceIDs` is required when calling `searchSources`.");
      }
      const requestPath = "/1/sources/search";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: sourceSearch
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Searches for tasks.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param taskSearch - The taskSearch object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchTasks(taskSearch, requestOptions) {
      if (!taskSearch) {
        throw new Error("Parameter `taskSearch` is required when calling `searchTasks`.");
      }
      if (!taskSearch.taskIDs) {
        throw new Error("Parameter `taskSearch.taskIDs` is required when calling `searchTasks`.");
      }
      const requestPath = "/2/tasks/search";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: taskSearch
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Searches for tasks using the v1 endpoint, please use `searchTasks` instead.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param taskSearch - The taskSearch object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchTasksV1(taskSearch, requestOptions) {
      if (!taskSearch) {
        throw new Error("Parameter `taskSearch` is required when calling `searchTasksV1`.");
      }
      if (!taskSearch.taskIDs) {
        throw new Error("Parameter `taskSearch.taskIDs` is required when calling `searchTasksV1`.");
      }
      const requestPath = "/1/tasks/search";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: taskSearch
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Searches for transformations.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param transformationSearch - The transformationSearch object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchTransformations(transformationSearch, requestOptions) {
      if (!transformationSearch) {
        throw new Error("Parameter `transformationSearch` is required when calling `searchTransformations`.");
      }
      if (!transformationSearch.transformationIDs) {
        throw new Error(
          "Parameter `transformationSearch.transformationIDs` is required when calling `searchTransformations`."
        );
      }
      const requestPath = "/1/transformations/search";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: transformationSearch
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Triggers a stream-listing request for a source. Triggering stream-listing requests only works with sources with `type: docker` and `imageType: singer`.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param triggerDockerSourceDiscover - The triggerDockerSourceDiscover object.
     * @param triggerDockerSourceDiscover.sourceID - Unique identifier of a source.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    triggerDockerSourceDiscover({ sourceID }, requestOptions) {
      if (!sourceID) {
        throw new Error("Parameter `sourceID` is required when calling `triggerDockerSourceDiscover`.");
      }
      const requestPath = "/1/sources/{sourceID}/discover".replace("{sourceID}", encodeURIComponent(sourceID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Try a transformation before creating it.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param transformationTry - The transformationTry object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    tryTransformation(transformationTry, requestOptions) {
      if (!transformationTry) {
        throw new Error("Parameter `transformationTry` is required when calling `tryTransformation`.");
      }
      if (!transformationTry.code) {
        throw new Error("Parameter `transformationTry.code` is required when calling `tryTransformation`.");
      }
      if (!transformationTry.sampleRecord) {
        throw new Error("Parameter `transformationTry.sampleRecord` is required when calling `tryTransformation`.");
      }
      const requestPath = "/1/transformations/try";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: transformationTry
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Try a transformation before updating it.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param tryTransformationBeforeUpdate - The tryTransformationBeforeUpdate object.
     * @param tryTransformationBeforeUpdate.transformationID - Unique identifier of a transformation.
     * @param tryTransformationBeforeUpdate.transformationTry - The transformationTry object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    tryTransformationBeforeUpdate({ transformationID, transformationTry }, requestOptions) {
      if (!transformationID) {
        throw new Error("Parameter `transformationID` is required when calling `tryTransformationBeforeUpdate`.");
      }
      if (!transformationTry) {
        throw new Error("Parameter `transformationTry` is required when calling `tryTransformationBeforeUpdate`.");
      }
      if (!transformationTry.code) {
        throw new Error("Parameter `transformationTry.code` is required when calling `tryTransformationBeforeUpdate`.");
      }
      if (!transformationTry.sampleRecord) {
        throw new Error(
          "Parameter `transformationTry.sampleRecord` is required when calling `tryTransformationBeforeUpdate`."
        );
      }
      const requestPath = "/1/transformations/{transformationID}/try".replace(
        "{transformationID}",
        encodeURIComponent(transformationID)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: transformationTry
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Updates an authentication resource.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param updateAuthentication - The updateAuthentication object.
     * @param updateAuthentication.authenticationID - Unique identifier of an authentication resource.
     * @param updateAuthentication.authenticationUpdate - The authenticationUpdate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    updateAuthentication({ authenticationID, authenticationUpdate }, requestOptions) {
      if (!authenticationID) {
        throw new Error("Parameter `authenticationID` is required when calling `updateAuthentication`.");
      }
      if (!authenticationUpdate) {
        throw new Error("Parameter `authenticationUpdate` is required when calling `updateAuthentication`.");
      }
      const requestPath = "/1/authentications/{authenticationID}".replace(
        "{authenticationID}",
        encodeURIComponent(authenticationID)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PATCH",
        path: requestPath,
        queryParameters,
        headers,
        data: authenticationUpdate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Updates the destination by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param updateDestination - The updateDestination object.
     * @param updateDestination.destinationID - Unique identifier of a destination.
     * @param updateDestination.destinationUpdate - The destinationUpdate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    updateDestination({ destinationID, destinationUpdate }, requestOptions) {
      if (!destinationID) {
        throw new Error("Parameter `destinationID` is required when calling `updateDestination`.");
      }
      if (!destinationUpdate) {
        throw new Error("Parameter `destinationUpdate` is required when calling `updateDestination`.");
      }
      const requestPath = "/1/destinations/{destinationID}".replace(
        "{destinationID}",
        encodeURIComponent(destinationID)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PATCH",
        path: requestPath,
        queryParameters,
        headers,
        data: destinationUpdate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Updates a source by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param updateSource - The updateSource object.
     * @param updateSource.sourceID - Unique identifier of a source.
     * @param updateSource.sourceUpdate - The sourceUpdate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    updateSource({ sourceID, sourceUpdate }, requestOptions) {
      if (!sourceID) {
        throw new Error("Parameter `sourceID` is required when calling `updateSource`.");
      }
      if (!sourceUpdate) {
        throw new Error("Parameter `sourceUpdate` is required when calling `updateSource`.");
      }
      const requestPath = "/1/sources/{sourceID}".replace("{sourceID}", encodeURIComponent(sourceID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PATCH",
        path: requestPath,
        queryParameters,
        headers,
        data: sourceUpdate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Updates a task by its ID.
     * @param updateTask - The updateTask object.
     * @param updateTask.taskID - Unique identifier of a task.
     * @param updateTask.taskUpdate - The taskUpdate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    updateTask({ taskID, taskUpdate }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `updateTask`.");
      }
      if (!taskUpdate) {
        throw new Error("Parameter `taskUpdate` is required when calling `updateTask`.");
      }
      const requestPath = "/2/tasks/{taskID}".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PATCH",
        path: requestPath,
        queryParameters,
        headers,
        data: taskUpdate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Updates a task by its ID using the v1 endpoint, please use `updateTask` instead.
     * @param updateTaskV1 - The updateTaskV1 object.
     * @param updateTaskV1.taskID - Unique identifier of a task.
     * @param updateTaskV1.taskUpdate - The taskUpdate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    updateTaskV1({ taskID, taskUpdate }, requestOptions) {
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `updateTaskV1`.");
      }
      if (!taskUpdate) {
        throw new Error("Parameter `taskUpdate` is required when calling `updateTaskV1`.");
      }
      const requestPath = "/1/tasks/{taskID}".replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PATCH",
        path: requestPath,
        queryParameters,
        headers,
        data: taskUpdate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Updates a transformation by its ID.
     * @param updateTransformation - The updateTransformation object.
     * @param updateTransformation.transformationID - Unique identifier of a transformation.
     * @param updateTransformation.transformationCreate - The transformationCreate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    updateTransformation({ transformationID, transformationCreate }, requestOptions) {
      if (!transformationID) {
        throw new Error("Parameter `transformationID` is required when calling `updateTransformation`.");
      }
      if (!transformationCreate) {
        throw new Error("Parameter `transformationCreate` is required when calling `updateTransformation`.");
      }
      if (!transformationCreate.code) {
        throw new Error("Parameter `transformationCreate.code` is required when calling `updateTransformation`.");
      }
      if (!transformationCreate.name) {
        throw new Error("Parameter `transformationCreate.name` is required when calling `updateTransformation`.");
      }
      const requestPath = "/1/transformations/{transformationID}".replace(
        "{transformationID}",
        encodeURIComponent(transformationID)
      );
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: transformationCreate
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Validates a source payload to ensure it can be created and that the data source can be reached by Algolia.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param sourceCreate -
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    validateSource(sourceCreate, requestOptions = void 0) {
      const requestPath = "/1/sources/validate";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: sourceCreate ? sourceCreate : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Validates an update of a source payload to ensure it can be created and that the data source can be reached by Algolia.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param validateSourceBeforeUpdate - The validateSourceBeforeUpdate object.
     * @param validateSourceBeforeUpdate.sourceID - Unique identifier of a source.
     * @param validateSourceBeforeUpdate.sourceUpdate - The sourceUpdate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    validateSourceBeforeUpdate({ sourceID, sourceUpdate }, requestOptions) {
      if (!sourceID) {
        throw new Error("Parameter `sourceID` is required when calling `validateSourceBeforeUpdate`.");
      }
      if (!sourceUpdate) {
        throw new Error("Parameter `sourceUpdate` is required when calling `validateSourceBeforeUpdate`.");
      }
      const requestPath = "/1/sources/{sourceID}/validate".replace("{sourceID}", encodeURIComponent(sourceID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: sourceUpdate
      };
      return transporter.request(request, requestOptions);
    }
  };
}

// builds/browser.ts
function ingestionClient(appId, apiKey, region, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  if (!region || region && (typeof region !== "string" || !REGIONS.includes(region))) {
    throw new Error(`\`region\` is required and must be one of the following: ${REGIONS.join(", ")}`);
  }
  return createIngestionClient({
    appId,
    apiKey,
    region,
    timeouts: {
      connect: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_CONNECT_TIMEOUT_BROWSER,
      read: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_READ_TIMEOUT_BROWSER,
      write: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_WRITE_TIMEOUT_BROWSER
    },
    logger: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createNullLogger)(),
    requester: (0,_algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__.createXhrRequester)(),
    algoliaAgents: [{ segment: "Browser" }],
    authMode: "WithinQueryParameters",
    responsesCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)(),
    requestsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)({ serializable: false }),
    hostsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createFallbackableCache)({
      caches: [(0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createBrowserLocalStorageCache)({ key: `${apiClientVersion}-${appId}` }), (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)()]
    }),
    ...options
  });
}

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/@algolia/monitoring/dist/builds/browser.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@algolia/monitoring/dist/builds/browser.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiClientVersion: () => (/* binding */ apiClientVersion),
/* harmony export */   monitoringClient: () => (/* binding */ monitoringClient)
/* harmony export */ });
/* harmony import */ var _algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/requester-browser-xhr */ "./node_modules/@algolia/requester-browser-xhr/dist/requester.xhr.js");
/* harmony import */ var _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/common.js");
// builds/browser.ts



// src/monitoringClient.ts

var apiClientVersion = "1.15.0";
function getDefaultHosts() {
  return [{ url: "status.algolia.com", accept: "readWrite", protocol: "https" }];
}
function createMonitoringClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  ...options
}) {
  const auth = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createAuth)(appIdOption, apiKeyOption, authMode);
  const transporter = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createTransporter)({
    hosts: getDefaultHosts(),
    ...options,
    algoliaAgent: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.getAlgoliaAgent)({
      algoliaAgents,
      client: "Monitoring",
      version: apiClientVersion
    }),
    baseHeaders: {
      "content-type": "text/plain",
      ...auth.headers(),
      ...options.baseHeaders
    },
    baseQueryParameters: {
      ...auth.queryParameters(),
      ...options.baseQueryParameters
    }
  });
  return {
    transporter,
    /**
     * The `appId` currently in use.
     */
    appId: appIdOption,
    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache() {
      return Promise.all([transporter.requestsCache.clear(), transporter.responsesCache.clear()]).then(() => void 0);
    },
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return transporter.algoliaAgent.value;
    },
    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment, version) {
      transporter.algoliaAgent.add({ segment, version });
    },
    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }) {
      if (!authMode || authMode === "WithinHeaders") {
        transporter.baseHeaders["x-algolia-api-key"] = apiKey;
      } else {
        transporter.baseQueryParameters["x-algolia-api-key"] = apiKey;
      }
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customDelete({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customDelete`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customGet({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customGet`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPost`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPut({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPut`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves known incidents for the selected clusters.
     * @param getClusterIncidents - The getClusterIncidents object.
     * @param getClusterIncidents.clusters - Subset of clusters, separated by commas.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getClusterIncidents({ clusters }, requestOptions) {
      if (!clusters) {
        throw new Error("Parameter `clusters` is required when calling `getClusterIncidents`.");
      }
      const requestPath = "/1/incidents/{clusters}".replace("{clusters}", encodeURIComponent(clusters));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the status of selected clusters.
     * @param getClusterStatus - The getClusterStatus object.
     * @param getClusterStatus.clusters - Subset of clusters, separated by commas.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getClusterStatus({ clusters }, requestOptions) {
      if (!clusters) {
        throw new Error("Parameter `clusters` is required when calling `getClusterStatus`.");
      }
      const requestPath = "/1/status/{clusters}".replace("{clusters}", encodeURIComponent(clusters));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves known incidents for all clusters.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getIncidents(requestOptions) {
      const requestPath = "/1/incidents";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves average times for indexing operations for selected clusters.
     * @param getIndexingTime - The getIndexingTime object.
     * @param getIndexingTime.clusters - Subset of clusters, separated by commas.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getIndexingTime({ clusters }, requestOptions) {
      if (!clusters) {
        throw new Error("Parameter `clusters` is required when calling `getIndexingTime`.");
      }
      const requestPath = "/1/indexing/{clusters}".replace("{clusters}", encodeURIComponent(clusters));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the average latency for search requests for selected clusters.
     * @param getLatency - The getLatency object.
     * @param getLatency.clusters - Subset of clusters, separated by commas.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getLatency({ clusters }, requestOptions) {
      if (!clusters) {
        throw new Error("Parameter `clusters` is required when calling `getLatency`.");
      }
      const requestPath = "/1/latency/{clusters}".replace("{clusters}", encodeURIComponent(clusters));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves metrics related to your Algolia infrastructure, aggregated over a selected time window.  Access to this API is available as part of the [Premium or Elevate plans](https://www.algolia.com/pricing). You must authenticate requests with the `x-algolia-application-id` and `x-algolia-api-key` headers (using the Monitoring API key).
     * @param getMetrics - The getMetrics object.
     * @param getMetrics.metric - Metric to report.  For more information about the individual metrics, see the description of the API response. To include all metrics, use `*`.
     * @param getMetrics.period - Period over which to aggregate the metrics:  - `minute`. Aggregate the last minute. 1 data point per 10 seconds. - `hour`. Aggregate the last hour. 1 data point per minute. - `day`. Aggregate the last day. 1 data point per 10 minutes. - `week`. Aggregate the last week. 1 data point per hour. - `month`. Aggregate the last month. 1 data point per day.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getMetrics({ metric, period }, requestOptions) {
      if (!metric) {
        throw new Error("Parameter `metric` is required when calling `getMetrics`.");
      }
      if (!period) {
        throw new Error("Parameter `period` is required when calling `getMetrics`.");
      }
      const requestPath = "/1/infrastructure/{metric}/period/{period}".replace("{metric}", encodeURIComponent(metric)).replace("{period}", encodeURIComponent(period));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Test whether clusters are reachable or not.
     * @param getReachability - The getReachability object.
     * @param getReachability.clusters - Subset of clusters, separated by commas.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getReachability({ clusters }, requestOptions) {
      if (!clusters) {
        throw new Error("Parameter `clusters` is required when calling `getReachability`.");
      }
      const requestPath = "/1/reachability/{clusters}/probes".replace("{clusters}", encodeURIComponent(clusters));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the servers that belong to clusters.  The response depends on whether you authenticate your API request:  - With authentication, the response lists the servers assigned to your Algolia application\'s cluster.  - Without authentication, the response lists the servers for all Algolia clusters.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getServers(requestOptions) {
      const requestPath = "/1/inventory/servers";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves the status of all Algolia clusters and instances.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getStatus(requestOptions) {
      const requestPath = "/1/status";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    }
  };
}

// builds/browser.ts
function monitoringClient(appId, apiKey, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  return createMonitoringClient({
    appId,
    apiKey,
    timeouts: {
      connect: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_CONNECT_TIMEOUT_BROWSER,
      read: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_READ_TIMEOUT_BROWSER,
      write: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_WRITE_TIMEOUT_BROWSER
    },
    logger: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createNullLogger)(),
    requester: (0,_algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__.createXhrRequester)(),
    algoliaAgents: [{ segment: "Browser" }],
    authMode: "WithinQueryParameters",
    responsesCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)(),
    requestsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)({ serializable: false }),
    hostsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createFallbackableCache)({
      caches: [(0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createBrowserLocalStorageCache)({ key: `${apiClientVersion}-${appId}` }), (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)()]
    }),
    ...options
  });
}

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/@algolia/recommend/dist/builds/browser.js":
/*!****************************************************************!*\
  !*** ./node_modules/@algolia/recommend/dist/builds/browser.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiClientVersion: () => (/* binding */ apiClientVersion),
/* harmony export */   recommendClient: () => (/* binding */ recommendClient)
/* harmony export */ });
/* harmony import */ var _algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/requester-browser-xhr */ "./node_modules/@algolia/requester-browser-xhr/dist/requester.xhr.js");
/* harmony import */ var _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/common.js");
// builds/browser.ts



// src/recommendClient.ts

var apiClientVersion = "5.15.0";
function getDefaultHosts(appId) {
  return [
    {
      url: `${appId}-dsn.algolia.net`,
      accept: "read",
      protocol: "https"
    },
    {
      url: `${appId}.algolia.net`,
      accept: "write",
      protocol: "https"
    }
  ].concat(
    (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.shuffle)([
      {
        url: `${appId}-1.algolianet.com`,
        accept: "readWrite",
        protocol: "https"
      },
      {
        url: `${appId}-2.algolianet.com`,
        accept: "readWrite",
        protocol: "https"
      },
      {
        url: `${appId}-3.algolianet.com`,
        accept: "readWrite",
        protocol: "https"
      }
    ])
  );
}
function createRecommendClient({
  appId: appIdOption,
  apiKey: apiKeyOption,
  authMode,
  algoliaAgents,
  ...options
}) {
  const auth = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createAuth)(appIdOption, apiKeyOption, authMode);
  const transporter = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createTransporter)({
    hosts: getDefaultHosts(appIdOption),
    ...options,
    algoliaAgent: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.getAlgoliaAgent)({
      algoliaAgents,
      client: "Recommend",
      version: apiClientVersion
    }),
    baseHeaders: {
      "content-type": "text/plain",
      ...auth.headers(),
      ...options.baseHeaders
    },
    baseQueryParameters: {
      ...auth.queryParameters(),
      ...options.baseQueryParameters
    }
  });
  return {
    transporter,
    /**
     * The `appId` currently in use.
     */
    appId: appIdOption,
    /**
     * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
     */
    clearCache() {
      return Promise.all([transporter.requestsCache.clear(), transporter.responsesCache.clear()]).then(() => void 0);
    },
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return transporter.algoliaAgent.value;
    },
    /**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
    addAlgoliaAgent(segment, version) {
      transporter.algoliaAgent.add({ segment, version });
    },
    /**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
    setClientApiKey({ apiKey }) {
      if (!authMode || authMode === "WithinHeaders") {
        transporter.baseHeaders["x-algolia-api-key"] = apiKey;
      } else {
        transporter.baseQueryParameters["x-algolia-api-key"] = apiKey;
      }
    },
    /**
     * Create or update a batch of Recommend Rules  Each Recommend Rule is created or updated, depending on whether a Recommend Rule with the same `objectID` already exists. You may also specify `true` for `clearExistingRules`, in which case the batch will atomically replace all the existing Recommend Rules.  Recommend Rules are similar to Search Rules, except that the conditions and consequences apply to a [source item](/doc/guides/algolia-recommend/overview/#recommend-models) instead of a query. The main differences are the following: - Conditions `pattern` and `anchoring` are unavailable. - Condition `filters` triggers if the source item matches the specified filters. - Condition `filters` accepts numeric filters. - Consequence `params` only covers filtering parameters. - Consequence `automaticFacetFilters` doesn\'t require a facet value placeholder (it tries to match the data source item\'s attributes instead).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param batchRecommendRules - The batchRecommendRules object.
     * @param batchRecommendRules.indexName - Name of the index on which to perform the operation.
     * @param batchRecommendRules.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param batchRecommendRules.recommendRule - The recommendRule object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    batchRecommendRules({ indexName, model, recommendRule }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `batchRecommendRules`.");
      }
      if (!model) {
        throw new Error("Parameter `model` is required when calling `batchRecommendRules`.");
      }
      const requestPath = "/1/indexes/{indexName}/{model}/recommend/rules/batch".replace("{indexName}", encodeURIComponent(indexName)).replace("{model}", encodeURIComponent(model));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: recommendRule ? recommendRule : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customDelete({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customDelete`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customGet({ path, parameters }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customGet`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPost({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPost`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    customPut({ path, parameters, body }, requestOptions) {
      if (!path) {
        throw new Error("Parameter `path` is required when calling `customPut`.");
      }
      const requestPath = "/{path}".replace("{path}", path);
      const headers = {};
      const queryParameters = parameters ? parameters : {};
      const request = {
        method: "PUT",
        path: requestPath,
        queryParameters,
        headers,
        data: body ? body : {}
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Deletes a Recommend rule from a recommendation scenario.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteRecommendRule - The deleteRecommendRule object.
     * @param deleteRecommendRule.indexName - Name of the index on which to perform the operation.
     * @param deleteRecommendRule.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param deleteRecommendRule.objectID - Unique record identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    deleteRecommendRule({ indexName, model, objectID }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `deleteRecommendRule`.");
      }
      if (!model) {
        throw new Error("Parameter `model` is required when calling `deleteRecommendRule`.");
      }
      if (!objectID) {
        throw new Error("Parameter `objectID` is required when calling `deleteRecommendRule`.");
      }
      const requestPath = "/1/indexes/{indexName}/{model}/recommend/rules/{objectID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{model}", encodeURIComponent(model)).replace("{objectID}", encodeURIComponent(objectID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "DELETE",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves a Recommend rule that you previously created in the Algolia dashboard.
     *
     * Required API Key ACLs:
     *  - settings
     * @param getRecommendRule - The getRecommendRule object.
     * @param getRecommendRule.indexName - Name of the index on which to perform the operation.
     * @param getRecommendRule.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param getRecommendRule.objectID - Unique record identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getRecommendRule({ indexName, model, objectID }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `getRecommendRule`.");
      }
      if (!model) {
        throw new Error("Parameter `model` is required when calling `getRecommendRule`.");
      }
      if (!objectID) {
        throw new Error("Parameter `objectID` is required when calling `getRecommendRule`.");
      }
      const requestPath = "/1/indexes/{indexName}/{model}/recommend/rules/{objectID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{model}", encodeURIComponent(model)).replace("{objectID}", encodeURIComponent(objectID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Checks the status of a given task.  Deleting a Recommend rule is asynchronous. When you delete a rule, a task is created on a queue and completed depending on the load on the server. The API response includes a task ID that you can use to check the status.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param getRecommendStatus - The getRecommendStatus object.
     * @param getRecommendStatus.indexName - Name of the index on which to perform the operation.
     * @param getRecommendStatus.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param getRecommendStatus.taskID - Unique task identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getRecommendStatus({ indexName, model, taskID }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `getRecommendStatus`.");
      }
      if (!model) {
        throw new Error("Parameter `model` is required when calling `getRecommendStatus`.");
      }
      if (!taskID) {
        throw new Error("Parameter `taskID` is required when calling `getRecommendStatus`.");
      }
      const requestPath = "/1/indexes/{indexName}/{model}/task/{taskID}".replace("{indexName}", encodeURIComponent(indexName)).replace("{model}", encodeURIComponent(model)).replace("{taskID}", encodeURIComponent(taskID));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "GET",
        path: requestPath,
        queryParameters,
        headers
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Retrieves recommendations from selected AI models.
     *
     * Required API Key ACLs:
     *  - search
     * @param getRecommendationsParams - The getRecommendationsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    getRecommendations(getRecommendationsParams, requestOptions) {
      if (getRecommendationsParams && Array.isArray(getRecommendationsParams)) {
        const newSignatureRequest = {
          requests: getRecommendationsParams
        };
        getRecommendationsParams = newSignatureRequest;
      }
      if (!getRecommendationsParams) {
        throw new Error("Parameter `getRecommendationsParams` is required when calling `getRecommendations`.");
      }
      if (!getRecommendationsParams.requests) {
        throw new Error("Parameter `getRecommendationsParams.requests` is required when calling `getRecommendations`.");
      }
      const requestPath = "/1/indexes/*/recommendations";
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: getRecommendationsParams,
        useReadTransporter: true,
        cacheable: true
      };
      return transporter.request(request, requestOptions);
    },
    /**
     * Searches for Recommend rules.  Use an empty query to list all rules for this recommendation scenario.
     *
     * Required API Key ACLs:
     *  - settings
     * @param searchRecommendRules - The searchRecommendRules object.
     * @param searchRecommendRules.indexName - Name of the index on which to perform the operation.
     * @param searchRecommendRules.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param searchRecommendRules.searchRecommendRulesParams - The searchRecommendRulesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    searchRecommendRules({ indexName, model, searchRecommendRulesParams }, requestOptions) {
      if (!indexName) {
        throw new Error("Parameter `indexName` is required when calling `searchRecommendRules`.");
      }
      if (!model) {
        throw new Error("Parameter `model` is required when calling `searchRecommendRules`.");
      }
      const requestPath = "/1/indexes/{indexName}/{model}/recommend/rules/search".replace("{indexName}", encodeURIComponent(indexName)).replace("{model}", encodeURIComponent(model));
      const headers = {};
      const queryParameters = {};
      const request = {
        method: "POST",
        path: requestPath,
        queryParameters,
        headers,
        data: searchRecommendRulesParams ? searchRecommendRulesParams : {},
        useReadTransporter: true,
        cacheable: true
      };
      return transporter.request(request, requestOptions);
    }
  };
}

// builds/browser.ts
function recommendClient(appId, apiKey, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  return createRecommendClient({
    appId,
    apiKey,
    timeouts: {
      connect: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_CONNECT_TIMEOUT_BROWSER,
      read: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_READ_TIMEOUT_BROWSER,
      write: _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_WRITE_TIMEOUT_BROWSER
    },
    logger: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createNullLogger)(),
    requester: (0,_algolia_requester_browser_xhr__WEBPACK_IMPORTED_MODULE_0__.createXhrRequester)(),
    algoliaAgents: [{ segment: "Browser" }],
    authMode: "WithinQueryParameters",
    responsesCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)(),
    requestsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)({ serializable: false }),
    hostsCache: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createFallbackableCache)({
      caches: [(0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createBrowserLocalStorageCache)({ key: `${apiClientVersion}-${appId}` }), (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createMemoryCache)()]
    }),
    ...options
  });
}

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/@algolia/requester-browser-xhr/dist/requester.xhr.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@algolia/requester-browser-xhr/dist/requester.xhr.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createXhrRequester: () => (/* binding */ m)
/* harmony export */ });
function m(){function r(t){return new Promise(s=>{let e=new XMLHttpRequest;e.open(t.method,t.url,!0),Object.keys(t.headers).forEach(n=>e.setRequestHeader(n,t.headers[n]));let i=(n,a)=>setTimeout(()=>{e.abort(),s({status:0,content:a,isTimedOut:!0})},n),u=i(t.connectTimeout,"Connection timeout"),o;e.onreadystatechange=()=>{e.readyState>e.OPENED&&o===void 0&&(clearTimeout(u),o=i(t.responseTimeout,"Socket timeout"))},e.onerror=()=>{e.status===0&&(clearTimeout(u),clearTimeout(o),s({content:e.responseText||"Network request failed",status:e.status,isTimedOut:!1}))},e.onload=()=>{clearTimeout(u),clearTimeout(o),s({content:e.responseText,status:e.status,isTimedOut:!1})},e.send(t.data)})}return{send:r}}
//# sourceMappingURL=requester.xhr.js.map

/***/ }),

/***/ "./node_modules/algoliasearch/dist/browser.js":
/*!****************************************************!*\
  !*** ./node_modules/algoliasearch/dist/browser.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   algoliasearch: () => (/* binding */ algoliasearch),
/* harmony export */   apiClientVersion: () => (/* reexport safe */ _algolia_client_search__WEBPACK_IMPORTED_MODULE_0__.apiClientVersion)
/* harmony export */ });
/* harmony import */ var _algolia_client_abtesting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/client-abtesting */ "./node_modules/@algolia/client-abtesting/dist/builds/browser.js");
/* harmony import */ var _algolia_client_analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @algolia/client-analytics */ "./node_modules/@algolia/client-analytics/dist/builds/browser.js");
/* harmony import */ var _algolia_client_insights__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @algolia/client-insights */ "./node_modules/@algolia/client-insights/dist/builds/browser.js");
/* harmony import */ var _algolia_client_personalization__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @algolia/client-personalization */ "./node_modules/@algolia/client-personalization/dist/builds/browser.js");
/* harmony import */ var _algolia_client_query_suggestions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @algolia/client-query-suggestions */ "./node_modules/@algolia/client-query-suggestions/dist/builds/browser.js");
/* harmony import */ var _algolia_client_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/client-search */ "./node_modules/@algolia/client-search/dist/builds/browser.js");
/* harmony import */ var _algolia_ingestion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @algolia/ingestion */ "./node_modules/@algolia/ingestion/dist/builds/browser.js");
/* harmony import */ var _algolia_monitoring__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @algolia/monitoring */ "./node_modules/@algolia/monitoring/dist/builds/browser.js");
/* harmony import */ var _algolia_recommend__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @algolia/recommend */ "./node_modules/@algolia/recommend/dist/builds/browser.js");
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// builds/browser.ts
var browser_exports = {};
__export(browser_exports, {
  algoliasearch: () => algoliasearch,
  apiClientVersion: () => _algolia_client_search__WEBPACK_IMPORTED_MODULE_0__.apiClientVersion
});










// builds/models.ts
var models_exports = {};
__export(models_exports, {
  apiClientVersion: () => _algolia_client_search__WEBPACK_IMPORTED_MODULE_0__.apiClientVersion
});
__reExport(models_exports, _algolia_client_abtesting__WEBPACK_IMPORTED_MODULE_1__);
__reExport(models_exports, _algolia_client_analytics__WEBPACK_IMPORTED_MODULE_2__);
__reExport(models_exports, _algolia_client_insights__WEBPACK_IMPORTED_MODULE_3__);
__reExport(models_exports, _algolia_client_personalization__WEBPACK_IMPORTED_MODULE_4__);
__reExport(models_exports, _algolia_client_query_suggestions__WEBPACK_IMPORTED_MODULE_5__);
__reExport(models_exports, _algolia_client_search__WEBPACK_IMPORTED_MODULE_0__);
__reExport(models_exports, _algolia_ingestion__WEBPACK_IMPORTED_MODULE_6__);
__reExport(models_exports, _algolia_monitoring__WEBPACK_IMPORTED_MODULE_7__);
__reExport(models_exports, _algolia_recommend__WEBPACK_IMPORTED_MODULE_8__);











// builds/browser.ts
__reExport(browser_exports, models_exports);
function algoliasearch(appId, apiKey, options) {
  if (!appId || typeof appId !== "string") {
    throw new Error("`appId` is missing.");
  }
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("`apiKey` is missing.");
  }
  const client = (0,_algolia_client_search__WEBPACK_IMPORTED_MODULE_0__.searchClient)(appId, apiKey, options);
  return {
    ...client,
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua() {
      return client.transporter.algoliaAgent.value;
    },
    initAbtesting: (initOptions) => {
      return (0,_algolia_client_abtesting__WEBPACK_IMPORTED_MODULE_1__.abtestingClient)(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initAnalytics: (initOptions) => {
      return (0,_algolia_client_analytics__WEBPACK_IMPORTED_MODULE_2__.analyticsClient)(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initIngestion: (initOptions) => {
      return (0,_algolia_ingestion__WEBPACK_IMPORTED_MODULE_6__.ingestionClient)(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initInsights: (initOptions) => {
      return (0,_algolia_client_insights__WEBPACK_IMPORTED_MODULE_3__.insightsClient)(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initMonitoring: (initOptions = {}) => {
      return (0,_algolia_monitoring__WEBPACK_IMPORTED_MODULE_7__.monitoringClient)(initOptions.appId || appId, initOptions.apiKey || apiKey, initOptions.options);
    },
    initPersonalization: (initOptions) => {
      return (0,_algolia_client_personalization__WEBPACK_IMPORTED_MODULE_4__.personalizationClient)(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initQuerySuggestions: (initOptions) => {
      return (0,_algolia_client_query_suggestions__WEBPACK_IMPORTED_MODULE_5__.querySuggestionsClient)(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options
      );
    },
    initRecommend: (initOptions = {}) => {
      return (0,_algolia_recommend__WEBPACK_IMPORTED_MODULE_8__.recommendClient)(initOptions.appId || appId, initOptions.apiKey || apiKey, initOptions.options);
    }
  };
}

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "./node_modules/mustache/mustache.mjs":
/*!********************************************!*\
  !*** ./node_modules/mustache/mustache.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

var objectToString = Object.prototype.toString;
var isArray = Array.isArray || function isArrayPolyfill (object) {
  return objectToString.call(object) === '[object Array]';
};

function isFunction (object) {
  return typeof object === 'function';
}

/**
 * More correct typeof string handling array
 * which normally returns typeof 'object'
 */
function typeStr (obj) {
  return isArray(obj) ? 'array' : typeof obj;
}

function escapeRegExp (string) {
  return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
}

/**
 * Null safe way of checking whether or not an object,
 * including its prototype, has a given property
 */
function hasProperty (obj, propName) {
  return obj != null && typeof obj === 'object' && (propName in obj);
}

/**
 * Safe way of detecting whether or not the given thing is a primitive and
 * whether it has the given property
 */
function primitiveHasOwnProperty (primitive, propName) {
  return (
    primitive != null
    && typeof primitive !== 'object'
    && primitive.hasOwnProperty
    && primitive.hasOwnProperty(propName)
  );
}

// Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
// See https://github.com/janl/mustache.js/issues/189
var regExpTest = RegExp.prototype.test;
function testRegExp (re, string) {
  return regExpTest.call(re, string);
}

var nonSpaceRe = /\S/;
function isWhitespace (string) {
  return !testRegExp(nonSpaceRe, string);
}

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
    return entityMap[s];
  });
}

var whiteRe = /\s*/;
var spaceRe = /\s+/;
var equalsRe = /\s*=/;
var curlyRe = /\s*\}/;
var tagRe = /#|\^|\/|>|\{|&|=|!/;

/**
 * Breaks up the given `template` string into a tree of tokens. If the `tags`
 * argument is given here it must be an array with two string values: the
 * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
 * course, the default is to use mustaches (i.e. mustache.tags).
 *
 * A token is an array with at least 4 elements. The first element is the
 * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
 * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
 * all text that appears outside a symbol this element is "text".
 *
 * The second element of a token is its "value". For mustache tags this is
 * whatever else was inside the tag besides the opening symbol. For text tokens
 * this is the text itself.
 *
 * The third and fourth elements of the token are the start and end indices,
 * respectively, of the token in the original template.
 *
 * Tokens that are the root node of a subtree contain two more elements: 1) an
 * array of tokens in the subtree and 2) the index in the original template at
 * which the closing tag for that section begins.
 *
 * Tokens for partials also contain two more elements: 1) a string value of
 * indendation prior to that tag and 2) the index of that tag on that line -
 * eg a value of 2 indicates the partial is the third tag on this line.
 */
function parseTemplate (template, tags) {
  if (!template)
    return [];
  var lineHasNonSpace = false;
  var sections = [];     // Stack to hold section tokens
  var tokens = [];       // Buffer to hold the tokens
  var spaces = [];       // Indices of whitespace tokens on the current line
  var hasTag = false;    // Is there a {{tag}} on the current line?
  var nonSpace = false;  // Is there a non-space char on the current line?
  var indentation = '';  // Tracks indentation for tags that use it
  var tagIndex = 0;      // Stores a count of number of tags encountered on a line

  // Strips all whitespace tokens array for the current line
  // if there was a {{#tag}} on it and otherwise only space.
  function stripSpace () {
    if (hasTag && !nonSpace) {
      while (spaces.length)
        delete tokens[spaces.pop()];
    } else {
      spaces = [];
    }

    hasTag = false;
    nonSpace = false;
  }

  var openingTagRe, closingTagRe, closingCurlyRe;
  function compileTags (tagsToCompile) {
    if (typeof tagsToCompile === 'string')
      tagsToCompile = tagsToCompile.split(spaceRe, 2);

    if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
      throw new Error('Invalid tags: ' + tagsToCompile);

    openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
    closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
    closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
  }

  compileTags(tags || mustache.tags);

  var scanner = new Scanner(template);

  var start, type, value, chr, token, openSection;
  while (!scanner.eos()) {
    start = scanner.pos;

    // Match any text between tags.
    value = scanner.scanUntil(openingTagRe);

    if (value) {
      for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
        chr = value.charAt(i);

        if (isWhitespace(chr)) {
          spaces.push(tokens.length);
          indentation += chr;
        } else {
          nonSpace = true;
          lineHasNonSpace = true;
          indentation += ' ';
        }

        tokens.push([ 'text', chr, start, start + 1 ]);
        start += 1;

        // Check for whitespace on the current line.
        if (chr === '\n') {
          stripSpace();
          indentation = '';
          tagIndex = 0;
          lineHasNonSpace = false;
        }
      }
    }

    // Match the opening tag.
    if (!scanner.scan(openingTagRe))
      break;

    hasTag = true;

    // Get the tag type.
    type = scanner.scan(tagRe) || 'name';
    scanner.scan(whiteRe);

    // Get the tag value.
    if (type === '=') {
      value = scanner.scanUntil(equalsRe);
      scanner.scan(equalsRe);
      scanner.scanUntil(closingTagRe);
    } else if (type === '{') {
      value = scanner.scanUntil(closingCurlyRe);
      scanner.scan(curlyRe);
      scanner.scanUntil(closingTagRe);
      type = '&';
    } else {
      value = scanner.scanUntil(closingTagRe);
    }

    // Match the closing tag.
    if (!scanner.scan(closingTagRe))
      throw new Error('Unclosed tag at ' + scanner.pos);

    if (type == '>') {
      token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
    } else {
      token = [ type, value, start, scanner.pos ];
    }
    tagIndex++;
    tokens.push(token);

    if (type === '#' || type === '^') {
      sections.push(token);
    } else if (type === '/') {
      // Check section nesting.
      openSection = sections.pop();

      if (!openSection)
        throw new Error('Unopened section "' + value + '" at ' + start);

      if (openSection[1] !== value)
        throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
    } else if (type === 'name' || type === '{' || type === '&') {
      nonSpace = true;
    } else if (type === '=') {
      // Set the tags for the next time around.
      compileTags(value);
    }
  }

  stripSpace();

  // Make sure there are no open sections when we're done.
  openSection = sections.pop();

  if (openSection)
    throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

  return nestTokens(squashTokens(tokens));
}

/**
 * Combines the values of consecutive text tokens in the given `tokens` array
 * to a single token.
 */
function squashTokens (tokens) {
  var squashedTokens = [];

  var token, lastToken;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];

    if (token) {
      if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
      } else {
        squashedTokens.push(token);
        lastToken = token;
      }
    }
  }

  return squashedTokens;
}

/**
 * Forms the given array of `tokens` into a nested tree structure where
 * tokens that represent a section have two additional items: 1) an array of
 * all tokens that appear in that section and 2) the index in the original
 * template that represents the end of that section.
 */
function nestTokens (tokens) {
  var nestedTokens = [];
  var collector = nestedTokens;
  var sections = [];

  var token, section;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];

    switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
    }
  }

  return nestedTokens;
}

/**
 * A simple string scanner that is used by the template parser to find
 * tokens in template strings.
 */
function Scanner (string) {
  this.string = string;
  this.tail = string;
  this.pos = 0;
}

/**
 * Returns `true` if the tail is empty (end of string).
 */
Scanner.prototype.eos = function eos () {
  return this.tail === '';
};

/**
 * Tries to match the given regular expression at the current position.
 * Returns the matched text if it can match, the empty string otherwise.
 */
Scanner.prototype.scan = function scan (re) {
  var match = this.tail.match(re);

  if (!match || match.index !== 0)
    return '';

  var string = match[0];

  this.tail = this.tail.substring(string.length);
  this.pos += string.length;

  return string;
};

/**
 * Skips all text until the given regular expression can be matched. Returns
 * the skipped string, which is the entire tail if no match can be made.
 */
Scanner.prototype.scanUntil = function scanUntil (re) {
  var index = this.tail.search(re), match;

  switch (index) {
    case -1:
      match = this.tail;
      this.tail = '';
      break;
    case 0:
      match = '';
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
  }

  this.pos += match.length;

  return match;
};

/**
 * Represents a rendering context by wrapping a view object and
 * maintaining a reference to the parent context.
 */
function Context (view, parentContext) {
  this.view = view;
  this.cache = { '.': this.view };
  this.parent = parentContext;
}

/**
 * Creates a new context using the given view with this context
 * as the parent.
 */
Context.prototype.push = function push (view) {
  return new Context(view, this);
};

/**
 * Returns the value of the given name in this context, traversing
 * up the context hierarchy if the value is absent in this context's view.
 */
Context.prototype.lookup = function lookup (name) {
  var cache = this.cache;

  var value;
  if (cache.hasOwnProperty(name)) {
    value = cache[name];
  } else {
    var context = this, intermediateValue, names, index, lookupHit = false;

    while (context) {
      if (name.indexOf('.') > 0) {
        intermediateValue = context.view;
        names = name.split('.');
        index = 0;

        /**
         * Using the dot notion path in `name`, we descend through the
         * nested objects.
         *
         * To be certain that the lookup has been successful, we have to
         * check if the last object in the path actually has the property
         * we are looking for. We store the result in `lookupHit`.
         *
         * This is specially necessary for when the value has been set to
         * `undefined` and we want to avoid looking up parent contexts.
         *
         * In the case where dot notation is used, we consider the lookup
         * to be successful even if the last "object" in the path is
         * not actually an object but a primitive (e.g., a string, or an
         * integer), because it is sometimes useful to access a property
         * of an autoboxed primitive, such as the length of a string.
         **/
        while (intermediateValue != null && index < names.length) {
          if (index === names.length - 1)
            lookupHit = (
              hasProperty(intermediateValue, names[index])
              || primitiveHasOwnProperty(intermediateValue, names[index])
            );

          intermediateValue = intermediateValue[names[index++]];
        }
      } else {
        intermediateValue = context.view[name];

        /**
         * Only checking against `hasProperty`, which always returns `false` if
         * `context.view` is not an object. Deliberately omitting the check
         * against `primitiveHasOwnProperty` if dot notation is not used.
         *
         * Consider this example:
         * ```
         * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
         * ```
         *
         * If we were to check also against `primitiveHasOwnProperty`, as we do
         * in the dot notation case, then render call would return:
         *
         * "The length of a football field is 9."
         *
         * rather than the expected:
         *
         * "The length of a football field is 100 yards."
         **/
        lookupHit = hasProperty(context.view, name);
      }

      if (lookupHit) {
        value = intermediateValue;
        break;
      }

      context = context.parent;
    }

    cache[name] = value;
  }

  if (isFunction(value))
    value = value.call(this.view);

  return value;
};

/**
 * A Writer knows how to take a stream of tokens and render them to a
 * string, given a context. It also maintains a cache of templates to
 * avoid the need to parse the same template twice.
 */
function Writer () {
  this.templateCache = {
    _cache: {},
    set: function set (key, value) {
      this._cache[key] = value;
    },
    get: function get (key) {
      return this._cache[key];
    },
    clear: function clear () {
      this._cache = {};
    }
  };
}

/**
 * Clears all cached templates in this writer.
 */
Writer.prototype.clearCache = function clearCache () {
  if (typeof this.templateCache !== 'undefined') {
    this.templateCache.clear();
  }
};

/**
 * Parses and caches the given `template` according to the given `tags` or
 * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
 * that is generated from the parse.
 */
Writer.prototype.parse = function parse (template, tags) {
  var cache = this.templateCache;
  var cacheKey = template + ':' + (tags || mustache.tags).join(':');
  var isCacheEnabled = typeof cache !== 'undefined';
  var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;

  if (tokens == undefined) {
    tokens = parseTemplate(template, tags);
    isCacheEnabled && cache.set(cacheKey, tokens);
  }
  return tokens;
};

/**
 * High-level method that is used to render the given `template` with
 * the given `view`.
 *
 * The optional `partials` argument may be an object that contains the
 * names and templates of partials that are used in the template. It may
 * also be a function that is used to load partial templates on the fly
 * that takes a single argument: the name of the partial.
 *
 * If the optional `config` argument is given here, then it should be an
 * object with a `tags` attribute or an `escape` attribute or both.
 * If an array is passed, then it will be interpreted the same way as
 * a `tags` attribute on a `config` object.
 *
 * The `tags` attribute of a `config` object must be an array with two
 * string values: the opening and closing tags used in the template (e.g.
 * [ "<%", "%>" ]). The default is to mustache.tags.
 *
 * The `escape` attribute of a `config` object must be a function which
 * accepts a string as input and outputs a safely escaped string.
 * If an `escape` function is not provided, then an HTML-safe string
 * escaping function is used as the default.
 */
Writer.prototype.render = function render (template, view, partials, config) {
  var tags = this.getConfigTags(config);
  var tokens = this.parse(template, tags);
  var context = (view instanceof Context) ? view : new Context(view, undefined);
  return this.renderTokens(tokens, context, partials, template, config);
};

/**
 * Low-level method that renders the given array of `tokens` using
 * the given `context` and `partials`.
 *
 * Note: The `originalTemplate` is only ever used to extract the portion
 * of the original template that was contained in a higher-order section.
 * If the template doesn't use higher-order sections, this argument may
 * be omitted.
 */
Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, config) {
  var buffer = '';

  var token, symbol, value;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    value = undefined;
    token = tokens[i];
    symbol = token[0];

    if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
    else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
    else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
    else if (symbol === '&') value = this.unescapedValue(token, context);
    else if (symbol === 'name') value = this.escapedValue(token, context, config);
    else if (symbol === 'text') value = this.rawValue(token);

    if (value !== undefined)
      buffer += value;
  }

  return buffer;
};

Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate, config) {
  var self = this;
  var buffer = '';
  var value = context.lookup(token[1]);

  // This function is used to render an arbitrary template
  // in the current context by higher-order sections.
  function subRender (template) {
    return self.render(template, context, partials, config);
  }

  if (!value) return;

  if (isArray(value)) {
    for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
      buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
    }
  } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
    buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
  } else if (isFunction(value)) {
    if (typeof originalTemplate !== 'string')
      throw new Error('Cannot use higher-order sections without the original template');

    // Extract the portion of the original template that the section contains.
    value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

    if (value != null)
      buffer += value;
  } else {
    buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
  }
  return buffer;
};

Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate, config) {
  var value = context.lookup(token[1]);

  // Use JavaScript's definition of falsy. Include empty arrays.
  // See https://github.com/janl/mustache.js/issues/186
  if (!value || (isArray(value) && value.length === 0))
    return this.renderTokens(token[4], context, partials, originalTemplate, config);
};

Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
  var filteredIndentation = indentation.replace(/[^ \t]/g, '');
  var partialByNl = partial.split('\n');
  for (var i = 0; i < partialByNl.length; i++) {
    if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
      partialByNl[i] = filteredIndentation + partialByNl[i];
    }
  }
  return partialByNl.join('\n');
};

Writer.prototype.renderPartial = function renderPartial (token, context, partials, config) {
  if (!partials) return;
  var tags = this.getConfigTags(config);

  var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
  if (value != null) {
    var lineHasNonSpace = token[6];
    var tagIndex = token[5];
    var indentation = token[4];
    var indentedValue = value;
    if (tagIndex == 0 && indentation) {
      indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
    }
    var tokens = this.parse(indentedValue, tags);
    return this.renderTokens(tokens, context, partials, indentedValue, config);
  }
};

Writer.prototype.unescapedValue = function unescapedValue (token, context) {
  var value = context.lookup(token[1]);
  if (value != null)
    return value;
};

Writer.prototype.escapedValue = function escapedValue (token, context, config) {
  var escape = this.getConfigEscape(config) || mustache.escape;
  var value = context.lookup(token[1]);
  if (value != null)
    return (typeof value === 'number' && escape === mustache.escape) ? String(value) : escape(value);
};

Writer.prototype.rawValue = function rawValue (token) {
  return token[1];
};

Writer.prototype.getConfigTags = function getConfigTags (config) {
  if (isArray(config)) {
    return config;
  }
  else if (config && typeof config === 'object') {
    return config.tags;
  }
  else {
    return undefined;
  }
};

Writer.prototype.getConfigEscape = function getConfigEscape (config) {
  if (config && typeof config === 'object' && !isArray(config)) {
    return config.escape;
  }
  else {
    return undefined;
  }
};

var mustache = {
  name: 'mustache.js',
  version: '4.2.0',
  tags: [ '{{', '}}' ],
  clearCache: undefined,
  escape: undefined,
  parse: undefined,
  render: undefined,
  Scanner: undefined,
  Context: undefined,
  Writer: undefined,
  /**
   * Allows a user to override the default caching strategy, by providing an
   * object with set, get and clear methods. This can also be used to disable
   * the cache by setting it to the literal `undefined`.
   */
  set templateCache (cache) {
    defaultWriter.templateCache = cache;
  },
  /**
   * Gets the default or overridden caching object from the default writer.
   */
  get templateCache () {
    return defaultWriter.templateCache;
  }
};

// All high-level mustache.* functions use this writer.
var defaultWriter = new Writer();

/**
 * Clears all cached templates in the default writer.
 */
mustache.clearCache = function clearCache () {
  return defaultWriter.clearCache();
};

/**
 * Parses and caches the given template in the default writer and returns the
 * array of tokens it contains. Doing this ahead of time avoids the need to
 * parse templates on the fly as they are rendered.
 */
mustache.parse = function parse (template, tags) {
  return defaultWriter.parse(template, tags);
};

/**
 * Renders the `template` with the given `view`, `partials`, and `config`
 * using the default writer.
 */
mustache.render = function render (template, view, partials, config) {
  if (typeof template !== 'string') {
    throw new TypeError('Invalid template! Template should be a "string" ' +
                        'but "' + typeStr(template) + '" was given as the first ' +
                        'argument for mustache#render(template, view, partials)');
  }

  return defaultWriter.render(template, view, partials, config);
};

// Export the escaping function so that the user may override it.
// See https://github.com/janl/mustache.js/issues/244
mustache.escape = escapeHtml;

// Export these mainly for testing, but also for advanced usage.
mustache.Scanner = Scanner;
mustache.Context = Context;
mustache.Writer = Writer;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mustache);


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
  !*** ./src/extensions/search/algolia/app/src/start.ts ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _search_algolia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search/algolia */ "./src/extensions/search/algolia/app/src/search/algolia.ts");

window.StaticSnapFrontend.Search.addModule(new _search_algolia__WEBPACK_IMPORTED_MODULE_0__["default"](window.StaticSnapFrontend));
})();

/******/ })()
;
//# sourceMappingURL=algolia.js.map