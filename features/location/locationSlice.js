import { createSlice } from "@reduxjs/toolkit";

let address;
let coordinates;

if (typeof window !== "undefined") {
  if (localStorage.getItem("coordinates") !== "undefined") {
    coordinates = JSON.parse(localStorage.getItem("coordinates"));
  }
  if (localStorage.getItem("address") !== "undefined") {
    address = localStorage.getItem("address");
  }
}

const initialState = {
  coordinates: coordinates ? coordinates : null,
  address: address ? address : null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    resetLocation: (state) => {
      state.coordinates = null;
      state.address = null;
    },
    setLocation: (state, action) => {
      state.coordinates = action.payload.coordinates;
      state.address = action.payload.address;
    },
  },
});

export const { resetLocation, setLocation } = locationSlice.actions;
export default locationSlice.reducer;
