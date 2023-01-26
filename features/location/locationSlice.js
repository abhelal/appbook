import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import locationService from "./locationService";

let address;
let coordinates;

if (typeof window !== "undefined") {
  if (localStorage.getItem("coordinates") !== "undefined") {
    coordinates = JSON.parse(localStorage.getItem("coordinates"));
  }
  if (localStorage.getItem("address") !== "undefined") {
    address = JSON.parse(localStorage.getItem("address"));
  }
}

const initialState = {
  coordinates: coordinates ? coordinates : null,
  address: address ? address : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getLocation = createAsyncThunk("/location/getlocation", async ({}, thunkAPI) => {
  try {
    const res = await locationService.getLocation({});
    if (res) {
      console.log(res);
      return thunkAPI.fulfillWithValue(res);
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const locationSlice = createSlice({
  name: "location",
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
      .addCase(getLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.address = action.payload.address;
        state.coordinates = action.payload.coordinates;
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.address = null;
        state.coordinates = null;
      });
  },
});

export const { reset } = locationSlice.actions;
export default locationSlice.reducer;
