import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

let user;

if (typeof window !== "undefined") {
  if (localStorage.getItem("user") !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }
}

const initialState = {
  user: user ? user : null,
  isError: false,
  isAvailable: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk("user/register", async (user, thunkAPI) => {
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
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk("/user/login", async (user, thunkAPI) => {
  try {
    const res = await authService.login(user);

    if (res.status === 0) {
      const message = res.remarks;
      return thunkAPI.rejectWithValue(message);
    } else return thunkAPI.fulfillWithValue(res.data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout user
export const logout = createAsyncThunk("/user/logout", async (user, thunkAPI) => {
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
      (error.response && error.response.data && error.response.data.remarks) ||
      error.remarks ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Forgot Password
export const forgetPassword = createAsyncThunk("/user/forgetPassword", async (email, thunkAPI) => {
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
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

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
        (error.response && error.response.data && error.response.data.remarks) ||
        error.remarks ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk("/user/updateProfile", async (user, thunkAPI) => {
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
      (error.response && error.response.data && error.response.data.remarks) ||
      error.remarks ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

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
