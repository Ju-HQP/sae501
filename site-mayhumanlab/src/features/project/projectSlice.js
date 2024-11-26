import {
    createSlice
} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'project',
    initialState: {
        connected: false,
        projects: [],
    },
    reducers: {

    },
    extraReducers: (builder) => {
        //ajout des cas
    }
})

export default slice.reducer;