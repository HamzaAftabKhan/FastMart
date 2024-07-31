import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/User/UserSlice'
import cartReducer from '../features/Cart/cartSlice'
import checkoutReducer from '../features/Checkout/checkoutSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    checkout : checkoutReducer
  },
});

export default store;
