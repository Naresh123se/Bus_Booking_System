import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      try {
        if (action.payload.userData) {
          // Google login
          state.user = action.payload.data;
          localStorage.setItem('user', JSON.stringify(action.payload.data));
        } else {
          // Regular login
          state.userInfo = action.payload;
          localStorage.setItem('userInfo', JSON.stringify(action.payload));
        }
      } catch (error) {
        console.error('Error setting credentials:', error);
      }
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.googleLoginData = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
