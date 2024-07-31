import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    addressError: "",
    defaultAddress: false,
    orderSummaryData: {},
    makeOrder: false,
    totalPayment: 0,
    userEmail:"",
    };
const checkoutSlice = createSlice({

    name: 'checkout',
    initialState,
    reducers: {
        setAddressError: (state, action) => {
            state.addressError = action.payload;
        },
        setDefaultAddress: (state, action) => {
            state.defaultAddress = action.payload;
        },
        setOrderSummaryData: (state, action) => {
            state.orderSummaryData = action.payload;
        },
        setMakeOrder: (state, action) => {
            state.makeOrder = action.payload;
        },
        setTotalPayment: (state, action) => {
            state.totalPayment = action.payload;
        },
        setUserEmail: (state, action) => {
            state.userEmail = action.payload;
        },
    },
});
export default checkoutSlice.reducer;
export const {setAddressError, setDefaultAddress, setOrderSummaryData, setMakeOrder, setTotalPayment, setUserEmail} = checkoutSlice.actions;