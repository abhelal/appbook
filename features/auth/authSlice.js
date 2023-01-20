import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

let user;
let checked_user;

if (typeof window !== "undefined") {
  if (localStorage.getItem("user") !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }
  if (localStorage.getItem("checked_user") !== "undefined") {
    checked_user = JSON.parse(localStorage.getItem("checked_user"));
  }
}

const initialState = {
  user: user ? user : null,
  checked_user: checked_user ? checked_user : null,
  isError: false,
  isAvailable: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const check_user = createAsyncThunk(
  "user/check_user",
  async (checked_user, thunkAPI) => {
    try {
      const res = await authService.check_user(checked_user);
      if (res.status === 0) {
        const message = res.remarks;
        return thunkAPI.rejectWithValue(message);
      }
      if (res.status === 1) {
        return thunkAPI.fulfillWithValue(checked_user);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Cancell Registration
export const cancell_reg = createAsyncThunk("/user/cancell_reg", async () => {
  authService.cancell_reg();
});

// Register user
export const register = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const res = await authService.register(user);
      if (res.status === 0) {
        const message = res.remarks;
        return thunkAPI.rejectWithValue(message);
      }
      if (res.status === 1) {
        return thunkAPI.fulfillWithValue(res.data);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("/user/login", async (user, thunkAPI) => {
  try {
    const res = await authService.login(user);
    if (res.status === 0) {
      const message = res.remarks;
      return thunkAPI.rejectWithValue(message);
    }
    if (res.status === 1) {
      return thunkAPI.fulfillWithValue(res.data);
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout user
export const logout = createAsyncThunk(
  "/user/logout",
  async (user, thunkAPI) => {
    try {
      const res = await authService.logout(user);
      if (res.status === 0) {
        const message = res.remarks;
        return thunkAPI.rejectWithValue(message);
      }
      if (res.status === 1) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        const message = res.remarks;

        return thunkAPI.fulfillWithValue(message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.remarks) ||
        error.remarks ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Forgot Password
export const forgetPassword = createAsyncThunk(
  "/user/forgetPassword",
  async (email, thunkAPI) => {
    try {
      const res = await authService.forgetPassword(email);
      if (res.error) {
        const message = res.message;
        return thunkAPI.rejectWithValue(message);
      }
      if (res.status === 1) {
        return thunkAPI.fulfillWithValue(res.data);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  "/user/changeUserPassword",
  async (user, thunkAPI) => {
    try {
      const res = await authService.changeUserPassword(user);
      if (res.status === 0) {
        const message = res.remarks;
        return thunkAPI.rejectWithValue(message);
      }
      if (res.status === 1) {
        const message = res.remarks;
        return thunkAPI.fulfillWithValue(message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.remarks) ||
        error.remarks ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "/user/updateProfile",
  async (user, thunkAPI) => {
    try {
      const res = await authService.updateProfile(user);
      if (res.error) {
        const message = res.remarks;
        return thunkAPI.rejectWithValue(message);
      }
      if (res.status === 1) {
        const message = res.remarks;
        return thunkAPI.fulfillWithValue(message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.remarks) ||
        error.remarks ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isAvailable = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(check_user.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(check_user.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAvailable = true;
        state.checked_user = action.payload;
      })
      .addCase(check_user.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isAvailable = false;
        state.message = action.payload;
        state.checked_user = null;
      })
      .addCase(cancell_reg.fulfilled, (state) => {
        state.checked_user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(changeUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
