import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './Auth.js'

const store = configureStore({
    reducer:{
        auth: AuthSlice
    }
})

export default store