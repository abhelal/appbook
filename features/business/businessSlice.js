import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import businessService from "./businessService";

const initialState = {
  business: [],
  favBusiness: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// getFavourite business

export const getFavouriteBusiness = createAsyncThunk(
  "/business/getFavouriteBusiness",
  async (userId, thunkAPI) => {
    try {
      const res = await businessService.getFavouriteBusiness(userId);
      if (res.status === 0) {
        const message = res.remarks;
        return thunkAPI.rejectWithValue(message);
      }
      if (res.status === 1) {
        const favBusiness = res.data;
        return thunkAPI.fulfillWithValue(favBusiness);
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

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusiness: (state, action) => {
      state.business = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFavouriteBusiness.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavouriteBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favBusiness = action.payload;
      })
      .addCase(getFavouriteBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.favBusiness = null;
      });
  },
});

export const { setBusiness } = businessSlice.actions;
export default businessSlice.reducer;
