import { createSelector } from "reselect";

export const selectConnected = (state) => state.volunteer.connected;
export const selectVolunteerModifying = (state) => state.volunteer.volunteerModifying;
export const selectAdmin = (state) => state.volunteer.admin;

