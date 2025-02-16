import { createSelector } from "reselect";

export const selectProjects = (state) => state.project.tabProjects;
export const selectTotalProjects = (state) => state.project.tabProjects.length;
export const selectLoadingProject = (state) => state.project.loading;
export const selectEditProject = (state) => state.project.editProject;
export const selectIdProject = (state) => state.project.idProject;
export const selectDatasSend = (state) => state.project.dataSend;

export const selectErrorLoadProject = (state) => state.project.errors.apiErrorLoad;
export const selectErrorAddProject = (state) => state.project.errors.apiErrorAdd;
export const selectErrorUpdateProject = (state) => state.project.errors.apiErrorUpdate;
export const selectErrorDeleteProject = (state) => state.project.errors.apiErrorDelete;

export const selectSortedProjectsByTitle = createSelector(
    selectProjects,
    (listProject) => [...listProject].sort((a, b) => a.titre_p.localeCompare(b.titre_p))
);

export const selectFormTitle = createSelector(
    selectIdProject,
    (id) => id ? "Modifier un projet" : "Ajouter un projet"
)

export const selectInitialFormValues = createSelector(
    selectProjects,
    selectIdProject,
    selectDatasSend,
    (projects, id, datas) => {
        if (!id) {
            if (Object.keys(datas).length > 0) {
                return datas;
            }
            return null;
        }else{
            if (Object.keys(datas).length > 0) { // si l'objet data à une d
                return datas;
            }
            return projects.find(project => project.id_projet === id) || null;
        }
    }
)

export const selectErrorSave = createSelector(
    [selectIdProject,
    selectErrorAddProject,
    selectErrorUpdateProject],
    (idProject, errorAdd, errorUpdate) => {
        return idProject ? errorUpdate : errorAdd;
    }
);
