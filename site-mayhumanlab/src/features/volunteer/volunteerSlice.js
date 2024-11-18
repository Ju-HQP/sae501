import {
    createSlice
} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'volunteer',
    initialState: {
        connected: false,
        volunteers: [],
        volunteerModifying: false
    },
    reducers: {
        startVolunteerEdit(state, action) {
            state.volunteerModifying = true;
            state.idVolunteer = action.payload;
        },
        stopVolunteerEdit(state, action) {
            state.volunteerModifying = false;
            state.idVolunteer = null;
        }
    },
    extraReducers: (builder) => {
        //ajout des cas
    }
})

export const {startVolunteerEdit, stopVolunteerEdit} = slice.actions;
export default slice.reducer;