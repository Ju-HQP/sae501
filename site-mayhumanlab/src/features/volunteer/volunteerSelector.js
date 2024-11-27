import { createSelector } from "reselect";

export const selectConnected = (state) => state.volunteer.connected;
export const selectVolunteerModifying = (state) => state.volunteer.volunteerModifying;
export const selectAdmin = (state) => state.volunteer.admin;
export const selectVolunteer = (state) => state.volunteer.volunteers;
export const selectTotalVolunteers = (state) => state.volunteer.volunteers.length;
export const selectLoading = (state) => state.volunteer.loading;
export const selectIdVolunteerModifying = (state) => state.volunteer.idVolunteerModifying;

export const selectErrorLoad = (state) => state.film.errors.apiErrorLoad;
export const selectErrorDelete = (state) => state.film.errors.apiErrorDelete;
export const selectErrorSave = (state) => {
    if(state.film.editFilmId){
        return state.film.errors.apiErrorUpdate;
    } else {
        return state.film.errors.apiErrorAdd;
    }
}
