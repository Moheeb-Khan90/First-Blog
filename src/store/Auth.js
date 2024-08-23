import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: localStorage.getItem('cookieFallback') ? true : false,
    userData: JSON.parse(localStorage.getItem('userData')) || null
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            localStorage.setItem('cookieFallback', 'true');
            localStorage.setItem('userData', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            localStorage.removeItem('cookieFallback');
            localStorage.removeItem('userData');
        }
    }
})

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
