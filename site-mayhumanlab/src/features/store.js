import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "./project/projectSlice"
import rootReducer from "./rootReducer";

const store = configureStore({
    reducer: rootReducer
});


export default store;