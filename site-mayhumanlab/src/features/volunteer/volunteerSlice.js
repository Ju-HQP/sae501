import {
    createSlice
} from '@reduxjs/toolkit';
import { addVolunteer, deleteVolunteer, loadVolunteer, updateVolunteer } from './volunteerAsyncAction';

const slice = createSlice({
    name: 'volunteer',
    initialState: {
        volunteers: [],
        loading: false,
        connected: true,
        admin: true,
        volunteerModifying: false,
        volunteerDeleting: false,
        idVolunteerModifying: null,
        idVolunteerDeleting: null,
        errors: {
            apiErrorLoad: null,
            apiErrorAdd: null,
            apiErrorUpdate: null,
            apiErrorDelete: null,
        },
    },
    reducers: {
        startVolunteerEdit(state, action) {
            state.volunteerModifying = true;
            state.idVolunteerModifying = action.payload;
        },
        stopVolunteerEdit(state, action) {
            state.volunteerModifying = false;
            state.idVolunteerModifying = null;
            state.errors.apiErrorAdd = null;
            state.errors.apiErrorUpdate = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadVolunteer.pending, (state, action) =>{
            state.loading = true;
            state.errors.apiErrorLoad = null;
        })
        .addCase(loadVolunteer.fulfilled, (state, action)=>{
            state.volunteers = action.payload;
            state.loading = false;
            state.errors.apiErrorLoad = null;
        })
        .addCase(loadVolunteer.rejected, (state, action)=>{
            state.loading = false;
            state.errors.apiErrorLoad = action.payload;
        })
        .addCase(addVolunteer.fulfilled, (state, action)=>{
            console.log(state.volunteers)
            state.volunteers = [...state.volunteers, action.payload];
            state.volunteerModifying = false;
            console.log(state.volunteers)
        })
        .addCase(addVolunteer.rejected, (state, action)=>{
            state.errors.apiErrorAdd = action.payload;
            state.volunteerModifying = false;
        })
    }
})

export const {startVolunteerEdit, stopVolunteerEdit} = slice.actions;
export default slice.reducer;