import { createSelector } from "reselect";

export const selectConnected = (state) => state.volunteer.connected;
export const selectVolunteerModifying = (state) => state.volunteer.volunteerModifying;
export const selectAdmin = (state) => state.volunteer.admin;
export const selectVolunteer = (state) => state.volunteer.volunteers;
export const selectTotalVolunteers = (state) => state.volunteer.volunteers.length;
export const selectLoading = (state) => state.volunteer.loading;
export const selectIdVolunteerModifying = (state) => state.volunteer.idVolunteerModifying;
export const selectErrorLoad = (state) => state.volunteer.errors.apiErrorLoad;
export const selectErrorDelete = (state) => state.volunteer.errors.apiErrorDelete;
export const selectErrorSave = (state) => {
    if(state.volunteer.idVolunteerModifying){
        return state.volunteer.errors.apiErrorUpdate;
    } else {
        return state.volunteer.errors.apiErrorAdd;
    }
}

export const selectInitialFormValues = createSelector(
    selectVolunteer, selectIdVolunteerModifying,
    (volunteer, id) => {
        if (!id){
            return null;
        } else {
            return volunteer.find((volunteer) => volunteer.id_benevole === id) || null;
        }
    }
);

export const selectFormTitle = createSelector(
    selectIdVolunteerModifying,
    (editVolunteer) => (editVolunteer ? "Modifier un bénévole" : "Ajouter un bénévole")
);