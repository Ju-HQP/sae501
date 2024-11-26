import {
    createSlice
} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'volunteer',
    initialState: {
        connected: false,
        admin: false,
        volunteers: [],
        volunteerModifying: false,
        idVolunteerModifying: null
    },
    reducers: {
        startVolunteerEdit(state, action) {
            state.volunteerModifying = true;
            state.idVolunteerModifying = action.payload;
        },
        stopVolunteerEdit(state, action) {
            state.volunteerModifying = false;
            state.idVolunteerModifying = null;
        }
    },
    extraReducers: (builder) => {
        //ajout des cas
    }
})

export const {startVolunteerEdit, stopVolunteerEdit} = slice.actions;
export default slice.reducer;