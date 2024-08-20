import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

console.log(initialState.length);
console.log(initialState);



export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity(state, action) {
      state = state.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
        return item;
      });
    },
    decrementQuantity(state, action) {
      state = state.map((item) => {
        if (item.quantity !== 1) {
          if (item.id === action.payload) {
            item.quantity--;
          }
        }
        return item;
      });
    },
    clearCart: (state) => {
      return []; // Return an empty array to clear the cart
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
