import { createSelector } from "@reduxjs/toolkit";
import { selectVolunteer } from "../volunteer/volunteerSelector";

export const selectUserIsConnected = (state) => state.user.connected;

export const selectUserIsConnecting = (state) => state.user.isConnecting;

export const selectUserId = (state) => state.user.userId;

export const selectUserIsAdmin = (state) => state.user.isAdmin;

export const selectErrorLogin = (state) => state.user.errors.apiErrorLogin;

export const selectErrorLogout = (state) => state.user.errors.apiErrorLogout;

export const selectInfos = createSelector(
    selectVolunteer, selectUserId,
    (volunteers, id) => {
        if (!id){
            return null;
        } else {
            return volunteers.find((volunteer) => volunteer.id_benevole === id) || null;
        }
    }
);