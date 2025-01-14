import {
    createSlice
} from '@reduxjs/toolkit';
import {
    addVolunteer,
    loadVolunteer,
    updateVolunteer
} from './volunteerAsyncAction';

const slice = createSlice({
    name: 'volunteer',
    initialState: {
        volunteers: [],
        loading: false,
        volunteerModifying: false,
        idVolunteerModifying: null,
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
            .addCase(addVolunteer.fulfilled, (state, action) => {
                state.volunteers = [...state.volunteers, action.payload];
                state.volunteerModifying = false;
                state.loading = false;
            })
            .addCase(addVolunteer.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addVolunteer.rejected, (state, action) => {
                state.errors.apiErrorAdd = action.payload;
                state.volunteerModifying = false;
                state.loading = false;
            })
    }
})

export const {
    startVolunteerEdit,
    stopVolunteerEdit,
    resetDatas
} = slice.actions;
export default slice.reducer;