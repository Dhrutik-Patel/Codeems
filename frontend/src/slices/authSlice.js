import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;

            // Save the user to localStorage
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;

            // Clear localStorage
            localStorage.removeItem('user');
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
