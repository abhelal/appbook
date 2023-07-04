"use strict";
exports.id = 563;
exports.ids = [563];
exports.modules = {

/***/ 1563:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Xq": () => (/* binding */ addToCart),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "h2": () => (/* binding */ removeFromCart),
/* harmony export */   "mc": () => (/* binding */ reset)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

let localItem;
if (false) {}
const initialState = localItem ? localItem : [];
const cartSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "cart",
    initialState,
    reducers: {
        reset: (state)=>{
            localStorage.removeItem("storredItem");
            state.splice(0, state.length);
        },
        addToCart: (state, action)=>{
            const existsBusiness = state.find((business)=>business.business_id === action.payload.business_id);
            if (existsBusiness) {
                existsBusiness.service.push({
                    ...action.payload.service[0]
                });
            } else {
                state.push({
                    ...action.payload
                });
            }
            localStorage.setItem("storredItem", JSON.stringify(state));
        },
        removeFromCart: (state, action)=>{
            console.log(action.payload);
            const existsBusiness = state.find((business)=>business.business_id === action.payload.business_id);
            existsBusiness.service.splice(action.payload.serviceIndex, 1);
            localStorage.setItem("storredItem", JSON.stringify(state));
        }
    }
});
const { reset , addToCart , removeFromCart  } = cartSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cartSlice.reducer);


/***/ })

};
;