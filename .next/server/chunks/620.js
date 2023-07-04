"use strict";
exports.id = 620;
exports.ids = [620];
exports.modules = {

/***/ 40:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _libs_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4104);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_libs_axios__WEBPACK_IMPORTED_MODULE_0__]);
_libs_axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const check_user = async (values)=>{
    const response = await _libs_axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post("/api/v1/user/check_user", values);
    if (response.data.ststus === 1) {
        localStorage.setItem("checked_user", JSON.stringify(values));
    }
    return response.data;
};
const cancell_reg = ()=>{
    localStorage.removeItem("checked_user");
};
// Register user
const register = async (values)=>{
    const response = await _libs_axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post("/api/v1/user/register", values);
    if (response.data.status === 1) {
        localStorage.setItem("access_token", response.data.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
};
// Login user
const login = async (values)=>{
    const response = await _libs_axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post("/api/v1/user/login", values);
    if (response.data.status === 1) {
        localStorage.setItem("access_token", response.data.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
};
// Logout user
const logout = async (values)=>{
    const response = await _libs_axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post("/api/v1/user/logout", values);
    return response.data;
};
// Forgot Password
const forgetPassword = async (values)=>{
    const response = await _libs_axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post("/user/forgetPassword", values);
    return response.data;
};
// change User Password
const changeUserPassword = async (values)=>{
    const response = await _libs_axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post("/user/changeUserPassword", values);
    return response.data;
};
// update user Profile
const updateProfile = async (values)=>{
    const response = await _libs_axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post(`/api/v1/user/updateProfile/?id=${values.get("id")}`, values);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
};
const authService = {
    register,
    login,
    logout,
    forgetPassword,
    changeUserPassword,
    updateProfile,
    check_user,
    cancell_reg
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authService);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2620:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "ck": () => (/* binding */ updateProfile),
/* harmony export */   "kS": () => (/* binding */ logout),
/* harmony export */   "mc": () => (/* binding */ reset),
/* harmony export */   "x4": () => (/* binding */ login),
/* harmony export */   "z2": () => (/* binding */ register)
/* harmony export */ });
/* unused harmony exports forgetPassword, changeUserPassword, authSlice */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _authService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_authService__WEBPACK_IMPORTED_MODULE_1__]);
_authService__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


let user;
if (false) {}
const initialState = {
    user: user ? user : null,
    isError: false,
    isAvailable: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};
// Register user
const register = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("user/register", async (user, thunkAPI)=>{
    try {
        const res = await _authService__WEBPACK_IMPORTED_MODULE_1__/* ["default"].register */ .Z.register(user);
        if (res.status === 0) {
            const message = res.remarks;
            return thunkAPI.rejectWithValue(message);
        }
        if (res.status === 1) {
            return thunkAPI.fulfillWithValue(res.data);
        }
    } catch (error) {
        const message1 = error.response && error.response.data && error.response.data.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message1);
    }
});
// Login user
const login = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("/user/login", async (user, thunkAPI)=>{
    try {
        const res = await _authService__WEBPACK_IMPORTED_MODULE_1__/* ["default"].login */ .Z.login(user);
        if (res.status === 0) {
            const message = res.remarks;
            return thunkAPI.rejectWithValue(message);
        } else return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
        const message1 = error.response && error.response.data && error.response.data.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message1);
    }
});
// Logout user
const logout = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("/user/logout", async (user, thunkAPI)=>{
    try {
        const res = await _authService__WEBPACK_IMPORTED_MODULE_1__/* ["default"].logout */ .Z.logout(user);
        if (res.status === 0) {
            const message = res.remarks;
            return thunkAPI.rejectWithValue(message);
        }
        if (res.status === 1) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            const message1 = res.remarks;
            return thunkAPI.fulfillWithValue(message1);
        }
    } catch (error) {
        const message2 = error.response && error.response.data && error.response.data.remarks || error.remarks || error.toString();
        return thunkAPI.rejectWithValue(message2);
    }
});
// Forgot Password
const forgetPassword = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("/user/forgetPassword", async (email, thunkAPI)=>{
    try {
        const res = await _authService__WEBPACK_IMPORTED_MODULE_1__/* ["default"].forgetPassword */ .Z.forgetPassword(email);
        if (res.error) {
            const message = res.message;
            return thunkAPI.rejectWithValue(message);
        }
        if (res.status === 1) {
            return thunkAPI.fulfillWithValue(res.data);
        }
    } catch (error) {
        const message1 = error.response && error.response.data && error.response.data.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message1);
    }
});
const changeUserPassword = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("/user/changeUserPassword", async (user, thunkAPI)=>{
    try {
        const res = await _authService__WEBPACK_IMPORTED_MODULE_1__/* ["default"].changeUserPassword */ .Z.changeUserPassword(user);
        if (res.status === 0) {
            const message = res.remarks;
            return thunkAPI.rejectWithValue(message);
        }
        if (res.status === 1) {
            const message1 = res.remarks;
            return thunkAPI.fulfillWithValue(message1);
        }
    } catch (error) {
        const message2 = error.response && error.response.data && error.response.data.remarks || error.remarks || error.toString();
        return thunkAPI.rejectWithValue(message2);
    }
});
const updateProfile = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("/user/updateProfile", async (user, thunkAPI)=>{
    try {
        const res = await _authService__WEBPACK_IMPORTED_MODULE_1__/* ["default"].updateProfile */ .Z.updateProfile(user);
        if (res.error) {
            const message = res.remarks;
            return thunkAPI.rejectWithValue(message);
        }
        if (res.status === 1) {
            const message1 = res.remarks;
            return thunkAPI.fulfillWithValue(message1);
        }
    } catch (error) {
        const message2 = error.response && error.response.data && error.response.data.remarks || error.remarks || error.toString();
        return thunkAPI.rejectWithValue(message2);
    }
});
const authSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "auth",
    initialState,
    reducers: {
        reset: (state)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.isAvailable = false;
            state.message = "";
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(register.pending, (state)=>{
            state.isLoading = true;
        }).addCase(register.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        }).addCase(register.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        }).addCase(login.pending, (state)=>{
            state.isLoading = true;
        }).addCase(login.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        }).addCase(login.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        }).addCase(logout.pending, (state)=>{
            state.isLoading = true;
        }).addCase(logout.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
            state.user = null;
        }).addCase(logout.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        }).addCase(forgetPassword.pending, (state)=>{
            state.isLoading = true;
        }).addCase(forgetPassword.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
        }).addCase(forgetPassword.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        }).addCase(changeUserPassword.pending, (state)=>{
            state.isLoading = true;
        }).addCase(changeUserPassword.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        }).addCase(changeUserPassword.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        }).addCase(updateProfile.pending, (state)=>{
            state.isLoading = true;
        }).addCase(updateProfile.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        }).addCase(updateProfile.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
});
const { reset  } = authSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authSlice.reducer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;