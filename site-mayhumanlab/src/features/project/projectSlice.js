import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'slice',
    initialState: {
        connected: false,
        projects: [],
        actus: [],
        volunteers: []
    },
    reducers: {
            //reducers
    },
    extraReducers:(builder)=>{
            //ajout des cas
    }
})

export default slice.reducer;