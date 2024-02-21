import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: localStorage.getItem('search')
    ? JSON.parse(localStorage.getItem('search'))
    : null,
};

const bookingReducer = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.search = action.payload;
      localStorage.setItem('search', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.search = null;
      localStorage.removeItem('search');
    },
  },
});

export const { setCredentials, logout } = bookingReducer.actions;

export default bookingReducer.reducer;