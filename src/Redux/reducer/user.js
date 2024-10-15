import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'useData',
  initialState: {
    userData: {},
    login: false,
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return {...state, userData: user, login: true};
    },
    removeUser(state, action) {
      return {...action.state, userData: {}, login: false};
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
