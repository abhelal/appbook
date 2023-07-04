"use strict";
exports.id = 104;
exports.ids = [104];
exports.modules = {

/***/ 4104:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const axios = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseURL: "https://api.app-book.co.uk",
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
});
axios.interceptors.request.use(async function(config) {
    let access_token;
    if (false) {}
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axios);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;