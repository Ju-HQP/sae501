import { configureStore } from "@reduxjs/toolkit";
import filmReducer from './film/filmSlice'

const store = configureStore({
    reducer:{
        
    },
});

export default store;