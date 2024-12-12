import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducer";


const store = configureStore({
    reducer:{
         root : rootReducer, 
    },
});

export default store;
