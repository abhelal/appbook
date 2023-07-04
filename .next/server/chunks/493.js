"use strict";
exports.id = 493;
exports.ids = [493];
exports.modules = {

/***/ 1493:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Kx": () => (/* binding */ TextArea),
/* harmony export */   "Sr": () => (/* binding */ SelectWithLabel),
/* harmony export */   "sp": () => (/* binding */ InputWithLabel)
/* harmony export */ });
/* unused harmony exports TextInput, CheckBox, RadioButton */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function TextInput({ ...props }) {
    return /*#__PURE__*/ _jsx("input", {
        ...props,
        className: "text-gray-600 py-1 rounded shadow-sm border-gray-300 focus:border-primary-100 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-50"
    });
}
function TextArea({ ...props }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
        ...props,
        className: "w-full border rounded focus:outline-none focus:ring-1 ring-primary-500 focus:border-0 p-1 text-xs"
    });
}
function CheckBox({ ...props }) {
    return /*#__PURE__*/ _jsx("input", {
        ...props,
        type: "checkbox",
        className: "rounded border-gray-300 text-primary-500 shadow-sm hover:border-primary-300 focus:border-primary-300 hover:ring hover:ring-primary-200 hover:ring-opacity-50 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
    });
}
function RadioButton({ ...props }) {
    return /*#__PURE__*/ _jsx("input", {
        ...props,
        type: "radio",
        className: "border-gray-300 text-primary-500 shadow-sm hover:border-primary-300 hover:ring hover:ring-primary-200 hover:ring-opacity-50 focus:ring-0 focus:ring-primary-200 focus:ring-opacity-50"
    });
}
function InputWithLabel({ field , form , ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "relative flex w-full border border-gray-300 rounded-md px-3 py-2 mt-3 shadow-sm focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-200",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                htmlFor: props.label,
                className: "absolute -top-2 left-6 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900",
                children: props.label
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                ...field,
                ...props,
                className: "block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none sm:text-sm"
            })
        ]
    });
}
function SelectWithLabel({ field , form , ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "relative flex w-full border border-gray-300 rounded-md px-3 py-2 mt-3 shadow-sm focus:outline-none focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-200",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                htmlFor: props.label,
                className: "absolute -top-2 left-6 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900",
                children: props.label
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                ...field,
                ...props,
                className: "block w-full border-0 p-0 focus:outline-none text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            })
        ]
    });
}


/***/ })

};
;