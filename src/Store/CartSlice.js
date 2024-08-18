import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  searchQuery: "",
};

const CartSlice = createSlice({
  name: "Food",
  initialState,
  reducers: {
    add: (state, action) => {
      const existingItem = state.item.find(
        (foodItem) => foodItem.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price += existingItem.unitPrice;
      } else {
        state.item.push({
          ...action.payload,
          quantity: 1,
          unitPrice: action.payload.price,
          price: action.payload.price,
        });
      }
    },
    deleteItem: (state, action) => {
      state.item = state.item.filter(
        (foodItem) => foodItem.id !== action.payload
      );
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    increaseQuantity: (state, action) => {
      const item = state.item.find(
        (foodItem) => foodItem.id === action.payload
      );
      if (item) {
        item.quantity += 1;
        item.price = item.unitPrice * item.quantity; // Increase the price based on unitPrice
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.item.find(
        (foodItem) => foodItem.id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.price = item.unitPrice * item.quantity; // Decrease the price based on unitPrice
      } else {
        state.item = state.item.filter(
          (foodItem) => foodItem.id !== action.payload
        );
      }
    },
    clearCart: (state) => {
      state.item = [];
    }
  },
});

export const {
  add,
  remove,
  increaseQuantity,
  decreaseQuantity,
  setSearchQuery,
  deleteItem,
clearCart
} = CartSlice.actions;
export default CartSlice.reducer;
