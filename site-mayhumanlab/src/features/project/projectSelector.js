import { createSelector } from "reselect";

export const selectProjects = (state) => state.project.projects;
export const selectLoadingProject = (state) => state.project.loading;