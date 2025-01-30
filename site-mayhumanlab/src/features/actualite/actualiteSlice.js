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
        dataSend:{},//objet vide pour sauvegarder données form
        errors: {
            apiErrorLoad: null,
            apiErrorAdd: null,
            apiErrorUpdate: null,
            apiErrorDelete: null,
        },
    },

    reducers: {
        startEditActu(state,action){
            state.errors.apiErrorAdd = null;
            state.errors.apiErrorUpdate = null;
            state.errors.apiErrorDelete = null;
            state.editActu = true;
            state.idActu = action.payload;
        },
        stopEditActu(state,action){
            state.editActu = false;
            state.idActu = null;
            state.errors.apiErrorAdd = null;
            state.errors.apiErrorUpdate = null;
            state.dataSend = {};
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
        })
        .addCase(loadActus.rejected, (state, action)=>{
            state.loading = false;
            state.errors.apiErrorLoad = action.payload;
        })

        .addCase(addActu.pending, (state) => {
            state.errors.apiErrorAdd = null;
            state.loading = true;
        })
        .addCase(addActu.fulfilled, (state, action)=>{
            state.tabActus.push(action.payload);
            state.editActu = false;
            state.loading = false;
            state.dataSend = {};
        })
        .addCase(addActu.rejected, (state, action)=>{
            state.errors.apiErrorAdd = action.payload.message;
            state.dataSend = action.payload.dataSend;
            state.editActu = true;
            state.loading = false;
            startEditActu();
        })
        .addCase(updateActu.pending, (state) => {
            state.errors.apiErrorUpdate = null;
            state.loading = true;
        })
        .addCase(updateActu.fulfilled, (state, action)=>{
            state.tabActus[state.tabActus.findIndex((actualite)=>state.idActu === actualite.id_actualite)] = action.payload;
            state.idActu = null;
            state.editActu = false;
            state.errors.apiErrorUpdate = null;
            state.loading = false;
            state.dataSend = {};
        })
        .addCase(updateActu.rejected, (state, action)=>{
            state.errors.apiErrorUpdate = action.payload.message;
            state.dataSend = action.payload.dataSend;
            state.loading = false;
            state.editActu = true;
            startEditActu(state.idActu);
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