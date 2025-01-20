import {
    createSlice
} from '@reduxjs/toolkit';
import {
    addVolunteer,
    deleteVolunteer, loadVolunteer,
    updateVolunteer
} from './volunteerAsyncAction';

const slice = createSlice({
    name: 'volunteer',
    initialState: {
        volunteers: [],
        loading: false,
        volunteerModifying: false,
        idVolunteerModifying: null,
        idVolunteerDeleting: null,
        dataSend:{},//objet vide
        errors: {
            apiErrorLoad: null,
            apiErrorAdd: null,
            apiErrorUpdate: null,
            apiErrorDelete: null,
        },
    },
    reducers: {
        startVolunteerEdit(state, action) {
            state.errors.apiErrorAdd = null;
            state.errors.apiErrorUpdate = null;
            state.volunteerModifying = true;
            state.idVolunteerModifying = action.payload;
        },
        stopVolunteerEdit(state, action) {
            state.volunteerModifying = false;
            state.idVolunteerModifying = null;
            state.errors.apiErrorAdd = null;
            state.errors.apiErrorUpdate = null;
            state.dataSend = {};
        },
        resetDatas(state, action){
            state.volunteers = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadVolunteer.pending, (state, action) => {
                state.loading = true;
                state.errors.apiErrorLoad = null;
            })
            .addCase(loadVolunteer.fulfilled, (state, action) => {
                state.volunteers = action.payload;
                state.loading = false;
                state.errors.apiErrorLoad = null;
            })
            .addCase(loadVolunteer.rejected, (state, action) => {
                state.loading = false;
                state.errors.apiErrorLoad = action.payload;
            })
            .addCase(addVolunteer.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addVolunteer.fulfilled, (state, action) => {
                state.volunteers = [...state.volunteers, action.payload];
                state.volunteerModifying = false;
                state.loading = false;
                state.dataSend = {};
            })
            .addCase(addVolunteer.rejected, (state, action) => {
                state.errors.apiErrorAdd = action.payload.message;
                state.dataSend = action.payload.dataSend;
                state.loading = false;
                state.volunteerModifying = true;
                startVolunteerEdit();
            })
        .addCase(updateVolunteer.pending, (state, action)=>{
            state.errors.apiErrorUpdate = null;
            state.loading = true;
        })
        .addCase(updateVolunteer.fulfilled, (state, action)=>{
            state.volunteers[state.volunteers.findIndex((volunteer)=> volunteer.id_benevole === state.idVolunteerModifying)] = action.payload;
            state.idVolunteerModifying = null;
            state.volunteerModifying = false;
            state.errors.apiErrorUpdate = null;
            state.loading = false;
            state.dataSend = {};
        })
        .addCase(updateVolunteer.rejected, (state, action)=>{
            state.errors.apiErrorUpdate = action.payload.message;
            state.dataSend = action.payload.dataSend;
            state.loading = false;
            state.volunteerModifying = true;
            startVolunteerEdit(state.idVolunteerModifying);
        })
        .addCase(deleteVolunteer.pending, (state, action) => {
            state.errors.apiErrorDelete = null;
        })
        .addCase(deleteVolunteer.fulfilled, (state, action)=>{
            const index = state.volunteers.findIndex((volunteer)=> volunteer.id_benevole === Number(action.payload));
            state.volunteers.splice(index, 1);
            state.errors.apiErrorDelete = null;
        })
        .addCase(deleteVolunteer.rejected, (state, action)=>{
            state.errors.apiErrorDelete = action.payload.message;
        })
    }
})

export const {
    startVolunteerEdit,
    stopVolunteerEdit,
    resetDatas
} = slice.actions;
export default slice.reducer;