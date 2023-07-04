"use strict";
exports.id = 643;
exports.ids = [643];
exports.modules = {

/***/ 1415:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _libs_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4104);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_libs_axios__WEBPACK_IMPORTED_MODULE_0__]);
_libs_axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const getNotification = async ()=>{
    const res = await _libs_axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get("/api/v1/notification/all");
    return res.data;
};
const notificationService = {
    getNotification
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notificationService);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9643:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TH": () => (/* binding */ getNotifications),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports notificationSlice, reset */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _notificationService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1415);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_notificationService__WEBPACK_IMPORTED_MODULE_1__]);
_notificationService__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const initialState = {
    notifications: [],
    unreaded: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};
const getNotifications = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("/notifications/getnotification", async ({}, thunkAPI)=>{
    try {
        const res = await _notificationService__WEBPACK_IMPORTED_MODULE_1__/* ["default"].getNotification */ .Z.getNotification();
        if (res.status === 0) {
            const message = res.remarks;
            return thunkAPI.rejectWithValue(message);
        }
        if (res) {
            return thunkAPI.fulfillWithValue(res);
        }
    } catch (error) {
        const message1 = error.response && error.response.data && error.response.data.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message1);
    }
});
const notificationSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "notifications",
    initialState,
    reducers: {
        reset: (state)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getNotifications.pending, (state)=>{
            state.isLoading = true;
        }).addCase(getNotifications.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.notifications = action.payload.data;
            state.unreaded = action.payload.unreaded;
        }).addCase(getNotifications.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.notifications = null;
            state.unreaded = null;
        });
    }
});
const { reset  } = notificationSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notificationSlice.reducer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;