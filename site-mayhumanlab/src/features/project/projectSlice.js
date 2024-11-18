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
        builder.addCase(addVolunteer.fulfilled)
    }
})

export default slice.reducer;