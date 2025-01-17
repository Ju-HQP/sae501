import { createSlice } from '@reduxjs/toolkit';
import { addProject, updateProject, loadProjects, deleteProject } from './projectAsyncAction';

const projectSlice = createSlice({
    name : 'project',
    initialState:{
        tabProjects : [],
        loading : false,
        admin: true,
        editProject : false,
        idProject : null,
        errors: {
            apiErrorLoad: null,
            apiErrorAdd: null,
            apiErrorUpdate: null,
            apiErrorDelete: null,
        },
    },

    reducers: {
        startEditProject(state,action){
            state.editProject = true;
            state.idProject = action.payload;
        },
        stopEditProject(state,action){
            state.editProject = false;
            state.idProject = null;
            state.errors.apiErrorAdd = null;
            state.errors.apiErrorUpdate = null;
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(loadProjects.pending, (state, action)=>{
            state.loading = true;
            state.errors.apiErrorLoad = null;
        })
        .addCase(loadProjects.fulfilled, (state, action)=>{
            state.tabProjects = action.payload;
            state.loading = false;
        })
        .addCase(loadProjects.rejected, (state, action)=>{
            state.loading = false;
            state.errors.apiErrorLoad = action.payload;
        })

        .addCase(addProject.pending, (state) => {
            state.errors.apiErrorAdd = null;
        })
        .addCase(addProject.fulfilled, (state, action)=>{
            state.tabProjects.push(action.payload);
            state.editProject = false;
        })
        .addCase(addProject.rejected, (state, action)=>{
            state.errors.apiErrorAdd = action.payload;
        })

        .addCase(updateProject.pending, (state) => {
            state.errors.apiErrorUpdate = null;
        })
        .addCase(updateProject.fulfilled, (state, action)=>{
            state.tabProjects[state.tabProjects.findIndex((project)=>state.idProject === project.id_projet)] = action.payload;
            state.idProject = null;
            state.editProject = false;
        })
        .addCase(updateProject.rejected, (state, action)=>{
            state.errors.apiErrorUpdate = action.payload;
        })

        .addCase(deleteProject.pending, (state) => {
            state.errors.apiErrorDelete = null;
        })
        .addCase(deleteProject.fulfilled, (state, action)=>{
            const index = state.tabProjects.findIndex((project) => project.id_projet === Number(action.payload));
            state.tabProjects.splice(index,1);
        })

        .addCase(deleteProject.rejected, (state, action)=>{
            state.errors.apiErrorDelete = action.payload;
        })
    }
})

export const {startEditProject, stopEditProject} = projectSlice.actions;
export default projectSlice.reducer;