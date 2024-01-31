import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
    googleLoginData: localStorage.getItem('googleLoginData')
    ? JSON.parse(localStorage.getItem('googleLoginData'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      if (action.payload.googleLogin) {
        // Google login
        state.googleLoginData = action.payload.data;
        localStorage.setItem('googleLoginData', JSON.stringify(action.payload.data));
      } else {
        // Regular login
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      }
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.googleLoginData = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('googleLoginData');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
