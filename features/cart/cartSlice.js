import { createSlice } from "@reduxjs/toolkit";

let localItem;

if (typeof window !== "undefined") {
  localItem = JSON.parse(localStorage.getItem("storredItem"));
}

const initialState = localItem ? localItem : [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      localStorage.removeItem("storredItem");
      state.splice(0, state.length);
    },
    addToCart: (state, action) => {
      const existsBusiness = state.find(
        (business) => business.business_id === action.payload.business_id
      );
      if (existsBusiness) {
        existsBusiness.service.push({ ...action.payload.service[0] });
      } else {
        state.push({ ...action.payload });
      }
      localStorage.setItem("storredItem", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      console.log(action.payload);
      const existsBusiness = state.find(
        (business) => business.business_id === action.payload.business_id
      );
      existsBusiness.service.splice(action.payload.serviceIndex, 1);
      localStorage.setItem("storredItem", JSON.stringify(state));
    },
  },
});

export const { reset, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
