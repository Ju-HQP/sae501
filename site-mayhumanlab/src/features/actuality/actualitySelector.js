import { createSelector } from "reselect";

export const selectActus = (state) => state.actuality.tabActus;
export const selectTotalActus = (state) => state.actuality.tabActus.length;
export const selectLoadingActu = (state) => state.actuality.loading;
export const selectEditActu = (state) => state.actuality.editActu;
export const selectIdActu = (state) => state.actuality.idActu;

export const selectErrorLoadActu = (state) => state.actuality.errors.apiErrorLoad;
export const selectErrorAddActu = (state) => state.actuality.errors.apiErrorAdd;
export const selectErrorUpdateActu = (state) => state.actuality.errors.apiErrorUpdate;
export const selectErrorDeleteActu = (state) => state.actuality.errors.apiErrorDelete;

export const selectSortedActusByReleaseDate = createSelector(
    selectActus,
    (listActu) => [...listActu].sort((a,b)=> Date.parse(b.releaseDate) - Date.parse(a.releaseDate))
)

export const selectFormTitle = createSelector(
    selectIdActu,
    (id) => id ? "Modifier une actualité" : "Ajouter une actualité"
)

export const selectInitialFormValues = createSelector(
    selectActus,
    selectIdActu,
    (actualities, id) => {
        if (!id) {
            return null;
        }
        return actualities.find(actuality => actuality.id === id) || null;
    }
)

export const selectErrorSave = createSelector(
    [selectIdActu,
    selectErrorAddActu,
    selectErrorUpdateActu],
    (idActu, errorAdd, errorUpdate) => {
        return idActu ? errorUpdate : errorAdd;
    }
);