import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "./notificationService";

const initialState = {
  notifications: [],
  unreaded: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getNotifications = createAsyncThunk(
  "/notifications/getnotification",
  async ({}, thunkAPI) => {
    try {
      const res = await notificationService.getNotification();
      if (res.status === 0) {
        const message = res.remarks;
        return thunkAPI.rejectWithValue(message);
      }
      if (res) {
        return thunkAPI.fulfillWithValue(res);
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

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = action.payload.data;
        state.unreaded = action.payload.unreaded;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.notifications = null;
        state.unreaded = null;
      });
  },
});

export const { reset } = notificationSlice.actions;
export default notificationSlice.reducer;
