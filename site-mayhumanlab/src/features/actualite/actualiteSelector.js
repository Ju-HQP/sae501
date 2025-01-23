import { createSelector } from "reselect";

export const selectActus = (state) => state.actualite.tabActus;
export const selectTotalActus = (state) => state.actualite.tabActus.length;
export const selectLoadingActu = (state) => state.actualite.loading;
export const selectEditActu = (state) => state.actualite.editActu;
export const selectIdActu = (state) => state.actualite.idActu;
export const selectDatasSend = (state) => state.actualite.dataSend;

export const selectErrorLoadActu = (state) => state.actualite.errors.apiErrorLoad;
export const selectErrorAddActu = (state) => state.actualite.errors.apiErrorAdd;
export const selectErrorUpdateActu = (state) => state.actualite.errors.apiErrorUpdate;
export const selectErrorDeleteActu = (state) => state.actualite.errors.apiErrorDelete;

export const selectSortedActusByReleaseDate = createSelector(
    selectActus,
    (listActu) => [...listActu].sort((a,b)=> Date.parse(b.date_a) - Date.parse(a.date_a))
)

export const selectFormTitle = createSelector(
    selectIdActu,
    (id) => id ? "Modifier une actualité" : "Ajouter une actualité"
)

export const selectInitialFormValues = createSelector(
    selectActus,
    selectIdActu,
    selectDatasSend,
    (actualites, id, datas) => {
        if (!id) {
            if (Object.keys(datas).length > 0) {
                return datas;
            }
            return null;
        } else{
            if (Object.keys(datas).length > 0) { // si l'objet data à une d
                return datas;
            }
            return actualites.find(actualite => actualite.id_actualite === id) || null;
        }
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