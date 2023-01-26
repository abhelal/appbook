import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@features/categories/categorySlice";
import appointmentReducer from "@features/appointment/appointmentSlice";
import authReducer from "@features/auth/authSlice";
import businessReducer from "@features/business/businessSlice";
import cartReducer from "@features/cart/cartSlice";
import notificationReducer from "@/features/notifications/notificationSlice";
import locationReducer from "@/features/location/locationSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    auth: authReducer,
    business: businessReducer,
    appointment: appointmentReducer,
    cart: cartReducer,
    notifications: notificationReducer,
    location: locationReducer,
  },
});
