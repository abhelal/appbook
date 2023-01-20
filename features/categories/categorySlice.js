import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

let categories;

if (typeof window !== "undefined") {
  if (localStorage.getItem("categories") !== "undefined") {
    categories = JSON.parse(localStorage.getItem("categories"));
  }
}

const initialState = {
  categories: categories ? categories : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// getCategories

export const getCategories = createAsyncThunk("/categories/getcategories", async ({}, thunkAPI) => {
  try {
    const res = await categoryService.getCategories({});
    if (res.status === 0) {
      const message = res.remarks;
      return thunkAPI.rejectWithValue(message);
    }
    if (res.status === 1) {
      const categories = res.data;
      return thunkAPI.fulfillWithValue(categories);
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const categorySlice = createSlice({
  name: "categories",
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
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.categories = null;
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
