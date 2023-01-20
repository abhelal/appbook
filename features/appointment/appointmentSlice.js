import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  appointmentIsOpen: false,
  calendarIsOpen: false,
  initialDate: moment(),
  appointmentDate: moment(),
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    openAppointment: (state) => {
      state.appointmentDate = moment();
      state.initialDate = moment();
      state.appointmentIsOpen = true;
    },
    closeAppointment: (state) => {
      state.appointmentIsOpen = false;
    },

    openCalendar: (state) => {
      state.calendarIsOpen = true;
    },
    closeCalendar: (state) => {
      state.calendarIsOpen = false;
    },
    setAppointmentDate: (state, action) => {
      state.initialDate = action.payload.day;
      state.appointmentDate = action.payload.day;
    },
  },
});

export const {
  openAppointment,
  closeAppointment,
  openCalendar,
  closeCalendar,
  setAppointmentDate,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;
