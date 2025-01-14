import {
    createSlice
} from '@reduxjs/toolkit';
import { loadProjects } from './projectAsyncAction';

const slice = createSlice({
    name: 'project',
    initialState: {
        projects: [],
        loading : false,
        errors: {
            apiErrorLoad: null,
            apiErrorAdd: null,
            apiErrorUpdate: null,
            apiErrorDelete: null,
        },
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
                .addCase(loadProjects.pending, (state, action)=>{
                    state.loading = true;
                    state.errors.apiErrorLoad = null;
                })
                .addCase(loadProjects.fulfilled, (state, action)=>{
                    state.projects = action.payload;
                    state.loading = false;
                })
                .addCase(loadProjects.rejected, (state, action)=>{
                    state.loading = false;
                    state.errors.apiErrorLoad = action.payload;
                })
    }
})

export default slice.reducer;