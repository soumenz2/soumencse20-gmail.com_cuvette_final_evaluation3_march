
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokenId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.tokenId = action.payload;
    },
    clearToken: (state) => {
      state.tokenId = null;
    },
  },
});

export const { setToken, clearToken} = userSlice.actions;



export default userSlice.reducer;