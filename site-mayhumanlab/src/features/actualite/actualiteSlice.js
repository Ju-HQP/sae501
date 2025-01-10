import { createSlice } from '@reduxjs/toolkit';
import { addActu, updateActu, loadActus, deleteActu } from './actualiteAsyncAction';

const actualiteSlice = createSlice({
    name : 'actualite',
    initialState:{
        tabActus : [],
        loading : false,
        admin: true,
        editActu : false,
        idActu : null,
        errors: {
            apiErrorLoad: null,
            apiErrorAdd: null,
            apiErrorUpdate: null,
            apiErrorDelete: null,
        },
    },

    reducers: {
        startEditActu(state,action){
            state.editActu = true;
            state.idActu = action.payload;
        },
        stopEditActu(state,action){
            state.editActu = false;
            state.idActu = null;
            state.errors.apiErrorAdd = null;
            state.errors.apiErrorUpdate = null;
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(loadActus.pending, (state, action)=>{
            state.loading = true;
            state.errors.apiErrorLoad = null;
        })
        .addCase(loadActus.fulfilled, (state, action)=>{
            state.tabActus = action.payload;
            state.loading = false;
            console.log(state.tabActus);
        })
        .addCase(loadActus.rejected, (state, action)=>{
            state.loading = false;
            state.errors.apiErrorLoad = action.payload;
        })

        .addCase(addActu.pending, (state) => {
            state.errors.apiErrorAdd = null;
        })
        .addCase(addActu.fulfilled, (state, action)=>{
            state.tabActus.push(action.payload);
            state.editActu = false;
        })
        .addCase(addActu.rejected, (state, action)=>{
            state.errors.apiErrorAdd = action.payload;
        })

        .addCase(updateActu.pending, (state) => {
            state.errors.apiErrorUpdate = null;
        })
        .addCase(updateActu.fulfilled, (state, action)=>{
            console.log(action.payload);
            state.tabActus[state.tabActus.findIndex((actualite)=>state.idActu === actualite.id_actualite)] = action.payload;
            state.idActu = null;
            state.editActu = false;
        })
        .addCase(updateActu.rejected, (state, action)=>{
            state.errors.apiErrorUpdate = action.payload;
        })

        .addCase(deleteActu.pending, (state) => {
            state.errors.apiErrorDelete = null;
        })
        .addCase(deleteActu.fulfilled, (state, action)=>{
            const index = state.tabActus.findIndex((actualite) => actualite.id_actualite === Number(action.payload));
            state.tabActus.splice(index,1);
        })

        .addCase(deleteActu.rejected, (state, action)=>{
            state.errors.apiErrorDelete = action.payload;
        })
    }
})

export const {startEditActu, stopEditActu} = actualiteSlice.actions;
export default actualiteSlice.reducer;