"use strict";
exports.id = 232;
exports.ids = [232];
exports.modules = {

/***/ 8256:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _libs_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4104);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_libs_axios__WEBPACK_IMPORTED_MODULE_0__]);
_libs_axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

// get FavouriteBusiness
const getFavouriteBusiness = async (userId)=>{
    const res = await _libs_axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(`/api/v1/business/getfav?id=${userId}`);
    return res.data;
};
const businessService = {
    getFavouriteBusiness
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (businessService);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 232:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "j": () => (/* binding */ getFavouriteBusiness),
/* harmony export */   "nK": () => (/* binding */ setBusiness)
/* harmony export */ });
/* unused harmony export businessSlice */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _businessService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8256);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_businessService__WEBPACK_IMPORTED_MODULE_1__]);
_businessService__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const initialState = {
    business: [],
    favBusiness: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};
// getFavourite business
const getFavouriteBusiness = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("/business/getFavouriteBusiness", async (userId, thunkAPI)=>{
    try {
        const res = await _businessService__WEBPACK_IMPORTED_MODULE_1__/* ["default"].getFavouriteBusiness */ .Z.getFavouriteBusiness(userId);
        if (res.status === 0) {
            const message = res.remarks;
            return thunkAPI.rejectWithValue(message);
        }
        if (res.status === 1) {
            const favBusiness = res.data;
            return thunkAPI.fulfillWithValue(favBusiness);
        }
    } catch (error) {
        const message1 = error.response && error.response.data && error.response.data.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message1);
    }
});
const businessSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "business",
    initialState,
    reducers: {
        setBusiness: (state, action)=>{
            state.business = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getFavouriteBusiness.pending, (state)=>{
            state.isLoading = true;
        }).addCase(getFavouriteBusiness.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.favBusiness = action.payload;
        }).addCase(getFavouriteBusiness.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.favBusiness = null;
        });
    }
});
const { setBusiness  } = businessSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (businessSlice.reducer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;