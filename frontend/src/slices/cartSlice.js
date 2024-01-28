import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // 1. Add to cart
        addToCart(state, action) {
            const product = action.payload;

            // Check if product already exists in cart
            const productExists = state.cartItems.find(
                (item) => item._id === product._id
            );

            // If product exists, replace it with the new product
            if (productExists) {
                state.cartItems = state.cartItems.map((item) =>
                    item._id === productExists._id ? product : item
                );
            } else {
                // If product doesn't exist, add it to the cart
                state.cartItems = [...state.cartItems, product];
            }

            return updateCart(state);
        },

        // 2. Remove from cart
        removeFromCart(state, action) {
            const productId = action.payload;

            state.cartItems = state.cartItems.filter(
                (item) => item._id !== productId
            );

            return updateCart(state);
        },

        // 3. Save shipping address
        saveShippingAddress(state, action) {
            state.shippingAddress = action.payload;

            return updateCart(state);
        },

        // 4. Save payment method
        savePaymentMethod(state, action) {
            state.paymentMethod = action.payload;

            return updateCart(state);
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
