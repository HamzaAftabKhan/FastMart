import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state for the cart
const initialState = {
  items: [],       
  totalCount: 0,    
  loading : false,
  error: false       
};

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }
  const data = await response.json();
  return data;
});

// Create a slice of the Redux store
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.totalCount = 0;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.totalCount = state.items.items.length;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        
      });
  }
});

export const { addItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
