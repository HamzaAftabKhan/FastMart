import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  userName : false,
  userEmail : "",
  image : false,
  role : '',
  userId : "",
  error: null,
};


export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}`);
  const data = await response.json();
  return data;
});


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userName = action.payload.username;
        state.userEmail = action.payload.email;
        state.image = action.payload.image;
        state.role = action.payload.role;
        state.userId = action.payload._id;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
